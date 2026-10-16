import { cleanParams } from "../../../lib/cleanParams";
import apiClient from "../../../services/apiClient";

export const getAdminOrders = (filters) => apiClient.get("/admin/orders", { params: cleanParams(filters) });
export const getAdminOrder = (id) => apiClient.get(`/admin/orders/${id}`);

export const updateOrderStatus = (id, body) => apiClient.patch(`/admin/orders/${id}/status`, body);

export const resendOrderEmail = (id, force = false) =>
  apiClient.post(`/admin/orders/${id}/resend-email`, null, { params: force ? { force: true } : undefined });
