import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./shema.ts";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppDropdown } from "@/shared/ui/AppDropDown/AppDropDown.tsx";
import { AppButton } from "@/shared/ui/AppButton";
import { usersRoleData } from "@/entities/Users/model/data.ts";
import { useEffect, useState } from "react";
import type { UserRoleType } from "@/entities/Users/model/types.ts";
import { useCreateUser } from "@/entities/Users/api/useCreateUser.ts";
import { AppFlex } from "@/shared/ui/AppFlex";
import styles from "./style.module.css";
import { AppModal } from "@/shared/ui/AppModal";
import { useUserById } from "@/entities/Users/api/useGetUserById.ts";
import { AppLoader } from "@/shared/ui/AppLoader";
import { useEditUser } from "@/entities/Users/api/useEditUser.ts";

type PropsType = {
  closeModal: () => void;
  userId?: string;
  modalTitle: string;
};

export const CreateUserForm = ({
  closeModal,
  userId,
  modalTitle,
}: PropsType) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      role: null,
    },
  });
  const [role, setRole] = useState<UserRoleType | null>(null);
  const { mutate: createUser } = useCreateUser();
  const { data: editingUser, isLoading: isUserLoading } = useUserById(userId);
  const { mutate: editUser } = useEditUser();

  const setRoleHandler = (value: UserRoleType) => {
    setRole(value);
    setValue("role", value.value);
    setError("role", {});
  };

  useEffect(() => {
    if (editingUser) {
      setValue("email", editingUser.email);
      setValue("role", editingUser.role);
      const roleObj = usersRoleData.find((r) => r.value === editingUser.role);
      setRole(roleObj || null);
    }
  }, [editingUser, setValue]);

  useEffect(() => {
    console.log("editingUser.role:", editingUser?.role);
    console.log("usersRoleData:", usersRoleData);
  }, []);

  const onSubmit = (data: any) => {
    const submitData = { ...data, role: role?.value ?? data.role };

    if (userId) {
      const { password, ...editdata } = submitData;

      editUser(
        { id: userId, data: editdata },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        },
      );
    } else {
      createUser(submitData, {
        onSuccess: () => {
          reset();
          closeModal();
        },
      });
    }
  };

  if (isUserLoading) {
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
            name="email"
            placeholder={"Введите email"}
            type="email"
            fullWidth
          />
          {!userId && (
            <ControlledAppInput
              control={control}
              name="password"
              placeholder={"Введите пароль"}
              type="password"
              fullWidth
            />
          )}

          <AppDropdown
            placeholder={"выберите роль"}
            propsName={"label"}
            propsValue={"value"}
            value={role}
            options={usersRoleData}
            onSelect={setRoleHandler}
            fullWidth
            error={errors.role?.message}
          />
        </AppFlex>
        <AppButton type={"submit"} text={!userId ? "создать" : "изменить"} />
      </form>
    </AppModal>
  );
};
