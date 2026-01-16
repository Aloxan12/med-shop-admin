import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import type { GetUserListRequest } from "../model/types.ts";
import { useUserList } from "../api/useUser.ts";

export const useGetUserList = () => {
  const params = useParamsControl<GetUserListRequest>({
    paramsList: ["search"],
    withPagination: true,
  });
  console.log(params);
  const { data: userList, isLoading } = useUserList(
    { ...params },
    { skip: !params },
  );

  return { userList, isLoading };
};
