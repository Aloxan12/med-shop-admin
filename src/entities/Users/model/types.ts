// export enum UserRoles {
//   superadmin = "superadmin",
//   admin = "admin",
//   manager = "manager",
//   client = "client ",
// }

export interface UserListDto {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

export interface GetUserListRequest {
  search?: string;
  limit?: number;
  page?: number;
}

export interface GetUserListResponse {
  count: number;
  pages: number;
  page: number;
  limit: number;
  results: UserListDto[];
}

type Role = "superadmin" | "admin" | "manager" | "client";

export interface UserRoleType {
  value: Role;
  label: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: Role;
}
export type UpdateUserRequest = Omit<CreateUserRequest, "password">;
