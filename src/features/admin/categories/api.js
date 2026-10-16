import apiClient from "../../../services/apiClient";

// UNVERIFIED: image kaise leta hai (URL string ya file upload) README mein clear nahi.
// Abhi sirf { name, image? } JSON bhejte hain. 400 aaye to Category model/validation share karo.
export const createCategory = (body) => apiClient.post("/categories", body);
export const updateCategory = (id, body) => apiClient.patch(`/categories/${id}`, body);
// 409 agar category mein abhi products hain
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
