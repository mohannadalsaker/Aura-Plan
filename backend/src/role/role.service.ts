import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { PaginationParams } from 'src/shared/types';
import { buildPaginatedResponse } from 'src/shared/utils';
import { Permissions } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private permissionService: PermissionService,
  ) {}

  async getRoles({
    permissions,
    pageNumber,
    pageSize,
    q = '',
  }: Partial<PaginationParams> & { permissions: Permissions[] }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_ALL_ROLES',
    });
    const filterQuery = {
      ...(pageNumber ? { skip: (+pageNumber - 1) * +(pageSize || 10) } : {}),
      ...(pageSize ? { take: +pageSize } : {}),
      where: {
        name: {
          contains: q,
          mode: 'insensitive' as const,
        },
      },
    };

    const roles = await this.prisma.role.findMany({
      orderBy: { created_at: 'asc' },
    });
    const total = await this.prisma.role.count({
      where: { ...filterQuery.where },
    });

    return buildPaginatedResponse({
      data: roles,
      total,
      pageNumber,
      pageSize,
    });
  }

  async getRoleById({
    permissions,
    id,
  }: {
    permissions: Permissions[];
    id: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_ROLE',
    });

    const foundRole = await this.prisma.role.findUnique({ where: { id } });
    if (!foundRole) throw new NotFoundException('Role not found');

    return foundRole;
  }

  async addRole({
    permissions,
    body,
  }: {
    permissions: Permissions[];
    body: CreateRoleDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'CREATE_ROLE',
    });

    const foundRole = await this.prisma.role.findFirst({
      where: { name: body.name },
    });

    if (foundRole)
      throw new BadRequestException('Role with this name already exists');

    await this.prisma.role.create({ data: body });
    return 'Role created';
  }

  async updateRole({
    roleId,
    permissions,
    body,
  }: {
    roleId: string;
    permissions: Permissions[];
    body: UpdateRoleDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'UPDATE_ROLE',
    });
    const currentRole = await this.getRoleById({ permissions, id: roleId });

    const foundRole = await this.prisma.role.findFirst({
      where: { name: body.name },
    });
    if (foundRole && foundRole.id !== currentRole.id)
      throw new BadRequestException('Role with this name already exists');

    await this.prisma.role.update({ where: { id: roleId }, data: body });

    return 'Role updated';
  }

  async deleteRole({
    permissions,
    roleId,
  }: {
    permissions: Permissions[];
    roleId: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'DELETE_ROLE',
    });

    await this.getRoleById({ id: roleId, permissions });

    const roleUser = await this.prisma.user.findFirst({
      where: { role_id: roleId },
    });

    if (roleUser) {
      throw new ForbiddenException('There are users with this role');
    }

    await this.prisma.role.delete({ where: { id: roleId } });
    return 'Role deleted';
  }
}
