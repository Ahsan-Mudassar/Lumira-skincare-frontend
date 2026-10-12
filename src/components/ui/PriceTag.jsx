import { cn } from "../../lib/cn";
import { formatPrice } from "../../lib/formatPrice";

const sizes = { sm: "text-base", md: "text-lg", lg: "text-2xl" };

export default function PriceTag({ price, discountPrice, size = "md", className }) {
  const hasDiscount = discountPrice != null && discountPrice < price;

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold text-ink", sizes[size])}>
        {formatPrice(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount && <del className="text-sm text-muted">{formatPrice(price)}</del>}
    </span>
  );
}
