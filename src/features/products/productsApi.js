import apiClient from "../../services/apiClient";

function cleanParams(params = {}) {
  const cleaned = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    cleaned[key] = Array.isArray(value) ? value.join(",") : value;
  }
  return cleaned;
}

export const getProducts = (filters) => apiClient.get("/products", { params: cleanParams(filters) });

export const getFeaturedProducts = (limit = 8) => apiClient.get("/products/featured", { params: { limit } });

export const getProductBySlug = (slug) => apiClient.get(`/products/${slug}`);
