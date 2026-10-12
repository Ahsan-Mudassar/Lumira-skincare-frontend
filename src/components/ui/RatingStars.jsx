import { Star } from "lucide-react";
import { cn } from "../../lib/cn";

export default function RatingStars({ value = 0, count, variant = "compact", className }) {
  const rating = Number(value) || 0;
  const label =
    count > 0 || rating > 0
      ? `Rated ${rating.toFixed(1)} out of 5${count != null ? ` from ${count} reviews` : ""}`
      : "No reviews yet";

  if (variant === "stars") {
    const filled = Math.round(rating);
    return (
      <span role="img" aria-label={label} className={cn("inline-flex items-center gap-0.5", className)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            aria-hidden="true"
            className={cn("size-4", n <= filled ? "fill-accent text-accent" : "text-line")}
          />
        ))}
      </span>
    );
  }

  if (!rating && !count) {
    return <span className={cn("text-xs text-muted", className)}>No reviews yet</span>;
  }

  return (
    <span role="img" aria-label={label} className={cn("inline-flex items-center gap-1 text-xs text-body", className)}>
      <Star aria-hidden="true" className="size-3.5 fill-accent text-accent" />
      <span aria-hidden="true">{rating.toFixed(1)}</span>
      {count != null && (
        <span aria-hidden="true" className="text-muted">
          ({count})
        </span>
      )}
    </span>
  );
}
