import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PaginationParams } from 'src/shared/types';
import { buildPaginatedResponse } from 'src/shared/utils';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private permissionService: PermissionService,
  ) {}

  async getUsers({
    role,
    pageNumber,
    pageSize,
    q = '',
  }: Partial<PaginationParams> & { role: string }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_ALL_USERS',
    });

    const filterQuery = {
      ...(pageNumber ? { skip: (+pageNumber - 1) * +(pageSize || 10) } : {}),
      ...(pageSize ? { take: +pageSize } : {}),
      where: {
        username: {
          contains: q,
          mode: 'insensitive' as const,
        },
      },
    };

    const users = await this.prisma.user.findMany({
      include: { role: { omit: { permissions: true } } },
      omit: { password: true },
      orderBy: { created_at: 'asc' },
      ...filterQuery,
    });

    const total = await this.prisma.user.count({ ...filterQuery });

    return buildPaginatedResponse({
      data: users,
      total,
      pageNumber,
      pageSize,
    });
  }

  async getUserById({ role, id }: { role: string; id: string }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_USER',
    });
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
      include: { role: { omit: { permissions: true } } },
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getMemberUsers(role: string) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_USER',
    });

    const users = await this.prisma.user.findMany({
      where: {
        role: {
          AND: [
            {
              name: {
                not: 'ADMIN',
              },
            },
            {
              name: {
                not: 'MANAGER',
              },
            },
          ],
        },
      },
      include: { role: true },
      omit: { password: true },
    });
    return users;
  }

  async getManagerUsers(role: string) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_USER',
    });

    const users = await this.prisma.user.findMany({
      where: {
        role: {
          name: 'MANAGER',
        },
      },
      include: { role: true },
      omit: { password: true },
    });
    return users;
  }

  async createUser({ role, body }: { role: string; body: CreateUserDto }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'CREATE_USER',
    });
    const { password, role_id, ...rest } = body;
    const user = await this.prisma.user.findUnique({
      where: { email: rest.email },
    });
    if (user)
      throw new BadRequestException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        role: {
          connect: { id: role_id },
        },
      },
    });
    return 'User created';
  }
  async updateUser({
    userId,
    role,
    body,
  }: {
    userId: string;
    role: string;
    body: UpdateUserDto;
  }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'UPDATE_USER',
    });
    const { role_id, ...rest } = body;
    await this.getUserById({ role, id: userId });
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...rest,
        ...(role_id
          ? {
              role: {
                connect: { id: role_id },
              },
            }
          : {}),
      },
    });
    return 'User updated';
  }

  async deleteUser({ role, id }: { role: string; id: string }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'DELETE_USER',
    });
    await this.getUserById({ role, id });
    await this.prisma.user.delete({ where: { id } });
    return 'User deleted';
  }
}
