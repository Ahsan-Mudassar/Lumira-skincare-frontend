import { useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import SectionHeading from "../components/ui/SectionHeading";
import { useCategories } from "../features/categories/useCategories";
import ProductCard, { ProductCardSkeleton } from "../features/products/ProductCard";
import ProductFilters from "../features/products/ProductFilters";
import { useInfiniteProducts } from "../features/products/useProducts";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get("category") ?? "",
    skinType: searchParams.get("skinType") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    search: searchParams.get("search") ?? "",
    sort: searchParams.get("sort") ?? "newest",
  };
  const hasActive = Boolean(filters.category || filters.skinType || filters.minPrice || filters.maxPrice || filters.search);

  const { data: categories } = useCategories();
  const { data, isPending, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts(filters);

  function updateFilters(patch) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (value && !(key === "sort" && value === "newest")) next.set(key, value);
      else next.delete(key);
    }
    setSearchParams(next);
  }

  const products = data?.pages.flatMap((page) => page.data.data) ?? [];
  const total = data?.pages[0]?.data.pagination?.total ?? products.length;

  return (
    <div className="container-page py-10 md:py-14">
      <SectionHeading
        as="h1"
        title="All Rituals"
        description="Explore our complete collection of botanical formulations for every skin type."
      />

      <div className="mt-8">
        <ProductFilters
          filters={filters}
          categories={categories}
          onChange={updateFilters}
          onClear={() => setSearchParams({})}
          hasActive={hasActive}
        />
      </div>

      <div className="mt-10">
        {isError ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : isPending ? (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <li key={i}>
                <ProductCardSkeleton />
              </li>
            ))}
          </ul>
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try a different search or remove some filters."
            action={
              hasActive && (
                <Button variant="outline" onClick={() => setSearchParams({})}>
                  Clear filters
                </Button>
              )
            }
          />
        ) : (
          <>
            <p aria-live="polite" className="mb-4 text-sm text-muted">
              {total} {total === 1 ? "item" : "items"}
            </p>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {products.map((product) => (
                <li key={product._id ?? product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            {hasNextPage && (
              <div className="mt-10 flex justify-center">
                <Button variant="secondary" pill size="lg" loading={isFetchingNextPage} onClick={() => fetchNextPage()}>
                  Load More Rituals
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
