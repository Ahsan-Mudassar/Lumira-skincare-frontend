import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import SectionHeading from "../../components/ui/SectionHeading";
import ProductCard, { ProductCardSkeleton } from "../products/ProductCard";
import { useFeaturedProducts } from "../products/useProducts";

const FEATURED_COUNT = 4;

export default function FeaturedSection() {
  const { data: products, isPending, isError, error, refetch } = useFeaturedProducts(FEATURED_COUNT);

  return (
    <section aria-labelledby="featured-title" className="bg-cream-alt py-16">
      <div className="container-page">
        <SectionHeading
        id="featured-title"
          eyebrow="Our picks"
          title="Featured Store Items"
          action={
            <Link to={ROUTES.shop} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Shop all
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <div className="mt-8">
          {isError ? (
            <ErrorState message={error.message} onRetry={refetch} />
          ) : !isPending && products.length === 0 ? (
            <EmptyState title="No featured products yet" description="Check back soon, or browse the full collection." />
          ) : (
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {isPending
                ? Array.from({ length: FEATURED_COUNT }, (_, i) => (
                    <li key={i}>
                      <ProductCardSkeleton />
                    </li>
                  ))
                : products?.map((product) => (
                    <li key={product._id ?? product.slug}>
                      <ProductCard product={product} />
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
