import apiClient from "../../services/apiClient";

export const getCategories = () => apiClient.get("/categories");
