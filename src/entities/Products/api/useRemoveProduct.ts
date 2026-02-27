import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProduct } from "@/entities/Products/api/removeProduct.ts";
import { toast } from "react-hot-toast";

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeProduct(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["productsList"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success(data?.message || "Товар удален");
    },
  });
};
