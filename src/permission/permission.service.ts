import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Permissions } from '@prisma/client';
import { UserRole } from 'src/user/types';

@Injectable()
export class PermissionService {
  async getAllPermissions(role: UserRole) {
    if (role !== 'ADMIN') throw new UnauthorizedException('User not allowed');
    return Object.values(Permissions);
  }
}
