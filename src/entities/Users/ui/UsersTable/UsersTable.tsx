import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "../../model/data.ts";
import { useUserList } from "../../api/useUser.ts";
import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import "react-loading-skeleton/dist/skeleton.css";
import type { GetUserListRequest } from "../../model/types.ts";

export const UsersTable = () => {
  const params = useParamsControl<GetUserListRequest>({
    paramsList: ["search"],
    withPagination: true,
  });
  const { data, isLoading } = useUserList({ ...params }, { skip: !params });

  return (
    <AppTable
      headerData={userHeaderData}
      isLoading={isLoading}
      data={data}
      // почему нельзя этот массив вынести в переменную
      tableDataSelectors={[{ name: "id" }, { name: "email" }, { name: "role" }]}
    />
  );
};
