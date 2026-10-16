import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import PriceTag from "../components/ui/PriceTag";
import QuantityStepper from "../components/ui/QuantityStepper";
import RatingStars from "../components/ui/RatingStars";
import Skeleton from "../components/ui/Skeleton";
import AddToCartButton from "../features/cart/AddToCartButton";
import { MAX_ITEM_QUANTITY } from "../features/cart/cartSlice";
import ProductGallery from "../features/products/ProductGallery";
import { getCategoryName, getProductImages, isOutOfStock } from "../features/products/productUtils";
import { useProduct } from "../features/products/useProducts";
import ProductReviews from "../features/reviews/ProductReviews";

function ProductDetails({ product }) {
   const [quantity, setQuantity] = useState(1);
  const category = getCategoryName(product);
  const categorySlug = typeof product.category === "object" ? product.category?.slug : null;
  const soldOut = isOutOfStock(product);
  const onSale = product.discountPrice != null && product.discountPrice < product.price;
  const percentOff = onSale ? Math.round((1 - product.discountPrice / product.price) * 100) : 0;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to={ROUTES.shop} className="hover:text-primary">Shop</Link></li>
          {category && categorySlug && (
            <li className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link to={`${ROUTES.shop}?category=${encodeURIComponent(categorySlug)}`} className="hover:text-primary">{category}</Link>
            </li>
          )}
          <li className="flex items-center gap-2" aria-current="page">
            <span aria-hidden="true">/</span>
            <span className="text-ink">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <ProductGallery images={getProductImages(product)} name={product.name} />

        <div className="flex flex-col gap-5">
          {category && <p className="text-sm font-medium text-primary">{category}</p>}
          <h1 className="text-3xl leading-tight md:text-4xl">{product.name}</h1>
          <a href="#reviews" className="w-fit">
            <RatingStars value={product.ratingAverage} count={product.ratingCount} />
          </a>

          <div className="flex items-center gap-3">
            <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />
            {onSale && <Badge variant="accent" size="sm">Save {percentOff}%</Badge>}
            {soldOut && <Badge size="sm">Out of Stock</Badge>}
          </div>

          <p className="whitespace-pre-line text-base leading-relaxed text-body">{product.description}</p>

          {product.skinType?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">Suited for:</span>
              {product.skinType.map((type) => (
                <Badge key={type} variant="success" size="sm">{type}</Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <QuantityStepper value={quantity} onChange={setQuantity} max={MAX_ITEM_QUANTITY} disabled={soldOut} />
            <AddToCartButton product={product} quantity={quantity} variant="button" className="min-w-48 flex-1" />
          </div>
          <p className="flex items-center gap-2 text-sm text-muted">
            <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
            Cash on delivery. We call to confirm every order.
          </p>

          {product.ingredients?.length > 0 && (
            <details className="group rounded-xl bg-surface p-4">
              <summary className="cursor-pointer list-none font-medium text-ink">Ingredients</summary>
              <p className="mt-3 text-sm leading-relaxed text-body">{product.ingredients.join(", ")}</p>
            </details>
          )}
        </div>
      </div>

      <div className="mt-16">
        <ProductReviews product={product} />
      </div>
    </>
  );
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { data: product, isPending, isError, error, refetch } = useProduct(slug);

  return (
    <div className="container-page py-10 md:py-14">
      {isPending ? (
        <div className="grid gap-10 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      ) : isError ? (
        error.status === 404 ? (
          <EmptyState
            title="Product not found"
            description="This product may have been removed or is no longer available."
            action={<Button as={Link} to={ROUTES.shop}>Back to shop</Button>}
          />
        ) : (
          <ErrorState message={error.message} onRetry={refetch} />
        )
      ) : (
        <ProductDetails key={product.slug} product={product.product} />
      )}
    </div>
  );
}
