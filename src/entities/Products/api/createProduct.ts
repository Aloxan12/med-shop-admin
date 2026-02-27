import type {
  CreateProductRequest,
  ProductListDto,
} from "@/entities/Products/model/types.ts";
import { api } from "@/shared/api";

export const createProduct = async (
  data: CreateProductRequest,
): Promise<ProductListDto> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response = await api.post<ProductListDto>("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
