import * as z from "zod";

export const createCategoryShema = z.object({
  name: z.string().trim().min(1, { message: "name is required" }),
  description: z.string().trim().min(1, { message: "description is required" }),
});
