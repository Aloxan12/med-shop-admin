import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "../../model/data.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetUserList } from "../../hooks/useGetUserList.ts";

export const UsersTable = () => {
  const { userList, isLoading } = useGetUserList();
  return (
    <AppTable
      headerData={userHeaderData}
      isLoading={isLoading}
      data={userList}
      // почему нельзя этот массив вынести в переменную
      tableDataSelectors={[{ name: "id" }, { name: "email" }, { name: "role" }]}
    />
  );
};
