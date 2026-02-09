import { ForbiddenException, Injectable } from '@nestjs/common';
import { Permissions } from '@prisma/client';

@Injectable()
export class PermissionService {
  has({
    permission,
    permissions,
  }: {
    permissions: Permissions[];
    permission: Permissions;
  }): boolean {
    return permissions.includes(permission);
  }

  async getAllPermissions() {
    const allPermissions = Object.values(Permissions) as Permissions[];
    return allPermissions;
  }

  assert({
    permission,
    permissions,
  }: {
    permissions: Permissions[];
    permission: Permissions;
  }): void {
    if (!this.has({ permissions, permission })) {
      throw new ForbiddenException(`Missing permission: ${permission}`);
    }
  }
}
