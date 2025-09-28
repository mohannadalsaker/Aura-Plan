export interface UserResponseData {
  id: string;
  username: string;
  email: string;
  last_login: string;
  role: {
    name: string;
  };
}
