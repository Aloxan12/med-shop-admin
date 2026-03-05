import { AppModal } from "@/shared/ui/AppModal";
import { AppFlex } from "@/shared/ui/AppFlex";
import styles from "@/entities/Users/ui/CreateUserForm/style.module.css";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppButton } from "@/shared/ui/AppButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryShema } from "../CreateCategoriesForm/shema.ts";
import { useCreateCategory } from "../../api/useCraeteCategory.ts";
import { toast } from "react-hot-toast";
import { useEditCategory } from "../../api/useEditCategory.ts";
import { useCategoryById } from "../../api/useCategoryById.ts";
import { useEffect } from "react";
import { AppLoader } from "@/shared/ui/AppLoader";

type PropsType = {
  closeModal: () => void;
  categoryId?: string;
  modalTitle: string;
};
export const CategoriesForm = ({
  closeModal,
  modalTitle,
  categoryId,
}: PropsType) => {
  const {
    control,
    handleSubmit,
    reset,
    // setError,
    setValue,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(createCategoryShema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: editCategory } = useEditCategory();
  const { data: editingCategory, isLoading: isCategoryLoading } =
    useCategoryById(categoryId);
  useCreateCategory();
  const handleSuccess = (message: string) => {
    toast.success(message);
    reset();
    closeModal();
  };
  useEffect(() => {
    if (editingCategory) {
      setValue("name", editingCategory.name);
      setValue("description", editingCategory.description);
    }
  }, [editingCategory, setValue]);
  const onSubmit = (data: any) => {
    if (categoryId) {
      editCategory(
        { id: categoryId, data: data },
        { onSuccess: () => handleSuccess("Категория создана") },
      );
    } else {
      createCategory(data, {
        onSuccess: () => handleSuccess("Категория создана"),
      });
    }
  };
  if (isCategoryLoading) {
    return <AppLoader />;
  }
  return (
    <AppModal title={modalTitle} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppFlex
          direction="column"
          align="start"
          gap={"26"}
          fullWidth
          className={styles.appFlex}
        >
          <ControlledAppInput
            control={control}
            name="name"
            placeholder={"Введите название категории"}
            type="text"
            fullWidth
          />
          <ControlledAppInput
            control={control}
            name="description"
            placeholder={"Введите описание"}
            type="text"
            fullWidth
          />
        </AppFlex>
        <AppButton type={"submit"} text={"создать"} />
      </form>
    </AppModal>
  );
};
