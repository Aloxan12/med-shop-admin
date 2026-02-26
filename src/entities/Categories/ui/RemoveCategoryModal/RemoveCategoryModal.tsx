import s from "./s.module.scss";
import { AppModal } from "@/shared/ui/AppModal";
import { AppButton } from "@/shared/ui/AppButton";
import type { CategoryListDto } from "../../model/types.ts";
import { useRemoveCategory } from "@/entities/Categories/api/useRemoveCategory.ts";

type PropsType = {
  closeModal: () => void;
  category: CategoryListDto;
};
export const RemoveCategoryModal = ({ closeModal, category }: PropsType) => {
  const { mutate: removeCategory, isPending } = useRemoveCategory();

  const removeCategoryHandler = (onClose: () => void) => () => {
    removeCategory(category.id);
    onClose();
  };

  return (
    <AppModal
      onClose={closeModal}
      title={
        category &&
        `Вы действительно хотите удалить категорию ${category.name}?`
      }
    >
      {(onModalClose) => (
        <div className={s.buttonsContainer}>
          <AppButton
            fullWidth={true}
            variant={"secondary"}
            text={"Да"}
            disabled={isPending}
            onClick={removeCategoryHandler(onModalClose)}
          />
          <AppButton
            fullWidth={true}
            variant={"primary"}
            onClick={onModalClose}
            text={"Нет"}
          />
        </div>
      )}
    </AppModal>
  );
};
