import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/queryKeys";
import { createCategory, deleteCategory, updateCategory } from "./api";

function useCategoryMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories.all }),
  });
}

export const useCreateCategory = () => useCategoryMutation(createCategory);
export const useUpdateCategory = () => useCategoryMutation(({ id, body }) => updateCategory(id, body));
export const useDeleteCategory = () => useCategoryMutation(deleteCategory);
