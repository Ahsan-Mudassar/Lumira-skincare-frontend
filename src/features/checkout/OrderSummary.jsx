import { useSelector } from "react-redux";
import { formatPrice } from "../../lib/formatPrice";
import Card from "../../components/ui/Card";
import {
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
  selectEstimatedShipping,
  selectEstimatedTotal,
} from "../cart/cartSelectors";

export default function OrderSummary() {
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectEstimatedShipping);
  const total = useSelector(selectEstimatedTotal);

  return (
    <Card tone="surface" className="flex flex-col gap-5 lg:sticky lg:top-24">
      <h2 className="text-xl">
        Order Summary <span className="text-base text-muted">({count} {count === 1 ? "item" : "items"})</span>
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3">
            {item.image ? (
              <img src={item.image} alt="" className="size-14 rounded-lg object-cover" />
            ) : (
              <div aria-hidden="true" className="size-14 rounded-lg bg-surface-alt" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{item.name}</p>
              <p className="text-sm text-muted">Qty {item.quantity}</p>
            </div>
            <p className="text-sm text-ink">{formatPrice(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <dl className="flex flex-col gap-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-body">Subtotal</dt>
          <dd className="text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-body">Shipping (estimated)</dt>
          <dd className="text-ink">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <dt className="text-ink">Estimated total</dt>
          <dd className="text-ink">{formatPrice(total)}</dd>
        </div>
      </dl>
    </Card>
  );
}
