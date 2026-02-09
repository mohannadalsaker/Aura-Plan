import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PaginationParams } from 'src/shared/types';
import { buildPaginatedResponse } from 'src/shared/utils';
import { ProjectService } from 'src/project/project.service';
import { TaskService } from 'src/task/task.service';
import { Permissions } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private permissionService: PermissionService,
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  async getUsers({
    permissions,
    pageNumber,
    pageSize,
    q = '',
  }: Partial<PaginationParams> & { permissions: Permissions[] }) {
    this.permissionService.assert({
      permissions,
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

    const total = await this.prisma.user.count({
      where: { ...filterQuery.where },
    });

    return buildPaginatedResponse({
      data: users,
      total,
      pageNumber,
      pageSize,
    });
  }

  async getUserProfile({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
      include: { role: true },
    });
    if (!user) throw new NotFoundException('Profile not found');
    const userTasks = await this.taskService.getAllTasks({
      permissions,
      userId: id,
    });
    const userProjects = await this.projectService.getAllProjects({
      permissions,
      userId: id,
    });

    return { user, projects: userProjects.data, tasks: userTasks.data };
  }

  async getUserById({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
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

  async getMemberUsers(permissions: Permissions[]) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_USER',
    });

    const users = await this.prisma.user.findMany({
      where: {
        role: {
          permissions: {
            has: 'PARTICIPATE_PROJECT',
          },
        },
      },
      include: { role: true },
      omit: { password: true },
    });
    return users;
  }

  async getManagerUsers(permissions: Permissions[]) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_USER',
    });

    const users = await this.prisma.user.findMany({
      where: {
        role: {
          permissions: {
            has: 'MANAGE_PROJECT',
          },
        },
      },
      include: { role: true },
      omit: { password: true },
    });
    return users;
  }

  async createUser({
    permissions,
    body,
  }: {
    permissions: Permissions[];
    body: CreateUserDto;
  }) {
    this.permissionService.assert({
      permissions,
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
    permissions,
    body,
  }: {
    userId: string;
    permissions: Permissions[];
    body: UpdateUserDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'UPDATE_USER',
    });
    const canChangePass = this.permissionService.has({
      permissions,
      permission: 'CHANGE_PASSWORD',
    });
    const { role_id, password, ...rest } = body;

    await this.getUserById({ permissions, id: userId });

    if (rest.email) {
      const foundUser = await this.prisma.user.findUnique({
        where: { email: rest.email },
      });
      if (foundUser)
        throw new BadRequestException('User with this email already exists');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(password ? (canChangePass ? { password: password } : {}) : {}),
        ...rest,
        ...(role_id
          ? {
              permissions: {
                connect: { id: role_id },
              },
            }
          : {}),
      },
    });
    return 'User updated';
  }

  async deleteUser({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'DELETE_USER',
    });
    const user = await this.getUserById({ permissions, id });
    if (user.is_system)
      throw new ForbiddenException('System user cannot be deleted');
    await this.prisma.user.delete({ where: { id } });

    return 'User deleted';
  }
}
