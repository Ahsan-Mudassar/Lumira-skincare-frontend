import { Search, X } from "lucide-react";
import { useState } from "react";
import { SKIN_TYPES, SORT_OPTIONS } from "../../constants/product";
import Button from "../../components/ui/Button";
import Chip, { ChipGroup } from "../../components/ui/Chip";
import Select from "../../components/ui/Select";

export default function ProductFilters({ filters, categories = [], onChange, onClear, hasActive }) {
  const [priceError, setPriceError] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    onChange({ search: new FormData(event.currentTarget).get("q").toString().trim() });
  }

  function handlePrice(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const minPrice = data.get("minPrice").toString().trim();
    const maxPrice = data.get("maxPrice").toString().trim();

    const minValue = minPrice === "" ? null : Number(minPrice);
    const maxValue = maxPrice === "" ? null : Number(maxPrice);
    if (
      (minValue !== null && (!Number.isFinite(minValue) || minValue < 0)) ||
      (maxValue !== null && (!Number.isFinite(maxValue) || maxValue < 0))
    ) {
      setPriceError("Prices must be zero or greater.");
      return;
    }
    if (minValue !== null && maxValue !== null && minValue > maxValue) {
      setPriceError("Minimum price cannot be higher than the maximum.");
      return;
    }
    setPriceError("");
    onChange({ minPrice, maxPrice });
  }

  const priceInput =
    "w-24 rounded-full bg-surface px-4 py-2 text-sm text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary";

  return (
    <div className="flex flex-col gap-5">
      <form role="search" onSubmit={handleSearch} key={`s-${filters.search}`} className="relative max-w-md">
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          name="q"
          maxLength={50}
          defaultValue={filters.search}
          aria-label="Search products"
          placeholder="Search products"
          className="w-full rounded-full bg-surface py-2.5 pr-4 pl-10 text-base text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary md:text-sm"
        />
      </form>

      <ChipGroup label="Categories">
        <Chip active={!filters.category} onClick={() => onChange({ category: "" })}>
          All
        </Chip>
        {categories.map((category) => (
          <Chip
            key={category._id ?? category.slug}
            active={filters.category === category.slug}
            onClick={() => onChange({ category: category.slug })}
          >
            {category.name}
          </Chip>
        ))}
      </ChipGroup>

      <div className="flex flex-wrap items-start gap-3">
        <Select
          variant="pill"
          aria-label="Skin type"
          value={filters.skinType}
          onChange={(event) => onChange({ skinType: event.target.value })}
        >
          <option value="">Skin Type: All</option>
          {SKIN_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </Select>
        <Select
          variant="pill"
          aria-label="Sort products"
          value={filters.sort}
          onChange={(event) => onChange({ sort: event.target.value })}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </Select>

        <form onSubmit={handlePrice} key={`p-${filters.minPrice}-${filters.maxPrice}`} className="flex flex-wrap items-center gap-2">
          <input name="minPrice" type="number" inputMode="numeric" min="0" step="any" defaultValue={filters.minPrice} placeholder="Min Rs" aria-label="Minimum price" className={priceInput} onChange={() => setPriceError("")} />
          <span aria-hidden="true" className="text-muted">
            -
          </span>
          <input name="maxPrice" type="number" inputMode="numeric" min="0" step="any" defaultValue={filters.maxPrice} placeholder="Max Rs" aria-label="Maximum price" className={priceInput} onChange={() => setPriceError("")} />
          <Button type="submit" variant="secondary" size="sm" pill>
            Apply
          </Button>
        </form>

        {hasActive && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X aria-hidden="true" className="size-4" />
            Clear filters
          </Button>
        )}
      </div>
      {priceError && (
        <p role="alert" className="text-sm text-danger">
          {priceError}
        </p>
      )}
    </div>
  );
}
