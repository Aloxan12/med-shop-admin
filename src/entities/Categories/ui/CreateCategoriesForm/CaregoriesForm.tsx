import { AppModal } from "@/shared/ui/AppModal";
import { AppFlex } from "@/shared/ui/AppFlex";
import styles from "@/entities/Users/ui/CreateUserForm/style.module.css";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppButton } from "@/shared/ui/AppButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "@/entities/Users/ui/CreateUserForm/shema.ts";
import { createCategoryShema } from "@/entities/Categories/ui/CreateCategoriesForm/shema.ts";
import { useCreateCategory } from "@/entities/Categories/api/useCraeteCategory.ts";
import { toast } from "react-hot-toast";

type PropsType = {
  closeModal: () => void;
  // userId?: string;
  modalTitle: string;
};
export const CategoriesForm = ({ closeModal, modalTitle }: PropsType) => {
  const {
    control,
    handleSubmit,
    reset,
    // setError,
    // setValue,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(createCategoryShema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { mutate: createCategory } = useCreateCategory();
  const handleSuccess = (message: string) => {
    toast.success(message);
    reset();
    closeModal();
  };
  const onSubmit = (data: any) => {
    createCategory(data, {
      onSuccess: () => handleSuccess("Категория создана"),
    });
  };
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
