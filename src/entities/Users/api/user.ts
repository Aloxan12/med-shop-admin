import { api } from "@/shared/api";
import type {
  CreateUserRequest,
  GetUserListRequest,
  GetUserListResponse,
  UserListDto,
} from "../model/types";
import type { User } from "@/entities/Login/model/types.ts";

export const getUserList = async (
  data: GetUserListRequest,
): Promise<GetUserListResponse> => {
  const response = await api.get<GetUserListResponse>("/users", {
    params: data,
  });
  return response.data;
};

export const getUserDetail = async (): Promise<User> => {
  const response = await api.get<User>("/users/currentUser");
  return response.data;
};

export const createUser = async (
  data: CreateUserRequest, // <- исправил параметр
): Promise<UserListDto> => {
  const response = await api.post<UserListDto>("/users", data); // <- data вместо CreateUserRequest
  return response.data;
};
