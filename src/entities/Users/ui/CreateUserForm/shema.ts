import * as z from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть минимум 6 символов" }),
  // role: z.enum(["superadmin", "admin", "manager", "client"], {}),
});
