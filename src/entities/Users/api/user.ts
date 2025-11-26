import { api } from "@/shared/api";
import type {
  CreateUserRequest,
  GetUserListRequest,
  GetUserListResponse,
  UserListDto,
} from "../model/types";

export const getUserList = async (
  data: GetUserListRequest,
): Promise<GetUserListResponse> => {
  const response = await api.get<GetUserListResponse>("/users", {
    params: data,
  });
  return response.data;
};

export const createUser = async (
  data: CreateUserRequest,
): Promise<UserListDto> => {
  const response = await api.post<UserListDto>("/users", data);
  return response.data;
};
