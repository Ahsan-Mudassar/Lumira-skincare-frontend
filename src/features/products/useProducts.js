import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { getFeaturedProducts, getProductBySlug, getProducts } from "./productsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export function useProducts(filters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => getProducts(filters),
    select: (res) => ({ products: res.data, pagination: res.pagination, count: res.count }),
    placeholderData: keepPreviousData,
  });
}

export function useFeaturedProducts(limit = 4) {
  return useQuery({
    queryKey: queryKeys.products.featured(limit),
    queryFn: () => getFeaturedProducts(limit),
    select: (res) => res.data.data,
    staleTime: FIVE_MINUTES,
  });
}

export function useProduct(slug) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => getProductBySlug(slug),
    select: (res) => res.data,
    enabled: Boolean(slug),
  });
}
