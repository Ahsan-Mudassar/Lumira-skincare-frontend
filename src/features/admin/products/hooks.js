import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/queryKeys";
import { createProduct, deleteProduct, getAdminProducts, updateProduct, updateStock } from "./api";

export const useAdminProducts = (filters) =>
  useQuery({
    queryKey: queryKeys.admin.productsList(filters),
    queryFn: () => getAdminProducts(filters),
    select: (res) => ({ products: res.data, pagination: res.pagination, count: res.count }),
    placeholderData: keepPreviousData,
  });

function useProductMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export const useCreateProduct = () => useProductMutation(createProduct);
export const useUpdateProduct = () => useProductMutation(({ id, body }) => updateProduct(id, body));
export const useUpdateStock = () => useProductMutation(({ id, body }) => updateStock(id, body));
export const useDeleteProduct = () => useProductMutation(deleteProduct);
