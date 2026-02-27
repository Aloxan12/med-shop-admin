import type {
  GetProductsListRequest,
  GetProductsListResponse,
} from "@/entities/Products/model/types.ts";
import { api } from "@/shared/api";

export const getProductsList = async (
  params?: GetProductsListRequest,
): Promise<GetProductsListResponse> => {
  const response = await api.get<GetProductsListResponse>("/products", {
    params,
  });
  return response.data;
};
