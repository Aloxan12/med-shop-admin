import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть минимум 6 символов" }),
  role: z
    .enum(["superadmin", "admin", "manager", "client"], {
      message: "Обязательное поле",
    })
    .nullable()
    .refine((val) => val !== null, "Выберите роль"),
});
