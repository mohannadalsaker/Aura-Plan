import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAllRoles(@Request() req, @Query() query) {
    return this.roleService.getRoles({
      permissions: req.user.permissions,
      ...query,
    });
  }

  @Get(':id')
  async getRoleById(@Request() req, @Param('id') id: string) {
    return this.roleService.getRoleById({
      id,
      permissions: req.user.permissions,
    });
  }

  @Post()
  async createRole(@Request() req, @Body() body: CreateRoleDto) {
    return this.roleService.addRole({
      permissions: req.user.permissions,
      body,
    });
  }

  @Patch(':id')
  async updateRole(
    @Request() req,
    @Body() body: UpdateRoleDto,
    @Param('id') id: string,
  ) {
    return this.roleService.updateRole({
      permissions: req.user.permissions,
      roleId: id,
      body,
    });
  }

  @Delete(':id')
  async deleteRole(@Request() req, @Param('id') id: string) {
    return this.roleService.deleteRole({
      permissions: req.user.permissions,
      roleId: id,
    });
  }
}
