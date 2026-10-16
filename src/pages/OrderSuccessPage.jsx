import { CircleCheck } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LAST_ORDER_KEY } from "../features/checkout/useCheckout";
import { sessionStore } from "../lib/sessionStore";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import OrderItems from "../features/orders/OrderItems";

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order ?? sessionStore.get(LAST_ORDER_KEY);

  if (!order) return <Navigate to={ROUTES.home} replace />;

  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary-light text-primary-dark">
          <CircleCheck aria-hidden="true" className="size-8" />
        </span>
        <h1 className="text-3xl md:text-4xl">Thank you, {order.customerName}!</h1>
        <p className="text-body">Your order has been placed.</p>
        <p className="rounded-full bg-surface px-5 py-2 text-lg font-semibold text-ink">{order.orderNumber}</p>
      </div>

      <Alert variant="notice" title="Verification call" className="mt-8">
        We will call you shortly to confirm your delivery details. Payment is cash on delivery
        {order.city ? ` to ${order.city}` : ""}.
      </Alert>

      <Card className="mt-6">
        <h2 className="mb-4 text-xl">Order details</h2>
        <OrderItems items={order.items} subtotal={order.subtotal} shippingFee={order.shippingFee} total={order.total} />
      </Card>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button as={Link} to={ROUTES.trackOrder}>
          Track your order
        </Button>
        <Button as={Link} to={ROUTES.shop} variant="outline">
          Continue shopping
        </Button>
      </div>
      <p className="mt-4 text-center text-sm text-muted">Save your order number. You need it with your email to track the order.</p>
    </div>
  );
}
