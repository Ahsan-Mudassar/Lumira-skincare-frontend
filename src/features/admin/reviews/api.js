import { cleanParams } from "../../../lib/cleanParams";
import apiClient from "../../../services/apiClient";

// filters: status (pending | approved | all), rating, page, limit
export const getAdminReviews = (filters) => apiClient.get("/admin/reviews", { params: cleanParams(filters) });
export const setReviewApproval = (id, isApproved) => apiClient.patch(`/admin/reviews/${id}/approval`, { isApproved });
export const deleteReview = (id) => apiClient.delete(`/admin/reviews/${id}`);
