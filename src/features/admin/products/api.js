import { ADMIN_PRODUCTS_ENDPOINT, PRODUCT_IMAGE_FIELD } from "../../../constants/product";
import { cleanParams } from "../../../lib/cleanParams";
import apiClient from "../../../services/apiClient";

// UNVERIFIED: README mein admin product LIST endpoint nahi hai (constants/product.js dekho).
export const getAdminProducts = (filters) => apiClient.get(ADMIN_PRODUCTS_ENDPOINT, { params: cleanParams(filters) });

// Create = multipart/form-data (README). Array fields repeated keys se jate hain.
// UNVERIFIED: image field ka naam, aur booleans/arrays ka multipart format backend ke validation se match karna hai.
export function buildProductFormData(values, files) {
  const form = new FormData();
  form.append("name", values.name);
  form.append("description", values.description);
  form.append("price", values.price);
  if (values.discountPrice) form.append("discountPrice", values.discountPrice);
  form.append("sku", values.sku);
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

// Update = JSON. stock aur slug NAHI bhejte (backend reject karta hai). discountPrice: null = discount hata do.
export function buildProductUpdate(values) {
  return {
    name: values.name,
    description: values.description,
    price: Number(values.price),
    discountPrice: values.discountPrice === "" ? null : Number(values.discountPrice),
    sku: values.sku,
    category: values.category,
    skinType: values.skinType,
    ingredients: splitList(values.ingredients),
    isFeatured: values.isFeatured,
    isActive: values.isActive,
  };
}

export const createProduct = (form) => apiClient.post("/products", form);
export const updateProduct = (id, body) => apiClient.patch(`/products/${id}`, body);
// body: { stock } YA { adjustBy } (dono nahi). Zero se neeche jaane par 409.
export const updateStock = (id, body) => apiClient.patch(`/products/${id}/stock`, body);
// Soft delete (isActive: false). Wapas laane ke liye updateProduct(id, { isActive: true }).
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
