import type { GetUserListRequest } from "@/entities/Users/model/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/entities/Categories/api/createCategory.ts";

export const useCreateCategory = (listParams?: GetUserListRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Перезагружаем конкретный список пользователей
      queryClient.invalidateQueries({
        queryKey: ["categoriesList", listParams],
      });

      // Или инвалидируем ВСЕ списки пользователей
      queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
    },
  });
};
