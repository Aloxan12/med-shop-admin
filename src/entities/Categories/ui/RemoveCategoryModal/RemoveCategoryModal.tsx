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
  const { mutate: removeCategory } = useRemoveCategory();

  const removeCategoryHandler = () => {
    removeCategory(category.id);
    closeModal();
  };

  return (
    <AppModal
      onClose={closeModal}
      title={
        category &&
        `Вы действительно хотите удалить категорию ${category.name}?`
      }
    >
      <div className={s.buttonsContainer}>
        <AppButton
          fullWidth={true}
          variant={"secondary"}
          text={"Да"}
          onClick={removeCategoryHandler}
        />
        <AppButton
          fullWidth={true}
          variant={"primary"}
          onClick={closeModal}
          text={"Нет"}
        />
      </div>
    </AppModal>
  );
};
