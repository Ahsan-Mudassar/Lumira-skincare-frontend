import apiClient from "../../services/apiClient";

export const trackOrder = (payload) => apiClient.post("/orders/track", payload);