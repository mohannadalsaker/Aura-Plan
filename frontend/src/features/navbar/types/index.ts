import type { Permissions } from "@/shared/types";

export interface UserResponseData {
  user: {
    id: string;
    username: string;
    email: string;
    last_login: string;
    role: {
      name: string;
      permissions: Permissions[];
    };
  };
  tasks: { id: string; title: string }[];
  projects: { id: string; title: string }[];
}
