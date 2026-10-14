import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ErrorState from "../../components/ui/ErrorState";
import SectionHeading from "../../components/ui/SectionHeading";
import CategoryCard, { CategoryCardSkeleton } from "../categories/CategoryCard";
import { useCategories } from "../categories/useCategories";

const VISIBLE_CATEGORIES = 4;

export default function CategorySection() {
  const { data: categories, isPending, isError, error, refetch } = useCategories();
  if (!isPending && !isError && categories?.length === 0) return null;

  return (
    <section aria-labelledby="categories-title" className="container-page py-16">
      <SectionHeading
        id="categories-title"
        eyebrow="Curated rituals"
        title="Shop by Category"
        action={
          <Link to={ROUTES.shop} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        }
      />

      <div className="mt-8">
        {isError ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {isPending
              ? Array.from({ length: VISIBLE_CATEGORIES }, (_, i) => (
                <li key={i}>
                  <CategoryCardSkeleton />
                </li>
              ))
              : categories.slice(0, VISIBLE_CATEGORIES).map((category) => (
                <li key={category._id ?? category.slug}>
                  <CategoryCard category={category} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
