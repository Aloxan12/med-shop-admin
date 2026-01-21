// import style from "./s.module.scss";
import { AppTable } from "@/shared/ui/AppTable";
import { Pencil } from "lucide-react";
import styles from "@/entities/Users/ui/UsersTable/s.module.scss";
import { categoriesHeaderData } from "@/entities/Categories/model/data.ts";

const data = {
  count: 5,
  results: [
    { id: 1, name: "Category 1", description: "Description 1" },
    { id: 2, name: "Category 2", description: "Description 2" },
  ],
};

export const CategoriesTable = () => {
  return (
    <>
      {" "}
      <AppTable
        headerData={categoriesHeaderData}
        // isLoading={isLoading}
        data={data}
        tableDataSelectors={[
          { name: "id" },
          { name: "name" },
          { name: "description" },
          {
            renderItem: (item) => (
              <Pencil
                size={"20"}
                color={"blue"}
                className={styles.cursor}
                // onClick={() => handleEditClick(item.id)}
              />
            ),
          },
        ]}
      />
    </>
  );
};
