import type {
  GetCategoriesListRequest,
  GetCategoriesListResponse,
} from "@/entities/Categories/model/types.ts";
import type { UseQueryResult } from "@tanstack/react-query";
import { useAppQuery } from "@/shared/api";
import { getCategoriesList } from "@/entities/Categories/api/getCategoriesList.ts";

export const useCategoriesList = (
  params: GetCategoriesListRequest,
  extraParams?: { skip?: boolean },
): UseQueryResult<GetCategoriesListResponse, unknown> => {
  return useAppQuery<GetCategoriesListResponse, unknown>(
    ["categoriesList", params] as const,
    () => getCategoriesList(params), // <- queryFn
    { enabled: !extraParams?.skip },
  );
};
