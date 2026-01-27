// import style from "./s.module.scss";
import { AppTable } from "@/shared/ui/AppTable";
import { categoriesHeaderData } from "@/entities/Categories/model/data.ts";
import { useGetCategoriesList } from "@/entities/Categories/hools/useGetCatogiesList.ts";

export const CategoriesTable = () => {
  const { categoriesList, isLoading } = useGetCategoriesList();
  console.log(categoriesList);
  return (
    <>
      {" "}
      <AppTable
        headerData={categoriesHeaderData}
        isLoading={isLoading}
        data={categoriesList}
        tableDataSelectors={[
          { name: "id" },
          { name: "name" },
          { name: "description" },
          // {
          //   renderItem: (item) => (
          //     <Pencil
          //       size={"20"}
          //       color={"blue"}
          //       className={styles.cursor}
          //       // onClick={() => handleEditClick(item.id)}
          //     />
          //   ),
          // },
        ]}
      />
    </>
  );
};
