import * as z from "zod";

const numberFieldMessage = "Введите корректное число";
const integerFieldMessage = "Введите целое число";

export const editProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Название обязательно" }),
  description: z.string().trim().optional(),
  price: z
    .string()
    .trim()
    .min(1, { message: "Цена обязательна" })
    .refine((value) => !Number.isNaN(Number(value)), numberFieldMessage),
  stock: z
    .string()
    .trim()
    .min(1, { message: "Остаток обязателен" })
    .refine((value) => !Number.isNaN(Number(value)), integerFieldMessage)
    .refine((value) => Number.isInteger(Number(value)), integerFieldMessage),
  popularity: z
    .string()
    .trim()
    .min(1, { message: "Популярность обязательна" })
    .refine((value) => !Number.isNaN(Number(value)), integerFieldMessage)
    .refine((value) => Number.isInteger(Number(value)), integerFieldMessage),
  isActive: z
    .enum(["true", "false"], { message: "Выберите статус" })
    .nullable()
    .refine((value) => value !== null, "Выберите статус"),
});

export type EditProductFormValues = z.infer<typeof editProductSchema>;
