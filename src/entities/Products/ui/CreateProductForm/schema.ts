import * as z from "zod";

const numberFieldMessage = "Введите корректное число";
const integerFieldMessage = "Введите целое число";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Название обязательно" }),
  description: z.string().trim().optional(),
  price: z
    .string()
    .trim()
    .min(1, { message: "Цена обязательна" })
    .refine((value) => !Number.isNaN(Number(value)), numberFieldMessage),
  photo: z.string().trim().min(1, { message: "Фото обязательно" }),
  stock: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        value === undefined || value === "" || !Number.isNaN(Number(value)),
      integerFieldMessage,
    )
    .refine(
      (value) =>
        value === undefined || value === "" || Number.isInteger(Number(value)),
      integerFieldMessage,
    ),
  popularity: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        value === undefined || value === "" || !Number.isNaN(Number(value)),
      integerFieldMessage,
    )
    .refine(
      (value) =>
        value === undefined || value === "" || Number.isInteger(Number(value)),
      integerFieldMessage,
    ),
  isActive: z.enum(["true", "false"]).optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
