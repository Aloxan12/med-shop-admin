import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "../../model/data.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { Pencil } from "lucide-react";
import { useGetUserList } from "../../hooks/useGetUserList.ts";

export const UsersTable = () => {
  const { userList, isLoading } = useGetUserList();
  return (
    <AppTable
      headerData={userHeaderData}
      isLoading={isLoading}
      data={userList}
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
