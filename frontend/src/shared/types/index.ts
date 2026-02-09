export interface ApiResponse<T> {
  data: T[];
}

export interface ApiResponseById<T> {
  data: T;
}

export interface ApiPagingatedResponse<T> {
  data: {
    data: T[];
    total: number;
    pageSize?: number;
    pageNumber?: number;
  };
}

export interface PaginatedTableData<T> {
  data: T[];
  total: number;
  pageSize?: number;
  pageNumber?: number;
}

export interface QueryParams {
  pageNumber: number;
  pageSize: number;
  q: string;
}

export interface ErrorResponse {
  message: string;
  success: boolean;
  path: string;
}

export enum Permissions {
  // PROJECT
  CREATE_PROJECT = "CREATE_PROJECT",
  READ_ALL_PROJECTS = "READ_ALL_PROJECTS",
  READ_PROJECT = "READ_PROJECT",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  CHANGE_PROJECT_STATUS = "CHANGE_PROJECT_STATUS",
  MANAGE_PROJECT = "MANAGE_PROJECT",
  PARTICIPATE_PROJECT = "PARTICIPATE_PROJECT",

  // TASK
  CREATE_TASK = "CREATE_TASK",
  READ_ALL_TASKS = "READ_ALL_TASKS",
  READ_TASK = "READ_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  RATE_TASK = "RATE_TASK",
  CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",

  // USER
  CREATE_USER = "CREATE_USER",
  READ_ALL_USERS = "READ_ALL_USERS",
  READ_USER = "READ_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",

  // ROLE
  CREATE_ROLE = "CREATE_ROLE",
  READ_ALL_ROLES = "READ_ALL_ROLES",
  READ_ROLE = "READ_ROLE",
  UPDATE_ROLE = "UPDATE_ROLE",
  DELETE_ROLE = "DELETE_ROLE",

  // COMMENT
  CREATE_COMMENT = "CREATE_COMMENT",
  READ_ALL_COMMENTS = "READ_ALL_COMMENTS",
  READ_COMMENT = "READ_COMMENT",
  UPDATE_COMMENT = "UPDATE_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
}
