import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "@/entities/Users/model/data.ts";
import { useUserList } from "@/entities/Users/api/useUser.ts";
import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { AppTableSkeleton } from "@/shared/ui/AppTableSkeleton/AppTableSkeleton.tsx";

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
  if (!data && isLoading)
    return (
      <AppTableSkeleton
        rowCount={1}
        // тут похоже на дублирование объекта с пропсом в appTable
        tableColumnsNames={[
          { name: "id", width: "40%" },
          { name: "email", width: "20%" },
          { name: "role", width: "40%" },
        ]}
      />
    );
  if (!data) return null;
  return (
    <AppTable
      headerData={userHeaderData}
      data={data}
      //почему нельзя этот массив вынести в переменную
      tableDataSelectors={[{ name: "id" }, { name: "email" }, { name: "role" }]}
    />
  );
};

// где должен быть этот тип
export interface tableColumnsNamesType {
  name: string;
  width: string;
}
