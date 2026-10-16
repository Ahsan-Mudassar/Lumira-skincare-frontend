import apiClient from "../../services/apiClient";

export const createReview = (payload) => apiClient.post("/reviews", payload);
