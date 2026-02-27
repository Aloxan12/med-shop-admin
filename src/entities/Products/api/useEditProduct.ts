import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProductRequest } from "@/entities/Products/model/types.ts";
import { editProduct } from "@/entities/Products/api/editProduct.ts";

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) =>
      editProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["productsList"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};
