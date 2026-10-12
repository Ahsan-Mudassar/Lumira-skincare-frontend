import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import FormField from "./FormField";
import { fieldBase, fieldTone, fieldInvalid, describedBy } from "./fieldStyles";

export default function Select({
  label,
  error,
  hint,
  variant = "field",
  tone = "white",
  id,
  required,
  className,
  children,
  ...props
}) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const isPill = variant === "pill";

  return (
    <FormField id={selectId} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(selectId, error, hint)}
          className={cn(
            "appearance-none",
            isPill
              ? "w-full rounded-full bg-surface py-2 pr-9 pl-4 text-sm text-ink transition-colors hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
              : cn(fieldBase, fieldTone[tone], "pr-11", error && fieldInvalid)
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted",
            isPill ? "right-3 size-4" : "right-4 size-5"
          )}
        />
      </div>
    </FormField>
  );
}
