import type {
  ProductListDto,
  UpdateProductRequest,
} from "@/entities/Products/model/types.ts";
import { api } from "@/shared/api";

export const editProduct = async (
  id: string,
  data: UpdateProductRequest,
): Promise<ProductListDto> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response = await api.patch<ProductListDto>(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
