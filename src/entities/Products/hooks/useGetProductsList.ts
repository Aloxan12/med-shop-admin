import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import type { GetProductsListRequest } from "@/entities/Products/model/types.ts";
import { useProductsList } from "@/entities/Products/api/useProducts.ts";

const parseNumber = (value?: string | number) => {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

export const useGetProductsList = () => {
  const rawParams = useParamsControl<Record<string, string | undefined>>({
    paramsList: ["search", "sort", "priceFrom", "priceTo"],
    withPagination: true,
  });
  const safeParams = rawParams || {};

  const params: GetProductsListRequest = {
    search: safeParams.search,
    page: parseNumber(safeParams.page),
    limit: parseNumber(safeParams.limit),
    sort: safeParams.sort as GetProductsListRequest["sort"],
    priceFrom: parseNumber(safeParams.priceFrom),
    priceTo: parseNumber(safeParams.priceTo),
  };

  const { data: productsList, isLoading } = useProductsList(params, {
    skip: !rawParams,
  });

  return { productsList, isLoading };
};
