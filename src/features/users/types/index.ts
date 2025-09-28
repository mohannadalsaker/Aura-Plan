export interface UsersData {
  id: string;
  username: string;
  email: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  role: {
    id: string;
    name: string;
  };
}
export interface UserTableRow {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface SingleUserData {
  id: string;
  username: string;
  role_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
}
