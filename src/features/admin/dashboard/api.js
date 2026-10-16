import apiClient from "../../../services/apiClient";

// Sab read-only stats (backend aggregation se). days: 1-365.
export const getOverview = () => apiClient.get("/admin/stats/overview");
export const getSales = (days) => apiClient.get("/admin/stats/sales", { params: { days } });
export const getTopProducts = (days, limit = 5) => apiClient.get("/admin/stats/top-products", { params: { days, limit } });
export const getLowStock = (limit = 5) => apiClient.get("/admin/stats/low-stock", { params: { limit } });
