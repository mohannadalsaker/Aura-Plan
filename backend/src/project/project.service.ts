import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationParams } from 'src/shared/types';
import { buildPaginatedResponse } from 'src/shared/utils';
import {
  ChangeProjectStatusDto,
  CreateProjectDto,
  UpdateProjectDto,
} from './dto/project.dto';
import { Permissions } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private permissionService: PermissionService,
  ) {}

  async getAllProjects({
    permissions,
    userId,
    pageNumber,
    pageSize,
    q = '',
  }: Partial<PaginationParams> & {
    permissions: Permissions[];
    userId: string;
  }) {
    const canReadAll = this.permissionService.has({
      permissions,
      permission: 'READ_ALL_PROJECTS',
    });
    const filterQuery = {
      ...(pageNumber ? { skip: (+pageNumber - 1) * +(pageSize || 10) } : {}),
      ...(pageSize ? { take: +pageSize } : {}),
      where: {
        ...(canReadAll
          ? {}
          : {
              OR: [
                { members: { some: { id: userId } } },
                { manager_id: userId },
              ],
            }),
        title: {
          contains: q,
          mode: 'insensitive' as const,
        },
      },
    };
    const projects = await this.prisma.project.findMany({
      orderBy: { created_at: 'asc' },
      include: {
        manager: {
          omit: { password: true, last_login: true },
        },
        members: {
          omit: { password: true, last_login: true },
        },
      },
      ...filterQuery,
    });

    const total = await this.prisma.project.count({
      where: { ...filterQuery.where },
    });

    return buildPaginatedResponse({
      data: projects,
      total,
      pageNumber,
      pageSize,
    });
  }

  async getProject({
    permissions,
    userId,
    id,
  }: {
    permissions: Permissions[];
    userId?: string;
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_PROJECT',
    });
    const canReadAll = this.permissionService.has({
      permissions,
      permission: 'READ_ALL_PROJECTS',
    });

    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        members: { omit: { password: true } },
        manager: { omit: { password: true } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');

    const isMember =
      project.members.some((mem) => mem.id === userId) ||
      project.manager_id === userId;

    if (!canReadAll && !isMember)
      throw new ForbiddenException('User not allowed');
    return project;
  }

  async getProjectUsers({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_PROJECT',
    });
    // this.permissionService.assert({
    //   permissions,
    //   permission: 'CREATE_PROJECT' ,
    // });
    // this.permissionService.assert({
    //   permissions,
    //   permission: 'UPDATE_PROJECT' ,
    // });
    const users = await this.prisma.user.findMany({
      where: {
        member_projects: {
          some: {
            id,
          },
        },
      },
      omit: { password: true },
    });

    return users;
  }

  async createProject({
    permissions,
    body,
  }: {
    permissions: Permissions[];
    body: CreateProjectDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'CREATE_PROJECT',
    });
    const { manager_id, members, start_date, end_date, ...rest } = body;
    const memberIds = members.map((id) => ({ id }));

    await this.prisma.project.create({
      data: {
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        manager: { connect: { id: manager_id } },
        members: { connect: memberIds },
        ...rest,
      },
    });

    return 'Project created';
  }

  async updateProject({
    permissions,
    body,
    projectId,
  }: {
    permissions: Permissions[];
    body: UpdateProjectDto;
    projectId: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'UPDATE_PROJECT',
    });

    const { manager_id, members, start_date, end_date, ...rest } = body;
    const memberIds = members ? members?.map((id) => ({ id })) : null;

    await this.prisma.project.update({
      where: { id: projectId },
      data: {
        ...rest,
        ...(start_date
          ? {
              start_date: new Date(start_date),
            }
          : {}),
        ...(end_date
          ? {
              end_date: new Date(end_date),
            }
          : {}),
        ...(manager_id
          ? { manager: { connect: { id: body.manager_id } } }
          : {}),
        ...(memberIds ? { members: { connect: memberIds } } : {}),
      },
    });

    return 'Project updated';
  }

  async deleteProject({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'DELETE_PROJECT',
    });
    await this.getProject({ id, permissions });
    await this.prisma.project.delete({ where: { id } });
    return 'Project deleted';
  }

  async changeStatus({
    permissions,
    userId,
    id,
    body,
  }: {
    id: string;
    body: ChangeProjectStatusDto;
    permissions: Permissions[];
    userId: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'CHANGE_PROJECT_STATUS',
    });
    const oldProject = await this.getProject({ permissions, id, userId });

    await this.prisma.$transaction([
      this.prisma.project.update({
        where: { id },
        data: {
          status: body.status,
        },
      }),
      this.prisma.projectStatusHistory.create({
        data: {
          project_id: id,
          new_status: body.status,
          old_status: oldProject.status,
        },
      }),
    ]);

    return 'Project status updated';
  }
}
