import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY, sanitizeCartItems } from "../features/cart/cartSlice";
import { storage } from "../lib/storage";

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: {
    cart: { items: sanitizeCartItems(storage.get(CART_STORAGE_KEY, [])) },
  },
});

let previousItems = store.getState().cart.items;
store.subscribe(() => {
  const items = store.getState().cart.items;
  if (items === previousItems) return;
  previousItems = items;
  storage.set(CART_STORAGE_KEY, items);
});
