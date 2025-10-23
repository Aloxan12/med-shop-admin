export enum UserRoles {
  superadmin = "superadmin",
  admin = "admin",
  manager = "manager",
  client = "client ",
}

export interface UserListDto {
  id: string;
  email: string;
  role: UserRoles;
  isActive: boolean;
  createdAt: string;
}

export interface GetUserListRequest {
  search?: string;
  limit?: number;
  page?: number;
}

export interface GetUserListResponse {
  total: number;
  pages: number;
  page: number;
  limit: number;
  data: UserListDto[];
}
