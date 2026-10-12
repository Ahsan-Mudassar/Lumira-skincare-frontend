import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/cn";

export default function QuantityStepper({ value, onChange, min = 1, max = 10, disabled = false, className }) {
  const buttonClass =
    "inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-alt " +
    "focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div role="group" aria-label="Quantity" className={cn("inline-flex items-center rounded-full bg-surface", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        <Minus aria-hidden="true" className="size-4" />
      </button>
      <output aria-live="polite" className="min-w-8 text-center text-sm font-medium text-ink">
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
