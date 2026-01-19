import { Injectable } from '@nestjs/common';
import { ProjectStatus, TaskStatus } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardRange } from './types';
import { getDateRange } from './utils/getDateRange';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getGlobalAnalytics() {
    const [totalTasks, totalProjects, totalUsers, avgRating] =
      await Promise.all([
        this.prisma.task.count(),
        this.prisma.project.count(),
        this.prisma.user.count(),
        this.prisma.task.aggregate({
          _avg: { rating: true },
        }),
      ]);

    return { totalTasks, totalProjects, totalUsers, avgRating };
  }

  async getTopUsersAnalytics(range: DashboardRange) {
    const dateFilter = getDateRange(range);

    return this.prisma.user.findMany({
      select: {
        username: true,
        _count: {
          select: {
            tasks: {
              where: {
                task: {
                  status: 'COMPLETED',
                  updated_at: dateFilter,
                },
              },
            },
          },
        },
      },
      take: 10,
    });
  }

  async getProjectStatusAnalytics() {
    return this.prisma.project.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
  }

  async getTaskStatusEntries(range: DashboardRange) {
    const { gte, lte } = getDateRange(range);

    const history = await this.prisma.taskStatusHistory.findMany({
      where: { changed_at: { gte, lte } },
      select: { new_status: true, changed_at: true },
      orderBy: { changed_at: 'asc' },
    });

    const result = history.reduce(
      (acc, h) => {
        const date = dayjs(h.changed_at).format('MMM DD');

        if (!acc[date]) {
          acc[date] = {
            date,
            todo: 0,
            in_progress: 0,
            review: 0,
            completed: 0,
            cancelled: 0,
          };
        }

        acc[date][h.new_status.toLowerCase()]++;
        return acc;
      },
      {} as Record<string, any>,
    );

    return Object.values(result);
  }
}
