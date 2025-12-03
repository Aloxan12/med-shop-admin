import { AppTitleBlock } from "@/widgets/AppTitleBlock";
import { AppModal } from "@/shared/ui/AppModal";

import { UserRoundPlus } from "lucide-react";
import { CreateUserForm } from "@/entities/Users";
import { useManageModal } from "@/shared/lib/hooks/useManageModal.ts";
import { useMemo } from "react";

export const UsersHeader = () => {
  const { open, openModal, closeModal } = useManageModal();
  const actions = useMemo(
    () => [{ title: "Create User", onClick: openModal, icon: UserRoundPlus }],
    [openModal],
  );
  return (
    <>
      <AppTitleBlock title="Пользователи" actions={actions} />
      {open && (
        <AppModal
          onClose={closeModal}
          // isOpen={open}
          title={"Создать новго пользователя"}
          width={"medium"}
        >
          <CreateUserForm closeModal={closeModal} />
        </AppModal>
      )}
    </>
  );
};
