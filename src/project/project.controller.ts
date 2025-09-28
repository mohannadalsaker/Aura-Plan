import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  async getAllProjects(@Request() req) {
    return this.projectService.getAllProjects({
      role: req.user.role,
      userId: req.user.id,
    });
  }

  @Get(':id')
  async getPorjectById(@Request() req, @Param('id') id: string) {
    return this.projectService.getProject({
      role: req.user.role,
      userId: req.user.id,
      id,
    });
  }

  @Get(':id/users')
  async getProjectUsers(@Request() req, @Param('id') id: string) {
    return this.projectService.getProjectUsers({
      role: req.user.role,
      id,
    });
  }

  @Get('user/:id')
  async getUserProjects(@Param('id') userId: string) {
    return this.projectService.getAllProjects({ userId });
  }

  @Post()
  async createProject(@Request() req, @Body() body: CreateProjectDto) {
    return this.projectService.createProject({ role: req.user.role, body });
  }

  @Post('changeStatus/:id')
  async changeProjectStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() body: ChangeProjectStatusDto,
  ) {
    return this.projectService.changeStatus({
      role: req.user.role,
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
      role: req.user.role,
      body,
      projectId: id,
    });
  }

  @Delete(':id')
  async deleteProject(@Request() req, @Param('id') id: string) {
    return this.projectService.deleteProject({ role: req.user.role, id });
  }
}
