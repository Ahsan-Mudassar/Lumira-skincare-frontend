import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PRODUCT_PAGE_SIZE } from "../../constants/product";
import { queryKeys } from "../../constants/queryKeys";
import { getFeaturedProducts, getProductBySlug, getProductReviews, getProducts } from "./productsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export function useProducts(filters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => getProducts(filters),
    select: (res) => ({ products: res.data.data, pagination: res.data.pagination, count: res.data.count }),
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteProducts(filters) {
  return useInfiniteQuery({
    queryKey: queryKeys.products.infinite(filters),
    queryFn: ({ pageParam }) => getProducts({ ...filters, page: pageParam, limit: PRODUCT_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.pagination?.hasNext ? lastPage.data.pagination.page + 1 : undefined,
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

export function useProductReviews(slug, sort) {
  return useInfiniteQuery({
    queryKey: queryKeys.products.reviews(slug, sort),
    queryFn: ({ pageParam }) => getProductReviews(slug, { sort, page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pagination?.hasNext ? lastPage.pagination.page + 1 : undefined),
    enabled: Boolean(slug),
  });
}
