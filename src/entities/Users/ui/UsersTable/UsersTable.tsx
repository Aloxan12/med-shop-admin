import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "@/entities/Users/model/data.ts";
import { useUserList } from "@/entities/Users/api/useUser.ts";
import { AppLoader } from "@/shared/ui/AppLoader";

export const UsersTable = () => {
  const { data, isLoading } = useUserList({ page: 1, limit: 10 });
  console.log("data", data);
  if (!data && isLoading) return <AppLoader />;
  if (!data) return null;
  return (
    <AppTable
      headerData={userHeaderData}
      data={data}
      tableDataSelectors={[{ name: "id" }, { name: "email" }, { name: "role" }]}
    />
  );
};
