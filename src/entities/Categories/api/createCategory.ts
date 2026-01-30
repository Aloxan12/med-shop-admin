import type {
  CategoryListDto,
  CreateCategoryRequest,
} from "@/entities/Categories/model/types.ts";
import { api } from "@/shared/api";

export const createCategory = async (
  data: CreateCategoryRequest,
): Promise<CategoryListDto> => {
  const response = await api.post<CategoryListDto>("/categories", data);
  return response.data;
};
