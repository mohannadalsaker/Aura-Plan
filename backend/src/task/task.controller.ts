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
import { TaskService } from './task.service';
import {
  ChangeTaskStatusDto,
  CreateTaskDto,
  RateTaskDto,
  UpdateTaskDto,
} from './dto/task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(@Request() req, @Query() query) {
    return this.taskService.getAllTasks({
      permissions: req.user.permissions,
      userId: req.user.id,
      ...query,
    });
  }

  @Get('/project/:id')
  async getTasksByProjectId(@Param('id') id: string, @Request() req) {
    return this.taskService.getAllTasks({
      permissions: req.user.permissions,
      userId: req.user.id,
      projectId: id,
    });
  }

  @Get('/user/:id')
  async getUserTasks(@Request() req, @Param('id') userId: string) {
    return this.taskService.getAllTasks({
      permissions: req.user.permissions,
      userId,
    });
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string, @Request() req) {
    return this.taskService.getTask({
      permissions: req.user.permissions,
      taskId: id,
      userId: req.user.id,
    });
  }

  @Post()
  async createTask(@Request() req, @Body() body: CreateTaskDto) {
    return this.taskService.createTask({
      permissions: req.user.permissions,
      body,
      userId: req.user.id,
    });
  }

  @Post('changeStatus/:id')
  async changeTaskStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() body: ChangeTaskStatusDto,
  ) {
    return this.taskService.changeStatus({
      permissions: req.user.permissions,
      body,
      userId: req.user.id,
      id,
    });
  }

  @Post('rate/:id')
  async rateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() body: RateTaskDto,
  ) {
    return this.taskService.rateTask({
      permissions: req.user.permissions,
      body,
      userId: req.user.id,
      id,
    });
  }

  @Patch(':id')
  async updateTask(
    @Request() req,
    @Body() body: UpdateTaskDto,
    @Param('id') id: string,
  ) {
    return this.taskService.updateTask({
      permissions: req.user.permissions,
      body,
      taskId: id,
      userId: req.user.id,
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Request() req) {
    return this.taskService.deleteTask({
      permissions: req.user.permissions,
      id,
    });
  }
}
