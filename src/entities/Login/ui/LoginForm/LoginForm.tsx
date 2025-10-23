import cls from "./LoginForm.module.scss";
import { AppFlex } from "@/shared/ui/AppFlex";
import { AppButton } from "@/shared/ui/AppButton";
import { Chromium } from "lucide-react";
import { useLogin } from "../../api/useLogin.ts";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { useForm } from "react-hook-form";
import { emailRule, passwordRule } from "../../model/validate.ts";
import { defaultLoginData } from "../../model/const.ts";

interface FormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: defaultLoginData,
  });

  const { mutate: login } = useLogin();

  const onLoginHandler = handleSubmit((data) => login(data));

  const handleGoogleLogin = () =>
    (window.location.href = import.meta.env.VITE_API_URL + "/auth/google");
  return (
    <AppFlex
      fullWidth
      fullHeight
      align="center"
      justify="center"
      className="page"
    >
      <AppFlex fullWidth direction="column" gap="20" className={cls.fromWrap}>
        <AppFlex fullWidth direction="column" gap="24">
          <ControlledAppInput
            control={control}
            name="email"
            label="Email"
            placeholder="Введите E-mail"
            rules={emailRule}
            fullWidth
          />
          <ControlledAppInput
            rules={passwordRule}
            control={control}
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            fullWidth
            type={"password"}
          />
        </AppFlex>
        <AppFlex gap="20" fullWidth className={cls.actions}>
          <AppButton text="Зарегистрироваться" variant="secondary" fullWidth />
          <AppButton text="Войти" onClick={onLoginHandler} fullWidth />
        </AppFlex>
        <AppFlex gap="20" fullWidth>
          <AppButton
            icoLeft={Chromium}
            text="Войти через google"
            onClick={handleGoogleLogin}
            variant="ghost"
            fullWidth
          />
        </AppFlex>
      </AppFlex>
    </AppFlex>
  );
};
