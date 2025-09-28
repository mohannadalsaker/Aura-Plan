export interface RoleData {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface RoleTableRow {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleRoleData {
  id: string;
  name: string;
  permissions: string[];
}
