import { useAppQuery } from "@/shared/api";
import { getUserById } from "../api/user.ts";
import type { UserListDto } from "../model/types";
import type { UseQueryResult } from "@tanstack/react-query";

export const useUserById = (
  id?: string,
  extraParams?: { skip?: boolean },
): UseQueryResult<UserListDto, unknown> => {
  const enabled = !!id && !extraParams?.skip;

  return useAppQuery<UserListDto, unknown>(
    ["user", id] as const,
    () => getUserById(id as string),
    { enabled },
  );
};
