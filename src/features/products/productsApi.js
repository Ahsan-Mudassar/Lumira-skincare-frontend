import { cleanParams } from "../../lib/cleanParams";
import apiClient from "../../services/apiClient";

export const getProducts = (filters) => apiClient.get("/products", { params: cleanParams(filters) });

export const getFeaturedProducts = (limit = 8) => apiClient.get("/products/featured", { params: { limit } });

export const getProductBySlug = (slug) => apiClient.get(`/products/${slug}`);

export const getProductReviews = (slug, params) =>
  apiClient.get(`/products/${slug}/reviews`, { params: cleanParams(params) });