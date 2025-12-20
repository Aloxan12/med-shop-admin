import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/entities/Users/api/user.ts";
import type { UpdateUserRequest } from "@/entities/Users/model/types.ts";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      editUser(id, data),
    onSuccess: (_, variables) => {
      // Обновить список пользователей
      queryClient.invalidateQueries({ queryKey: ["userList"] });

      // Опционально: обновить/инвалидировать конкретного пользователя
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};
