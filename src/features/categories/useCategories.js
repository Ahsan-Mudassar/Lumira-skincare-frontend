import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { getCategories } from "./categoriesApi";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
    select: (res) => res.data.data,
    staleTime: 5 * 60 * 1000,
  });
}
