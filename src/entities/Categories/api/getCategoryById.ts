import type { CategoryListDto } from "@/entities/Categories/model/types.ts";
import { api } from "@/shared/api";

export const getCategoryById = async (id: string): Promise<CategoryListDto> => {
  const response = await api.get<CategoryListDto>(`/categories/${id}`);
  return response.data;
};
