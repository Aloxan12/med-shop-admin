import type { ProductListDto } from "@/entities/Products/model/types.ts";
import { useAppQuery } from "@/shared/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { getProductById } from "@/entities/Products/api/getProductById.ts";

export const useProductById = (
  id?: string,
  extraParams?: { skip?: boolean },
): UseQueryResult<ProductListDto, unknown> => {
  const enabled = !!id && !extraParams?.skip;

  return useAppQuery<ProductListDto, unknown>(
    ["product", id] as const,
    () => getProductById(id as string),
    { enabled },
  );
};
