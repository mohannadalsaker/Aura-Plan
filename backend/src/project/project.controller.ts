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
import {
  ChangeProjectStatusDto,
  CreateProjectDto,
  UpdateProjectDto,
} from './dto/project.dto';
import { ProjectService } from './project.service';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getAllProjects(@Request() req, @Query() query) {
    return this.projectService.getAllProjects({
      permissions: req.user.permissions,
      userId: req.user.id,
      ...query,
    });
  }

  @Get(':id')
  async getPorjectById(@Request() req, @Param('id') id: string) {
    return this.projectService.getProject({
      permissions: req.user.permissions,
      userId: req.user.id,
      id,
    });
  }

  @Get(':id/users')
  async getProjectUsers(@Request() req, @Param('id') id: string) {
    return this.projectService.getProjectUsers({
      permissions: req.user.permissions,
      id,
    });
  }

  @Get('user/:id')
  async getUserProjects(@Request() req, @Param('id') userId: string) {
    return this.projectService.getAllProjects({
      permissions: req.user.permissions,
      userId,
    });
  }

  @Post()
  async createProject(@Request() req, @Body() body: CreateProjectDto) {
    return this.projectService.createProject({
      permissions: req.user.permissions,
      body,
    });
  }

  @Post('changeStatus/:id')
  async changeProjectStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() body: ChangeProjectStatusDto,
  ) {
    return this.projectService.changeStatus({
      permissions: req.user.permissions,
      body,
      id,
      userId: req.user.id,
    });
  }

  @Patch(':id')
  async updateProject(
    @Request() req,
    @Body() body: UpdateProjectDto,
    @Param('id') id: string,
  ) {
    return this.projectService.updateProject({
      permissions: req.user.permissions,
      body,
      projectId: id,
    });
  }

  @Delete(':id')
  async deleteProject(@Request() req, @Param('id') id: string) {
    return this.projectService.deleteProject({
      permissions: req.user.permissions,
      id,
    });
  }
}
