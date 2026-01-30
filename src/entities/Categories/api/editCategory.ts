import type {
  CategoryListDto,
  CreateCategoryRequest,
} from "@/entities/Categories/model/types.ts";
import { api } from "@/shared/api";

export const editCategory = async (
  id: string,
  data: CreateCategoryRequest,
): Promise<CategoryListDto> => {
  console.log("Editing category:", id, data);
  const response = await api.put<CategoryListDto>(`/categories/${id}`, data);
  return response.data;
};
