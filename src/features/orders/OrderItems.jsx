import { formatPrice } from "../../lib/formatPrice";

export default function OrderItems({ items = [], subtotal, shippingFee, total }) {
  console.log(items)
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={item.slug ?? item.productId ?? index} className="flex items-center gap-3">
            {item.image ? (
              <img src={item.image} alt="" className="size-14 rounded-lg object-cover" />
            ) : (
              <div aria-hidden="true" className="size-14 rounded-lg bg-surface-alt" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{item.name}</p>
              <p className="text-sm text-muted">
                {formatPrice(item.price)} &times; {item.quantity}
              </p>
            </div>
            <p className="text-sm text-ink">{formatPrice(item.lineTotal ?? item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <dl className="flex flex-col gap-2 rounded-xl bg-cream-alt p-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-body">Subtotal</dt>
          <dd className="text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-body">Shipping</dt>
          <dd className="text-ink">{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-line-soft pt-2 text-base font-semibold">
          <dt className="text-ink">Total</dt>
          <dd className="text-ink">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
