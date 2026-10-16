import apiClient from "../../services/apiClient";

export const createOrder = (payload, idempotencyKey) =>
  apiClient.post("/orders", payload, { headers: { "Idempotency-Key": idempotencyKey } });
