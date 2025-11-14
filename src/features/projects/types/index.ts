import type { TaskStatus } from "@/features/tasks/types";

interface ProjectManager {
  id: string;
  username: string;
}

interface ProjectMember {
  id: string;
  username: string;
}

export interface ProjectData {
  id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
  manager: ProjectManager;
  members: ProjectMember[];
  created_at: string;
}

export interface ProjectTableRow {
  id: string;
  title: string;
  status: string;
  managerName: string;
  startDate: string;
  endDate: string;
}

export interface SingleProjectData {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: ProjectStatus;
  manager_id: string;
  members: MemberData[];
  manager: MemberData;
}

export interface MemberData {
  id: string;
  username: string;
}

export interface ProjectTasksData {
  id: string;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  status: TaskStatus;
  title: string;
  creator: {
    id: string;
    username: string;
    email: string;
  };
}

export interface TaskCommentsData {
  id: string;
  text: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProjectTasksTableRow {
  id: string;
  title: string;
  status: string;
  creatorName: string;
}

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PLANNING = "PLANNING",
  ON_HOLD = "ON_HOLD",
}
