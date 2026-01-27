import { useParamsControl } from "@/shared/lib/hooks/useParamsControl.ts";
import type { GetCategoriesListRequest } from "@/entities/Categories/model/types.ts";
import { useCategoriesList } from "@/entities/Categories/api/useCategories.ts";

export const useGetCategoriesList = () => {
  const params = useParamsControl<GetCategoriesListRequest>({
    paramsList: ["search"],
    withPagination: true,
  });
  const { data: categoriesList, isLoading } = useCategoriesList(
    { ...params },
    { skip: !params },
  );

  return { categoriesList, isLoading };
};
