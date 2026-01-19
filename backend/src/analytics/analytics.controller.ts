import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { DashboardRange } from './types';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('statistics')
  async getStatistics() {
    return this.analyticsService.getGlobalAnalytics();
  }
  @Get('projects')
  async getProjectStatus() {
    return this.analyticsService.getProjectStatusAnalytics();
  }
  @Get('users')
  async getUsersAnalytics(@Query('range') range: DashboardRange) {
    return this.analyticsService.getTopUsersAnalytics(range);
  }
  @Get('tasks/entries')
  async getEvolution(@Query('range') range: DashboardRange) {
    return this.analyticsService.getTaskStatusEntries(range);
  }
}
