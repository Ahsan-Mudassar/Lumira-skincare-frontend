import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FREE_SHIPPING_THRESHOLD } from "../../constants/shipping";
import { ROUTES } from "../../constants/routes";
import { formatPrice } from "../../lib/formatPrice";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { selectCartCount, selectCartSubtotal, selectEstimatedShipping, selectEstimatedTotal } from "./cartSelectors";

export default function CartSummary() {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectEstimatedShipping);
  const total = useSelector(selectEstimatedTotal);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <Card tone="surface" className="flex flex-col gap-5 lg:sticky lg:top-24">
      <h2 className="text-xl">Order Summary</h2>

      {remaining > 0 ? (
        <div>
          <p className="text-sm text-body">
            Add <span className="font-medium text-ink">{formatPrice(remaining)}</span> more for free shipping.
          </p>
          <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-alt">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm font-medium text-primary">You have unlocked free shipping.</p>
      )}

      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-body">
            Subtotal ({count} {count === 1 ? "item" : "items"})
          </dt>
          <dd className="text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-body">Shipping (estimated)</dt>
          <dd className="text-ink">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt className="text-ink">Estimated total</dt>
          <dd className="text-ink">{formatPrice(total)}</dd>
        </div>
      </dl>

      <Button as={Link} to={ROUTES.checkout} size="lg" fullWidth>
        Proceed to Checkout
        <ArrowRight aria-hidden="true" className="size-4" />
      </Button>
      <p className="text-center text-xs text-muted">
        Cash on delivery. Final prices and shipping are confirmed when you place the order.
      </p>
    </Card>
  );
}
