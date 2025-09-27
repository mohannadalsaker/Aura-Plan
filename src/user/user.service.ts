import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from './types';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById({ role, id }: { role: UserRole; id: string }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not allowed');
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

  async getUsers(role: UserRole) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not allowed');
    const users = await this.prisma.user.findMany({
      include: { role: { omit: { permissions: true } } },
      omit: { password: true },
      orderBy: { created_at: 'asc' },
    });
    return users;
  }

  async getMemberUsers(role: UserRole) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not allowed');

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

  async getManagerUsers(role: UserRole) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not allowed');

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

  async createUser({ role, body }: { role: UserRole; body: CreateUserDto }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not allowed');
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
    role: UserRole;
    body: UpdateUserDto;
  }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');
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

  async deleteUser({ role, id }: { role: UserRole; id: string }) {
    await this.getUserById({ role, id });
    this.prisma.user.delete({ where: { id } });
    return 'User deleted';
  }
}
