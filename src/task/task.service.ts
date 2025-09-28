import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { UserRole } from 'src/user/types';
import {
  ChangeTaskStatusDto,
  CreateTaskDto,
  UpdateTaskDto,
} from './dto/task.dto';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  async getAllTasks({
    role,
    userId,
    projectId,
  }: {
    role?: UserRole;
    userId: string;
    projectId?: string;
  }) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          ...(projectId ? { project_id: projectId } : {}),
          ...(role === 'ADMIN'
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
        },
        orderBy: { created_at: 'asc' },
        include: {
          project: true,
          creator: { omit: { password: true } },
        },
      });

      return tasks;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('internal');
    }
  }

  async getTask({
    role,
    userId,
    taskId,
    withComments,
  }: {
    role: UserRole;
    userId?: string;
    taskId: string;
    withComments?: boolean;
  }) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
        ...(role === 'ADMIN'
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
        ...(withComments ? { comments: true } : {}),
        users: true,
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async createTask({
    role,
    userId,
    body,
  }: {
    role: UserRole;
    userId: string;
    body: CreateTaskDto;
  }) {
    const user = await this.userService.getUserById({
      role: 'ADMIN',
      id: userId,
    });
    const foundRole = await this.roleService.getRoleById({
      role: 'ADMIN',
      id: user.role_id,
    });

    if (!foundRole.permissions.includes('CREATE_TASK'))
      throw new UnauthorizedException("You don't have permission");

    const { project_id, users, start_date, end_date, ...rest } = body;
    await this.projectService.getProject({ role, userId, id: project_id });

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
  }

  async updateTask({
    role,
    userId,
    taskId,
    body,
  }: {
    role: UserRole;
    userId: string;
    taskId: string;
    body: UpdateTaskDto;
  }) {
    const user = await this.userService.getUserById({
      role: 'ADMIN',
      id: userId,
    });
    const foundRole = await this.roleService.getRoleById({
      role: 'ADMIN',
      id: user.role_id,
    });

    if (!foundRole.permissions.includes('UPDATE_TASK'))
      throw new UnauthorizedException("You don't have permission");

    const { project_id, users, start_date, end_date, ...rest } = body;
    await this.projectService.getProject({ role, userId, id: project_id });

    const current = await this.prisma.tasksOnUsers.findMany({
      where: { task_id: taskId },
      select: { user_id: true },
    });

    const currentIds = new Set(current.map((c) => c.user_id));
    const incomingIds = new Set(users);

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
  }

  async deleteTask({ role, id }: { role: UserRole; id: string }) {
    await this.getTask({ role, taskId: id });
    await this.prisma.task.delete({ where: { id } });
    return 'Task Deleted';
  }

  async changeStatus({
    role,
    userId,
    id,
    body,
  }: {
    id: string;
    body: ChangeTaskStatusDto;
    role: UserRole;
    userId: string;
  }) {
    await this.getTask({ role, taskId: id, userId });

    await this.prisma.task.update({
      where: { id },
      data: {
        status: body.status,
      },
    });
    return 'Task status updated';
  }
}
