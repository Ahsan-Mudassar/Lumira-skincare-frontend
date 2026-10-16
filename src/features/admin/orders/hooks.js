import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/queryKeys";
import { getAdminOrder, getAdminOrders, resendOrderEmail, updateOrderStatus } from "./api";

export const useAdminOrders = (filters) =>
  useQuery({
    queryKey: queryKeys.admin.ordersList(filters),
    queryFn: () => getAdminOrders(filters),
    select: (res) => ({ orders: res.data, pagination: res.pagination, count: res.count }),
    placeholderData: keepPreviousData,
  });

export const useAdminOrder = (id) =>
  useQuery({ queryKey: queryKeys.admin.orderDetail(id), queryFn: () => getAdminOrder(id), select: (res) => res.data });

function useOrderMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.orders });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export const useUpdateOrderStatus = () => useOrderMutation(({ id, ...body }) => updateOrderStatus(id, body));
export const useResendOrderEmail = () => useOrderMutation(({ id, force }) => resendOrderEmail(id, force));