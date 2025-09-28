import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'src/user/types';
import {
  ChangeProjectStatusDto,
  CreateProjectDto,
  UpdateProjectDto,
} from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects({ role, userId }: { role?: UserRole; userId: string }) {
    const projects = await this.prisma.project.findMany({
      where:
        role === 'ADMIN'
          ? {}
          : {
              OR: [
                { members: { some: { id: userId } } },
                { manager_id: userId },
              ],
            },
      orderBy: { created_at: 'asc' },
      include: {
        manager: {
          omit: { password: true, last_login: true },
        },
        members: {
          omit: { password: true, last_login: true },
        },
      },
    });
    return projects;
  }

  async getProject({
    role,
    userId,
    id,
  }: {
    role: UserRole;
    userId?: string;
    id: string;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        members: { omit: { password: true } },
        manager: { omit: { password: true } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    const isAdmin = role === 'ADMIN';
    const isMember =
      project.members.some((mem) => mem.id === userId) ||
      project.manager_id === userId;

    if (!isAdmin && !isMember)
      throw new UnauthorizedException('User not allowed');

    return project;
  }

  async getProjectUsers({ role, id }: { role: UserRole; id: string }) {
    if (role !== 'ADMIN' && role !== 'MANAGER')
      throw new UnauthorizedException('User not allowed');
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
    role,
    body,
  }: {
    role: UserRole;
    body: CreateProjectDto;
  }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');
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
    role,
    body,
    projectId,
  }: {
    role: UserRole;
    body: UpdateProjectDto;
    projectId: string;
  }) {
    if (role !== 'ADMIN' && role !== 'MANAGER')
      throw new UnauthorizedException('Not Allowed');

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

  async deleteProject({ role, id }: { role: UserRole; id: string }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');
    await this.getProject({ id, role });
    await this.prisma.project.delete({ where: { id } });
    return 'Project deleted';
  }

  async changeStatus({
    role,
    userId,
    id,
    body,
  }: {
    id: string;
    body: ChangeProjectStatusDto;
    role: UserRole;
    userId: string;
  }) {
    await this.getProject({ role, id, userId });

    await this.prisma.project.update({
      where: { id },
      data: {
        status: body.status,
      },
    });
    return 'Project status updated';
  }
}
