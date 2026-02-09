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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@Request() req, @Query() query) {
    return this.userService.getUserProfile({
      id: req.user.id,
      permissions: req.user.permissions,
      ...query,
    });
  }

  @Get()
  async getAllUsers(@Request() req, @Query() query) {
    return this.userService.getUsers({
      permissions: req.user.permissions,
      ...query,
    });
  }

  @Get('managers')
  async getManagerUsers(@Request() req) {
    return this.userService.getManagerUsers(req.user.permissions);
  }

  @Get('members')
  async getMemberUsers(@Request() req) {
    return this.userService.getMemberUsers(req.user.permissions);
  }

  @Get(':id')
  async getUser(@Request() req, @Param('id') id: string) {
    return this.userService.getUserById({
      permissions: req.user.permissions,
      id,
    });
  }

  @Delete(':id')
  async deleteUser(@Request() req, @Param('id') id: string) {
    return this.userService.deleteUser({
      permissions: req.user.permissions,
      id,
    });
  }

  @Post()
  async createUser(@Request() req, @Body() dto: CreateUserDto) {
    return this.userService.createUser({
      body: dto,
      permissions: req.user.permissions,
    });
  }

  @Patch(':id')
  async updateUser(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser({
      userId: id,
      body: dto,
      permissions: req.user.permissions,
    });
  }
}
