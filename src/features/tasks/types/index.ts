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
  status: TaskStatus;
  rating: number;
  creator: {
    id: string;
    username: string;
  };
  updated_at: string;
  created_at: string;
  users: {
    user_id: string;
    task_id: string;
    user: {
      id: string;
      username: string;
    };
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
