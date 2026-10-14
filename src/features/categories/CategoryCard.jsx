import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Skeleton from "../../components/ui/Skeleton";

export default function CategoryCard({ category }) {
  const count = category.productCount;
  const href = `${ROUTES.shop}?category=${encodeURIComponent(category.slug)}`;

  return (
    <Link
      to={href}
      className="group relative isolate block aspect-[3/4] overflow-hidden rounded-xl bg-linear-to-br from-sage/40 to-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <img
        src={category.image}
        alt="category images"
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
        <h3 className="text-lg text-white md:text-xl">{category.name}</h3>
        {typeof count === "number" && (
          <p className="text-sm text-white/85">
            {count} {count === 1 ? "product" : "products"}
          </p>
        )}
      </div>
    </Link>
  );
}

export function CategoryCardSkeleton() {
  return <Skeleton aria-hidden="true" className="aspect-[3/4] w-full rounded-xl" />;
}
