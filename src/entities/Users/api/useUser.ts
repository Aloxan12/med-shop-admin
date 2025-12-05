import { useAppMutation, useAppQuery } from "@/shared/api";
import { createUser, getUserDetail, getUserList } from "../api/user.ts";
import type {
  CreateUserRequest,
  GetUserDetailRequest,
  GetUserListRequest,
  GetUserListResponse,
  UserListDto,
} from "../model/types";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { User } from "@/entities/Login/model/types.ts";

export const useUserList = (
  params: GetUserListRequest,
): UseQueryResult<GetUserListResponse, unknown> => {
  return useAppQuery<GetUserListResponse, unknown>(
    ["userList", params] as const, // <- QueryKey
    () => getUserList(params), // <- queryFn
  );
};

export const useUserDetail = (
  params: GetUserDetailRequest,
  enabled: boolean = true,
): UseQueryResult<User, unknown> => {
  return useAppQuery<User, unknown>(
    ["currentUser", params] as const,
    () => getUserDetail(params),
    { enabled },
  );
};

export const useUserCreate = () // data: CreateUserRequest,
: UseMutationResult<UserListDto, unknown, CreateUserRequest, unknown> => {
  return useAppMutation<UserListDto, CreateUserRequest>((data) =>
    createUser(data),
  );
};
