export interface UserResponseData {
  user: {
    id: string;
    username: string;
    email: string;
    last_login: string;
    role: {
      name: string;
    };
  };
  tasks: { id: string; name: string }[];
  projects: { id: string; name: string }[];
}
