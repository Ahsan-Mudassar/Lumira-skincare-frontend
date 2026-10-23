import { cn } from "../../lib/cn";

export default function SegmentedControl({ options, value, onChange, label, className }) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex rounded-lg bg-surface p-1", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-md px-4 cursor-pointer py-1.5 text-sm font-medium transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary",
              active ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
