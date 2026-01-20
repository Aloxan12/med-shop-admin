import { AppTitleBlock } from "@/widgets/AppTitleBlock";
import { useMemo } from "react";
import { useManageModal } from "@/shared/lib/hooks/useManageModal.ts";
import { BadgePlus } from "lucide-react";

export const Categoriesheader = () => {
  // const { open, openModal, closeModal } = useManageModal();
  const { openModal } = useManageModal();
  const actions = useMemo(
    () => [{ title: "Создать категорию", onClick: openModal, icon: BadgePlus }],
    [openModal],
  );
  return (
    <>
      <AppTitleBlock title="Категории" actions={actions} />
    </>
  );
};
