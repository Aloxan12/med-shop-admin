import type { UseQueryResult } from "@tanstack/react-query";

import { useAppQuery } from "@/shared/api";
import type { CategoryListDto } from "@/entities/Categories/model/types.ts";
import { getCategoryById } from "@/entities/Categories/api/getCategoryById.ts";

export const useCategoryById = (
  id?: string,
  extraParams?: { skip?: boolean },
): UseQueryResult<CategoryListDto, unknown> => {
  const enabled = !!id && !extraParams?.skip;

  return useAppQuery<CategoryListDto, unknown>(
    ["category", id] as const,
    () => getCategoryById(id as string),
    { enabled },
  );
};
