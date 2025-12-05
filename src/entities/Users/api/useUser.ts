import { useAppQuery } from "@/shared/api";
import { getUserDetail, getUserList } from "../api/user.ts";
import type { GetUserListRequest, GetUserListResponse } from "../model/types";
import type { UseQueryResult } from "@tanstack/react-query";
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
  enabled: boolean = true,
): UseQueryResult<User, unknown> => {
  return useAppQuery<User, unknown>(
    ["currentUser"] as const,
    () => getUserDetail(),
    { enabled },
  );
};
