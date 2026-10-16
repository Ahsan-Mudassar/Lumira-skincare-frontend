import { useMutation } from "@tanstack/react-query";
import { trackOrder } from "./ordersApi";

export function useTrackOrder() {
  return useMutation({ mutationFn: trackOrder });
}
