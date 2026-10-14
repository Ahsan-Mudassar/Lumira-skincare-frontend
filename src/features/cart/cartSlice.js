import { createSlice } from "@reduxjs/toolkit";

export const MAX_ITEM_QUANTITY = 10;
export const MAX_CART_LINES = 20;
export const CART_STORAGE_KEY = "lumira_cart_v1";

const clampQuantity = (value) => Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.floor(Number(value) || 1)));

export function sanitizeCartItems(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const items = [];

  for (const item of raw) {
    const valid =
      item &&
      typeof item.productId === "string" &&
      typeof item.name === "string" &&
      typeof item.slug === "string" &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      !seen.has(item.productId);
    if (!valid) continue;

    seen.add(item.productId);
    items.push({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      image: typeof item.image === "string" ? item.image : null,
      price: item.price,
      quantity: clampQuantity(item.quantity),
    });
    if (items.length === MAX_CART_LINES) break;
  }
  return items;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find((line) => line.productId === item.productId);

      if (existing) {
        existing.quantity = clampQuantity(existing.quantity + quantity);
        existing.price = item.price; 
        return;
      }
      if (state.items.length >= MAX_CART_LINES) return;
      state.items.push({ ...item, quantity: clampQuantity(quantity) });
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const line = state.items.find((item) => item.productId === productId);
      if (line) line.quantity = clampQuantity(quantity);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
