import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Permissions, TaskStatus } from '@prisma/client';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { PaginationParams } from 'src/shared/types';
import { buildPaginatedResponse } from 'src/shared/utils';
import {
  ChangeTaskStatusDto,
  CreateTaskDto,
  RateTaskDto,
  UpdateTaskDto,
} from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private permissionService: PermissionService,
  ) {}

  async getAllTasks({
    permissions,
    userId,
    projectId,
    pageNumber,
    pageSize,
    q = '',
  }: Partial<PaginationParams> & {
    permissions: Permissions[];
    userId: string;
    projectId?: string;
  }) {
    const canReadAll = this.permissionService.has({
      permissions,
      permission: 'READ_ALL_TASKS',
    });
    const filterQuery = {
      ...(pageNumber ? { skip: (+pageNumber - 1) * +(pageSize || 10) } : {}),
      ...(pageSize ? { take: +pageSize } : {}),
      where: {
        ...(projectId ? { project_id: projectId } : {}),
        ...(canReadAll
          ? {}
          : {
              OR: [
                { creator_id: userId },
                {
                  users: {
                    some: { user_id: userId },
                  },
                },
              ],
            }),
        title: {
          contains: q,
          mode: 'insensitive' as const,
        },
      },
    };

    const tasks = await this.prisma.task.findMany({
      orderBy: { created_at: 'asc' },
      include: {
        project: true,
        creator: { omit: { password: true } },
      },
      ...filterQuery,
    });

    const total = await this.prisma.task.count({
      where: { ...filterQuery.where },
    });

    return buildPaginatedResponse({
      data: tasks,
      total,
      pageNumber,
      pageSize,
    });
  }

  async getTask({
    permissions,
    userId,
    taskId,
    withComments,
  }: {
    permissions: Permissions[];
    userId?: string;
    taskId: string;
    withComments?: boolean;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_TASK',
    });
    const canReadAll = this.permissionService.has({
      permissions,
      permission: 'READ_ALL_TASKS',
    });
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
        ...(canReadAll
          ? {}
          : {
              OR: [
                { creator_id: userId },
                {
                  users: {
                    some: {
                      user_id: userId,
                    },
                  },
                },
              ],
            }),
      },
      include: {
        project: true,
        creator: { omit: { password: true } },
        ...(withComments
          ? {
              comments: {
                include: {
                  user: { omit: { password: true, last_login: true } },
                },
              },
            }
          : {}),
        users: { include: { user: { select: { id: true, username: true } } } },
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async createTask({
    permissions,
    userId,
    body,
  }: {
    permissions: Permissions[];
    userId: string;
    body: CreateTaskDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'CREATE_TASK',
    });

    const { project_id, users, start_date, end_date, ...rest } = body;
    await this.projectService.getProject({
      permissions,
      userId,
      id: project_id,
    });

    await this.prisma.task.create({
      data: {
        start_date: new Date(start_date),
        ...(end_date ? { end_date: new Date(end_date) } : {}),
        ...rest,
        status: TaskStatus.TODO,
        project: { connect: { id: project_id } },
        users: {
          create: users.map((id) => ({
            user: { connect: { id: id } },
            assigned_at: new Date(),
          })),
        },
        creator: { connect: { id: userId } },
      },
    });
    return 'Task created';
  }

  async updateTask({
    permissions,
    userId,
    taskId,
    body,
  }: {
    permissions: Permissions[];
    userId: string;
    taskId: string;
    body: UpdateTaskDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'UPDATE_TASK',
    });

    const { project_id, users, start_date, end_date, ...rest } = body;
    if (project_id)
      await this.projectService.getProject({
        permissions,
        userId,
        id: project_id,
      });

    const current = await this.prisma.tasksOnUsers.findMany({
      where: { task_id: taskId },
      select: { user_id: true },
    });

    const currentIds = new Set<string>(current.map((c) => c.user_id));

    const incomingIds = new Set<string>(users ?? []);

    const toDelete = [...currentIds].filter((id) => !incomingIds.has(id));
    const toAdd = [...incomingIds].filter((id) => !currentIds.has(id));

    await this.prisma.$transaction([
      this.prisma.tasksOnUsers.deleteMany({
        where: { task_id: taskId, user_id: { in: toDelete } },
      }),
      this.prisma.tasksOnUsers.createMany({
        data: toAdd.map((id) => ({
          task_id: taskId,
          user_id: id,
          assigned_at: new Date(),
        })),
      }),
      this.prisma.task.update({
        where: { id: taskId },
        data: {
          ...(start_date ? { start_date: new Date(start_date) } : {}),
          ...(end_date ? { end_date: new Date(end_date) } : {}),
          ...rest,
          ...(project_id
            ? {
                project: { connect: { id: project_id! } },
              }
            : {}),
          creator: { connect: { id: userId } },
        },
      }),
    ]);
    return 'Task updated';
  }

  async deleteTask({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'DELETE_TASK',
    });
    await this.getTask({ permissions, taskId: id });
    await this.prisma.task.delete({ where: { id } });
    return 'Task Deleted';
  }

  async changeStatus({
    permissions,
    userId,
    id,
    body,
  }: {
    id: string;
    body: ChangeTaskStatusDto;
    permissions: Permissions[];
    userId: string;
  }) {
    const oldTask = await this.getTask({ permissions, taskId: id, userId });
    this.permissionService.assert({
      permissions,
      permission: 'CHANGE_TASK_STATUS',
    });

    await this.prisma.$transaction([
      this.prisma.task.update({
        where: { id },
        data: {
          status: body.status,
        },
      }),
      this.prisma.taskStatusHistory.create({
        data: {
          task_id: id,
          old_status: oldTask.status,
          new_status: body.status,
        },
      }),
    ]);

    return 'Task status updated';
  }

  async rateTask({
    id,
    permissions,
    body,
    userId,
  }: {
    id: string;
    permissions: Permissions[];
    userId: string;
    body: RateTaskDto;
  }) {
    await this.getTask({ permissions, taskId: id, userId });

    this.permissionService.assert({
      permissions,
      permission: 'RATE_TASK',
    });

    if (!body.rating) {
      throw new BadRequestException('value is required');
    }

    await this.prisma.task.update({
      where: { id },
      data: {
        rating: Number(body.rating),
      },
    });

    return 'Task rated successfully';
  }
}
