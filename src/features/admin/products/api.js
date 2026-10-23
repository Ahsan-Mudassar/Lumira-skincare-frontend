import { ADMIN_PRODUCTS_ENDPOINT, PRODUCT_IMAGE_FIELD } from "../../../constants/product";
import { cleanParams } from "../../../lib/cleanParams";
import apiClient from "../../../services/apiClient";

export const getAdminProducts = (filters) => apiClient.get(ADMIN_PRODUCTS_ENDPOINT, { params: cleanParams(filters) });

export function buildProductFormData(values, files) {
  const form = new FormData();
  form.append("name", values.name);
  form.append("description", values.description);
  form.append("price", values.price);
  form.append("costPrice", values.costPrice);
  if (values.discountPrice) form.append("discountPrice", values.discountPrice);
  form.append("sku", values.sku);
  form.append("size", values.size);
  form.append("category", values.category);
  if (values.stock) form.append("stock", values.stock);
  form.append("isFeatured", String(values.isFeatured));
  values.skinType.forEach((type) => form.append("skinType", type));
  splitList(values.ingredients).forEach((item) => form.append("ingredients", item));
  files.forEach((file) => form.append(PRODUCT_IMAGE_FIELD, file));
  return form;
}

export const splitList = (text) =>
  text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export function buildProductUpdate(values) {
  return {
    name: values.name,
    description: values.description,
    price: Number(values.price),
    costPrice: Number(values.price),
    discountPrice: values.discountPrice === "" ? null : Number(values.discountPrice),
    sku: values.sku,
    size: values.sku,
    category: values.category,
    skinType: values.skinType,
    ingredients: splitList(values.ingredients),
    isFeatured: values.isFeatured,
    isActive: values.isActive,
  };
}

export const createProduct = (form) => apiClient.post("/products", form);
export const updateProduct = (id, body) => apiClient.patch(`/products/${id}`, body);
export const updateStock = (id, body) => apiClient.patch(`/products/${id}/stock`, body);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
