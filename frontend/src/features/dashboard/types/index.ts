import type { ProjectStatus } from "@/features/projects/types";

export interface SummaryStatsData {
  totalTasks: number;
  totalProjects: number;
  totalUsers: number;
  avgRating: {
    _avg: {
      rating: number;
    };
  };
}

export interface ProjectsStatsData {
  _count: {
    _all: number;
  };
  status: ProjectStatus;
}

export interface TasksStatsData {
  date: string;
  todo: number;
  in_progress: number;
  review: number;
  completed: number;
  cancelled: number;
}

export interface UsersStatsdata {
  username: string;
  _count: {
    tasks: number;
  };
}
