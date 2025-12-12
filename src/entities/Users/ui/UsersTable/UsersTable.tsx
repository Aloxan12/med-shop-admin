import { AppTable } from "@/shared/ui/AppTable";
import { userHeaderData } from "../../model/data.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { Pencil } from "lucide-react";
import { useGetUserList } from "../../hooks/useGetUserList.ts";
import { useState } from "react";
import { CreateUserForm } from "@/entities/Users";
import { useManageModal } from "@/shared/lib/hooks/useManageModal.ts";
import styles from "./s.module.scss";

export const UsersTable = () => {
  const { userList, isLoading } = useGetUserList();
  const [userId, setUserId] = useState<string>("");
  const { open, openModal, closeModal } = useManageModal();
  const handleEditClick = (id: string) => {
    setUserId(id);
    openModal();
  };
  const handleClose = () => {
    closeModal();
    setUserId("");
  };
  return (
    <>
      {userId && open && (
        <CreateUserForm
          closeModal={handleClose}
          modalTitle={"Редактировать пользователя"}
          userId={userId}
        />
      )}
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
    </>
  );
};

// где должен быть этот тип
export interface tableColumnsNamesType {
  name: string;
  width: string;
}
