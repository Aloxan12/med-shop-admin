import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCategoryRequest } from "@/entities/Categories/model/types.ts";
import { editCategory } from "@/entities/Categories/api/editCategory.ts";

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryRequest }) =>
      editCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categoriesList"] });

      // Опционально: обновить/инвалидировать конкретную категорию
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
    },
  });
};
