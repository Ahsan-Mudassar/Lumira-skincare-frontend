import { Search } from "lucide-react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { cn } from "../../lib/cn";

export default function SearchForm({ onSearched, className }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q").toString().trim();
    navigate({ pathname: ROUTES.shop, search: query ? `?${createSearchParams({ search: query })}` : "" });
    onSearched?.();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        name="q"
        maxLength={50}
        aria-label="Search products"
        placeholder="Search products"
        className="w-full rounded-full bg-surface py-2.5 pr-4 pl-10 text-base text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary md:text-sm"
      />
    </form>
  );
}
