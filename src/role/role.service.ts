import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'src/user/types';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private permissionService: PermissionService,
  ) {}

  async getRoleById({ role, id }: { role: string; id: string }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_ROLE',
    });

    const foundRole = await this.prisma.role.findUnique({ where: { id } });
    if (!foundRole) throw new NotFoundException('Role not found');

    return foundRole;
  }

  async getRoles(role: string) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_ROLE',
    });

    const roles = await this.prisma.role.findMany({
      orderBy: { created_at: 'asc' },
    });

    return roles;
  }

  async addRole({ role, body }: { role: string; body: CreateRoleDto }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'CREATE_ROLE',
    });

    await this.prisma.role.create({ data: body });
    return 'Role created';
  }

  async updateRole({
    roleId,
    role,
    body,
  }: {
    roleId: string;
    role: string;
    body: UpdateRoleDto;
  }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'UPDATE_ROLE',
    });
    await this.getRoleById({ role, id: roleId });
    await this.prisma.role.update({ where: { id: roleId }, data: body });
    return 'Role updated';
  }

  async deleteRole({ role, roleId }: { role: string; roleId: string }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'DELETE_ROLE',
    });

    const foundRole = await this.getRoleById({ id: roleId, role });
    if (foundRole.name === 'ADMIN')
      throw new ForbiddenException("Role 'ADMIN' cannot be deleted");

    await this.prisma.role.delete({ where: { id: roleId } });
    return { message: 'Role deleted' };
  }
}
