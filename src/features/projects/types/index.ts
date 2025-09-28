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

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PLANNING = "PLANNING",
  ON_HOLD = "ON_HOLD",
}
