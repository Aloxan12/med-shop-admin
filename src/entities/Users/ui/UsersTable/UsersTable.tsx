import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "@/entities/Users/model/data.ts";
import { useUserList } from "@/entities/Users/api/useUser.ts";
import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { Pencil } from "lucide-react";

export const UsersTable = () => {
  const params = useParamsControl<
    { page?: string; limit?: string },
    "page" | "limit"
  >({
    paramsList: [],
    withPagination: true,
    resetPagination: false,
  });
  const { page, limit } = params || {};
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 1;
  const { data, isLoading } = useUserList({ page: pageNum, limit: limitNum });

  return (
    <AppTable
      headerData={userHeaderData}
      isLoading={isLoading}
      data={data}
      tableDataSelectors={[
        { name: "id" },
        { name: "email" },
        { name: "role" },
        { renderItem: () => <Pencil size={"20"} color={"blue"} /> },
      ]}
    />
  );
};

// где должен быть этот тип
export interface tableColumnsNamesType {
  name: string;
  width: string;
}
