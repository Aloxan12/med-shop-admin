import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/entities/Users/ui/CreateUserForm/shema.ts";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppDropdown } from "@/shared/ui/AppDropDown/AppDropDown.tsx";
import { AppButton } from "@/shared/ui/AppButton";
import { usersRoleData } from "@/entities/Users/model/data.ts";
import { useState } from "react";
import type { UserRoleType } from "@/entities/Users/model/types.ts";
import { useCreateUser } from "@/entities/Users/api/useCreateUser.ts";
import { AppFlex } from "@/shared/ui/AppFlex";
import styles from "./style.module.css";

type PropsType = {
  closeModal: () => void;
};

export const CreateUserForm = ({ closeModal }: PropsType) => {
  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
    // setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      role: usersRoleData[3].value,
    },
  });
  const [role, setRole] = useState<UserRoleType>(usersRoleData[3]);
  const { mutate: createUser } = useCreateUser();
  const onSubmit = (data: any) => {
    const newData = { ...data, role: role?.value };
    createUser(newData, {
      onSuccess: () => {
        reset();
        setRole(usersRoleData[3]);
        closeModal();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppFlex gap={"8"} className={styles.appFlex}>
        <ControlledAppInput
          control={control}
          name="email"
          placeholder={"Введите email"}
          type="email"
        />
        <ControlledAppInput
          control={control}
          name="password"
          placeholder={"Введите пароль"}
          type="password"
        />
        <AppDropdown
          placeholder={"выберите роль"}
          propsName={"label"}
          propsValue={"value"}
          value={role}
          options={usersRoleData}
          onSelect={setRole}
        />
      </AppFlex>
      <AppButton type={"submit"} text={"создать"} />
    </form>
  );
};
