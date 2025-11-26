import { useAppMutation, useAppQuery } from "@/shared/api";
import { createUser, getUserList } from "../api/user.ts";
import type {
  CreateUserRequest,
  GetUserListRequest,
  GetUserListResponse,
  UserListDto,
} from "../model/types";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export const useUserList = (
  params: GetUserListRequest,
): UseQueryResult<GetUserListResponse, unknown> => {
  return useAppQuery<GetUserListResponse, unknown>(
    ["userList", params] as const, // <- QueryKey
    () => getUserList(params), // <- queryFn
  );
};

export const useUserCreate = () // data: CreateUserRequest,
: UseMutationResult<UserListDto, unknown, CreateUserRequest, unknown> => {
  return useAppMutation<UserListDto, CreateUserRequest>((data) =>
    createUser(data),
  );
};
