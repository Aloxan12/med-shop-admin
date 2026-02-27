import { AppTitleBlock } from "@/widgets/AppTitleBlock";
import { useMemo } from "react";
import { BadgePlus } from "lucide-react";
import { useManageModal } from "@/shared/lib/hooks/useManageModal.ts";
import { CreateProductForm } from "@/entities/Products/ui/CreateProductForm/CreateProductForm.tsx";

export const ProductsHeader = () => {
  const { open, openModal, closeModal } = useManageModal();
  const actions = useMemo(
    () => [{ title: "Создать товар", onClick: openModal, icon: BadgePlus }],
    [openModal],
  );

  return (
    <>
      <AppTitleBlock title="Товары" actions={actions} />
      {open && (
        <CreateProductForm
          closeModal={closeModal}
          modalTitle={"Создать новый товар"}
        />
      )}
    </>
  );
};
