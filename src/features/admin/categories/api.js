import apiClient from "../../../services/apiClient";
import { CATEGORY_IMAGE_FIELD } from "../../../constants/category.js"

export function buildCategoryFormData({ name, file }) {
    const form = new FormData();
    form.append("name", name)
    if (file) form.append(CATEGORY_IMAGE_FIELD, file)
    return form;
}

export const createCategory = (form) => apiClient.post("/categories", form);
export const updateCategory = (id, form) => apiClient.patch(`/categories/${id}`, form);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
