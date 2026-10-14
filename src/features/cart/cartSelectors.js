import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../../constants/shipping";

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectEstimatedShipping = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
};

export const selectEstimatedTotal = (state) => selectCartSubtotal(state) + selectEstimatedShipping(state);

export const makeSelectQuantityFor = (productId) => (state) =>
  state.cart.items.find((item) => item.productId === productId)?.quantity ?? 0;
