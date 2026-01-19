import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionService } from './permission.service';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getPermissions(@Request() req) {
    return this.permissionService.getAllPermissions();
  }
}
