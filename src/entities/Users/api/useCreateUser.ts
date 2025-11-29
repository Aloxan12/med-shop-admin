import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/user";
import type { GetUserListRequest } from "../model/types";

export const useCreateUser = (listParams?: GetUserListRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Перезагружаем конкретный список пользователей
      queryClient.invalidateQueries({
        queryKey: ["userList", listParams],
      });

      // Или инвалидируем ВСЕ списки пользователей
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });
};
