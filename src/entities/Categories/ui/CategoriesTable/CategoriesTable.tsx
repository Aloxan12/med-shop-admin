import s from "./s.module.scss";
import { AppTable } from "@/shared/ui/AppTable";
import { categoriesHeaderData } from "@/entities/Categories/model/data.ts";
import { useGetCategoriesList } from "@/entities/Categories/hools/useGetCatogiesList.ts";
import { BrushCleaning, Pencil } from "lucide-react";
import { useState } from "react";
import { useManageModal } from "@/shared/lib/hooks/useManageModal.ts";
import { CategoriesForm } from "@/entities/Categories";

export const CategoriesTable = () => {
  const { categoriesList, isLoading } = useGetCategoriesList();
  const [categoryId, setCategoryId] = useState<string>("");
  const { open, openModal, closeModal } = useManageModal();
  const handleEditClick = (id: string) => {
    setCategoryId(id);
    openModal();
  };
  const handleClose = () => {
    closeModal();
    setCategoryId("");
  };
  return (
    <>
      {categoryId && open && (
        <CategoriesForm
          closeModal={handleClose}
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
                  onClick={() => handleEditClick(item.id)}
                />
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
