import s from "./s.module.scss";
import { AppTable } from "@/shared/ui/AppTable";
import { categoriesHeaderData } from "@/entities/Categories/model/data.ts";
import { useGetCategoriesList } from "@/entities/Categories/hools/useGetCatogiesList.ts";
import { BrushCleaning, Pencil } from "lucide-react";
import { useState } from "react";
import { CategoriesForm, RemoveCategoryModal } from "@/entities/Categories";
import type { CategoryListDto } from "../../model/types.ts";

export const CategoriesTable = () => {
  const { categoriesList, isLoading } = useGetCategoriesList();
  const [categoryId, setCategoryId] = useState<string>("");
  const [removingCategory, setRemovingCategory] =
    useState<CategoryListDto | null>(null);
  const handleEditClick = (id: string) => {
    setCategoryId(id);
  };
  const handleCloseEditModal = () => {
    setCategoryId("");
  };
  const handleCloseRemoveModal = () => {
    setRemovingCategory(null);
  };
  const handleremoveClick = (item: CategoryListDto) => {
    setRemovingCategory(item);
  };

  return (
    <>
      {removingCategory && (
        <RemoveCategoryModal
          closeModal={handleCloseRemoveModal}
          category={removingCategory}
        />
      )}
      {categoryId && (
        <CategoriesForm
          closeModal={handleCloseEditModal}
          modalTitle={"Редактировать пользователя"}
          categoryId={categoryId}
        />
      )}{" "}
      <AppTable
        headerData={categoriesHeaderData}
        isLoading={isLoading}
        data={categoriesList}
        tableDataSelectors={[
          { name: "id" },
          { name: "name" },
          { name: "description" },
          {
            renderItem: (item) => (
              <div className={s.actions}>
                <Pencil
                  size={"20"}
                  color={"blue"}
                  className={s.cursor}
                  onClick={() => handleEditClick(item.id)}
                />
                <BrushCleaning
                  size={"20"}
                  color={"red"}
                  className={s.cursor}
                  onClick={() => handleremoveClick(item)}
                />
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
