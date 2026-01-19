import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Permissions } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
