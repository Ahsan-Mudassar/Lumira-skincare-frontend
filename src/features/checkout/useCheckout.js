import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { sessionStore } from "../../lib/sessionStore";
import { clearCart } from "../cart/cartSlice";
import { createOrder } from "./checkoutApi";

export const LAST_ORDER_KEY = "lumira_last_order";

function buildPayload(values, items) {
  return {
    customer: { name: values.name, email: values.email, phone: values.phone },
    shippingAddress: {
      address: values.address,
      city: values.city,
      ...(values.notes && { notes: values.notes }),
    },
    items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
  };
}

export function useCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const attempt = useRef({ key: null, fingerprint: null });

  const mutation = useMutation({
    mutationFn: ({ payload, key }) => createOrder(payload, key),
    onSuccess: (res) => {
      const order = res.data;
      attempt.current = { key: null, fingerprint: null };
      sessionStore.set(LAST_ORDER_KEY, order);
      dispatch(clearCart());
      navigate(ROUTES.orderSuccess, { replace: true, state: { order } });
    },
    onError: (error) => {
      if (error.status >= 400 && error.status < 500) attempt.current = { key: null, fingerprint: null };
    },
  });

  function submit(values, items) {
    const payload = buildPayload(values, items);
    const fingerprint = JSON.stringify(payload);
    if (attempt.current.fingerprint !== fingerprint) {
      attempt.current = { key: crypto.randomUUID(), fingerprint };
    }
    mutation.mutate({ payload, key: attempt.current.key });
  }

  return { submit, isPending: mutation.isPending, isSuccess: mutation.isSuccess, error: mutation.error };
}
