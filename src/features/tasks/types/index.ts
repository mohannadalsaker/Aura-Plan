interface TaskProject {
  id: string;
  title: string;
}

interface TaskCreator {
  id: string;
  username: string;
}

export interface TaskData {
  id: string;
  title: string;
  status: string;
  end_date: string | null;
  project: TaskProject;
  creator: TaskCreator;
}

export interface TaskTableRow {
  id: string;
  title: string;
  status: string;
  projectName: string;
  creatorName: string;
  endDate: string;
}
export interface SingleTaskData {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  creator_id: string;
  users: {
    user_id: string;
    task_id: string;
  }[];
  project_id: string;
}
export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REVIEW = "REVIEW",
}
