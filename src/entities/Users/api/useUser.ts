import { useAppQuery } from "@/shared/api";
import { getUserList } from "../api/user.ts";
import type { GetUserListRequest, GetUserListResponse } from "../model/types";
import type { UseQueryResult } from "@tanstack/react-query";

export const useUserList = (
  params: GetUserListRequest,
): UseQueryResult<GetUserListResponse, unknown> => {
  return useAppQuery<GetUserListResponse, unknown>(
    ["userList", params] as const, // <- QueryKey
    () => getUserList(params), // <- queryFn
  );
};
