import type {
  GetCategoriesListRequest,
  GetCategoriesListResponse,
} from "@/entities/Categories/model/types.ts";
import { api } from "@/shared/api";

export const getCategoriesList = async (
  data?: GetCategoriesListRequest,
): Promise<GetCategoriesListResponse> => {
  const response = await api.get<GetCategoriesListResponse>("/categories", {
    params: data,
  });
  return response.data;
};
