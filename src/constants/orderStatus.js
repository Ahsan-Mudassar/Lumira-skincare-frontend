export const ORDER_STATUS = {
  pending: { label: "Pending", variant: "danger" },
  confirmed: { label: "Confirmed", variant: "warning" },
  shipped: { label: "Shipped", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "neutral" },
};

export const ORDER_STATUS_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};
