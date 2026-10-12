export function formatPrice(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "";
  return `Rs ${value.toLocaleString("en-US")}`;
}
