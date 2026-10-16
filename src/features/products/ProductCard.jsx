import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import AddToCartButton from "../cart/AddToCartButton";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import PriceTag from "../../components/ui/PriceTag";
import RatingStars from "../../components/ui/RatingStars";
import Skeleton from "../../components/ui/Skeleton";
import { getCategoryName, getProductImage, isOutOfStock } from "./productUtils";

export default function ProductCard({ product }) {
  const images = getProductImage(product);
  const category = getCategoryName(product);
  const soldOut = isOutOfStock(product);
  const onSale = product.discountPrice != null && product.discountPrice < product.price;
  const href = ROUTES.product(product.slug);

  return (
    <Card padding="sm" className="flex h-full flex-col gap-3">
      <Link to={href} className="group flex flex-1 flex-col gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
          {images && (
            <img
              src={images}
              alt={product.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            />
          )}
          {(soldOut || onSale) && (
            <Badge variant={soldOut ? "neutral" : "accent"} size="sm" className="absolute top-2 left-2">
              {soldOut ? "Out of Stock" : "Sale"}
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-1 px-1">
          {category && <p className="text-sm text-primary">{category}</p>}
          <h3 className="line-clamp-2 text-base leading-snug">{product.name}</h3>
          <RatingStars value={product.ratingAverage} count={product.ratingCount} />
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 px-1 pb-1">
        <PriceTag price={product.price} discountPrice={product.discountPrice} size="md" />
        <AddToCartButton product={product} />
      </div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card padding="sm" className="flex flex-col gap-3" aria-hidden="true">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-4/5" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    </Card>
  );
}
