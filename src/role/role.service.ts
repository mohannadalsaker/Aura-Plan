import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'src/user/types';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRoleById({ role, id }: { role: UserRole; id: string }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');

    const foundRole = await this.prisma.role.findUnique({ where: { id } });
    if (!foundRole) throw new NotFoundException('Role not found');

    return foundRole;
  }

  async getRoles(role: UserRole) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');

    const roles = await this.prisma.role.findMany({
      orderBy: { created_at: 'asc' },
    });

    return roles;
  }

  async addRole({ role, body }: { role: UserRole; body: CreateRoleDto }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');

    await this.prisma.role.create({ data: body });
    return 'Role created';
  }

  async updateRole({
    roleId,
    role,
    body,
  }: {
    roleId: string;
    role: UserRole;
    body: UpdateRoleDto;
  }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');
    await this.getRoleById({ role, id: roleId });
    await this.prisma.role.update({ where: { id: roleId }, data: body });
    return 'Role updated';
  }

  async deleteRole({ role, roleId }: { role: UserRole; roleId: string }) {
    if (role !== 'ADMIN') throw new UnauthorizedException('Not Allowed');

    const foundRole = await this.getRoleById({ id: roleId, role });
    if (foundRole.name === 'ADMIN')
      throw new ForbiddenException("Role 'ADMIN' cannot be deleted");

    await this.prisma.role.delete({ where: { id: roleId } });
    return { message: 'Role deleted' };
  }
}
