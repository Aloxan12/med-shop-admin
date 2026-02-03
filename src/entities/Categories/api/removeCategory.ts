import type { DeleteCategoryResponse } from "@/entities/Categories/model/types.ts";
import { api } from "@/shared/api";

export const removeCategory = async (
  id: string,
): Promise<DeleteCategoryResponse> => {
  const response = await api.delete<DeleteCategoryResponse>(
    `/categories/${id}`,
  );
  return response.data;
};
