import { Star } from "lucide-react";
import { cn } from "../../lib/cn";

export default function RatingInput({ value = 0, onChange, label = "Rating", error, className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-base text-body">{label}</span>
      <div role="radiogroup" aria-label={label} className="inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
            onClick={() => onChange(n)}
            className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          >
            <Star className={cn("size-7 transition-colors", n <= value ? "fill-accent text-accent" : "text-line")} />
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
