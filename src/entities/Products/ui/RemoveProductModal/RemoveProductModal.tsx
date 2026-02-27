import { AppModal } from "@/shared/ui/AppModal";
import { AppButton } from "@/shared/ui/AppButton";
import type { ProductListDto } from "@/entities/Products/model/types.ts";
import { useRemoveProduct } from "@/entities/Products/api/useRemoveProduct.ts";
import s from "./s.module.scss";

type PropsType = {
  closeModal: () => void;
  product: ProductListDto;
};

export const RemoveProductModal = ({ closeModal, product }: PropsType) => {
  const { mutate: removeProduct, isPending } = useRemoveProduct();

  const removeProductHandler = (onClose: () => void) => () => {
    removeProduct(product.id);
    onClose();
  };

  return (
    <AppModal
      onClose={closeModal}
      title={`Вы действительно хотите удалить товар ${product.name}?`}
    >
      {(onModalClose) => (
        <div className={s.buttonsContainer}>
          <AppButton
            fullWidth
            variant={"secondary"}
            text={"Да"}
            disabled={isPending}
            onClick={removeProductHandler(onModalClose)}
          />
          <AppButton
            fullWidth
            variant={"primary"}
            onClick={onModalClose}
            text={"Нет"}
          />
        </div>
      )}
    </AppModal>
  );
};
