import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Permissions } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async getAllPermissions() {
    return Object.values(Permissions);
  }

  async hasPermission({
    role,
    permission,
  }: {
    role: string;
    permission: Permissions;
  }) {
    const foundRole = await this.prisma.role.findUnique({
      where: { name: role },
    });
    if (!foundRole) throw new NotFoundException('Role not found');
    if (!foundRole.permissions.includes(permission))
      throw new ForbiddenException(
        `You don't have permission to ${permission}`,
      );
    return true;
  }
}
