import { removeCategory } from "@/entities/Categories/api/removeCategory.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export const useRemoveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeCategory(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      if (data?.message) {
        toast.success(data.message);
      }
    },
  });
};
