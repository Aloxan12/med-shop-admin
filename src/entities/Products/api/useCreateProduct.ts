import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/entities/Products/api/createProduct.ts";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsList"] });
    },
  });
};
