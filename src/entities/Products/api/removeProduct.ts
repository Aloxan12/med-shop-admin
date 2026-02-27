import type { DeleteProductResponse } from "@/entities/Products/model/types.ts";
import { api } from "@/shared/api";

export const removeProduct = async (
  id: string,
): Promise<DeleteProductResponse> => {
  const response = await api.delete<DeleteProductResponse>(`/products/${id}`);
  return response.data;
};
