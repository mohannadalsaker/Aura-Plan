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
      role: req.user.role,
      userId: req.user.id,
      ...query,
    });
  }

  @Get('/project/:id')
  async getTasksByProjectId(@Param('id') id: string, @Request() req) {
    return this.taskService.getAllTasks({
      role: req.user.role,
      userId: req.user.id,
      projectId: id,
    });
  }

  @Get('/user/:id')
  async getUserTasks(@Request() req, @Param('id') userId: string) {
    return this.taskService.getAllTasks({ role: req.user.role, userId });
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string, @Request() req) {
    return this.taskService.getTask({
      role: req.user.role,
      taskId: id,
      userId: req.user.id,
    });
  }

  @Post()
  async createTask(@Request() req, @Body() body: CreateTaskDto) {
    return this.taskService.createTask({
      role: req.user.role,
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
      role: req.user.role,
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
      role: req.user.role,
      body,
      taskId: id,
      userId: req.user.id,
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Request() req) {
    return this.taskService.deleteTask({ role: req.user.role, id });
  }
}
