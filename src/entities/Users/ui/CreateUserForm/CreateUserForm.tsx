import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./shema.ts";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppDropdown } from "@/shared/ui/AppDropDown/AppDropDown.tsx";
import { AppButton } from "@/shared/ui/AppButton";
import { usersRoleData } from "@/entities/Users/model/data.ts";
import { useState } from "react";
import type { UserRoleType } from "@/entities/Users/model/types.ts";
import { useCreateUser } from "@/entities/Users/api/useCreateUser.ts";
import { AppFlex } from "@/shared/ui/AppFlex";
import styles from "./style.module.css";
import { AppModal } from "@/shared/ui/AppModal";

type PropsType = {
  closeModal: () => void;
};

export const CreateUserForm = ({ closeModal }: PropsType) => {
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

  const setRoleHandler = (value: UserRoleType) => {
    setRole(value);
    setValue("role", value.value);
    setError("role", {});
  };

  const onSubmit = (data: any) => {
    const newData = { ...data, role: role?.value };
    createUser(newData, {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  return (
    <AppModal>
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
          <ControlledAppInput
            control={control}
            name="password"
            placeholder={"Введите пароль"}
            type="password"
            fullWidth
          />
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
        <AppButton type={"submit"} text={"создать"} />
      </form>
    </AppModal>
  );
};
