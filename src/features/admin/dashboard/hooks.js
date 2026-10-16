import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/queryKeys";
import { getLowStock, getOverview, getSales, getTopProducts } from "./api";

export const useOverview = () =>
  useQuery({ queryKey: queryKeys.admin.stats("overview"), queryFn: getOverview, select: (res) => res.data });

export const useSales = (days) =>
  useQuery({ queryKey: queryKeys.admin.stats("sales", days), queryFn: () => getSales(days), select: (res) => res.data });

export const useTopProducts = (days) =>
  useQuery({ queryKey: queryKeys.admin.stats("top", days), queryFn: () => getTopProducts(days), select: (res) => res.data });

export const useLowStock = () =>
  useQuery({ queryKey: queryKeys.admin.stats("low-stock"), queryFn: () => getLowStock(), select: (res) => res.data });
