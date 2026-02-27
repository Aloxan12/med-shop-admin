import type {
  GetProductsListRequest,
  ProductsTableResponse,
} from "@/entities/Products/model/types.ts";
import { useAppQuery } from "@/shared/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { getProductsList } from "@/entities/Products/api/getProductsList.ts";

export const useProductsList = (
  params: GetProductsListRequest,
  extraParams?: { skip?: boolean },
): UseQueryResult<ProductsTableResponse, unknown> => {
  return useAppQuery<ProductsTableResponse, unknown>(
    ["productsList", params] as const,
    async () => {
      const response = await getProductsList(params);
      const normalizedResults = response.data ?? response.results ?? [];
      const normalizedCount = response.total ?? response.count ?? 0;

      return {
        count: normalizedCount,
        pages: response.pages,
        page: response.page,
        limit: response.limit,
        results: normalizedResults,
      };
    },
    { enabled: !extraParams?.skip },
  );
};
