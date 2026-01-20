import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "../../model/data.ts";
import { Pencil } from "lucide-react";
import { useGetUserList } from "../../hooks/useGetUserList.ts";
import { useState } from "react";
import { CreateUserForm } from "@/entities/Users";
import { useManageModal } from "@/shared/lib/hooks/useManageModal.ts";
import styles from "./s.module.scss";
import { AppFilterInput } from "@/shared/ui/AppFilterInput";
import { useSearchParams } from "react-router-dom";

export const UsersTable = () => {
  const { userList, isLoading } = useGetUserList();
  const [userId, setUserId] = useState<string>("");
  const { open, openModal, closeModal } = useManageModal();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") ?? ""; // null → ''
  const hasEmptySearchParam = searchParams.has("search") && searchValue !== "";

  const shouldHideTable =
    !isLoading && userList?.results?.length === 0 && hasEmptySearchParam;
  const handleEditClick = (id: string) => {
    setUserId(id);
    openModal();
  };
  const handleClose = () => {
    closeModal();
    setUserId("");
  };
  console.log(hasEmptySearchParam);

  return (
    <>
      {userId && open && (
        <CreateUserForm
          closeModal={handleClose}
          modalTitle={"Редактировать пользователя"}
          userId={userId}
        />
      )}
      <AppFilterInput
        placeholder={"Search by email or other user fields"}
        searchParam={"search"}
      />
      {!shouldHideTable && (
        <AppTable
          headerData={userHeaderData}
          isLoading={isLoading}
          data={userList}
          tableDataSelectors={[
            { name: "id" },
            { name: "email" },
            { name: "role" },
            {
              renderItem: (item) => (
                <Pencil
                  size={"20"}
                  color={"blue"}
                  className={styles.cursor}
                  onClick={() => handleEditClick(item.id)}
                />
              ),
            },
          ]}
        />
      )}
      {shouldHideTable && (
        <div>Нет результатов по пустому поиску. Введите текст.</div> // Опционально: плейсхолдер
      )}
    </>
  );
};

// где должен быть этот тип
export interface tableColumnsNamesType {
  name: string;
  width: string;
}
