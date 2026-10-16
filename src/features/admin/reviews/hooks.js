import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/queryKeys";
import { deleteReview, getAdminReviews, setReviewApproval } from "./api";

export const useAdminReviews = (filters) =>
  useQuery({
    queryKey: queryKeys.admin.reviewsList(filters),
    queryFn: () => getAdminReviews(filters),
    select: (res) => ({ reviews: res.data, pagination: res.pagination, count: res.count }),
    placeholderData: keepPreviousData,
  });

function useReviewMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.reviews });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all }); // rating average badal sakta hai
    },
  });
}

export const useSetReviewApproval = () => useReviewMutation(({ id, isApproved }) => setReviewApproval(id, isApproved));
export const useDeleteReview = () => useReviewMutation(deleteReview);
