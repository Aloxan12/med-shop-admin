import type { ProductListDto } from "@/entities/Products/model/types.ts";
import { api } from "@/shared/api";

export const getProductById = async (id: string): Promise<ProductListDto> => {
  const response = await api.get<ProductListDto>(`/products/${id}`);
  return response.data;
};
