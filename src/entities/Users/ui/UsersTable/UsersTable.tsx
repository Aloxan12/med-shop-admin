import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "@/entities/Users/model/data.ts";
import { useUserList } from "@/entities/Users/api/useUser.ts";
import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { UsersSkeletonTable } from "@/pages/UsersPage/ui/UsersSkeletonTable/UsersSkeletonTable.tsx";

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
  if (!data && isLoading) return <UsersSkeletonTable />;
  if (!data) return null;
  return (
    <AppTable
      headerData={userHeaderData}
      data={data}
      tableDataSelectors={[{ name: "id" }, { name: "email" }, { name: "role" }]}
    />
  );
};
