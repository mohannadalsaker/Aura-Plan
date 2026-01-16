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
    return this.userService.getUserById({
      id: req.user.id,
      role: 'ADMIN',
      ...query,
    });
  }

  @Get()
  async getAllUsers(@Request() req, @Query() query) {
    return this.userService.getUsers({ role: req.user.role, ...query });
  }

  @Get('managers')
  async getManagerUsers(@Request() req) {
    return this.userService.getManagerUsers(req.user.role);
  }

  @Get('members')
  async getMemberUsers(@Request() req) {
    return this.userService.getMemberUsers(req.user.role);
  }

  @Get(':id')
  async getUser(@Request() req, @Param('id') id: string) {
    return this.userService.getUserById({
      role: req.user.role,
      id,
    });
  }

  @Delete(':id')
  async deleteUser(@Request() req, @Param('id') id: string) {
    return this.userService.deleteUser({ role: req.user.role, id });
  }

  @Post()
  async createUser(@Request() req, @Body() dto: CreateUserDto) {
    return this.userService.createUser({ body: dto, role: req.user.role });
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
      role: req.user.role,
    });
  }
}
