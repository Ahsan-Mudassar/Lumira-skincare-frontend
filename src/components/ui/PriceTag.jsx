import { cn } from "../../lib/cn";
import { formatPrice } from "../../lib/formatPrice";

const sizes = { sm: "text-base", md: "text-lg", lg: "text-2xl" };

export default function PriceTag({ price, discountPrice, size = "md", className }) {
  const hasDiscount = discountPrice != null && discountPrice < price;

  return (
    <span className={cn("inline-flex flex-col items-end md:items-start", className)}>
      <span className={cn("font-semibold text-ink", sizes[size])}>
        {formatPrice(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount && <span className="text-sm text-muted-foreground line-through mt-0.5">{formatPrice(price)}</span>}
    </span>
  );
}
