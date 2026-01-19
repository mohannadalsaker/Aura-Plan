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
