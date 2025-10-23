import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "@/entities/Users/model/data.ts";
import { dataTable } from "@/shared/ui/AppTable/moc/table.ts";

export const UsersTable = () => {
  return (
    <AppTable
      headerData={userHeaderData}
      data={dataTable}
      tableDataSelectors={[
        { name: "name" },
        { name: "age" },
        { name: "surname" },
        {
          renderItem: (item) => <input type="checkbox" checked={item.isDone} />,
        },
      ]}
    />
  );
};
