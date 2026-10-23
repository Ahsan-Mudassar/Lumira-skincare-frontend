import { useId } from "react";
import { cn } from "../../lib/cn";
import FormField from "./FormField";
import { fieldBase, fieldTone, fieldInvalid, describedBy } from "./fieldStyles";

export default function Input({
  label,
  error,
  hint,
  tone = "white",
  startIcon: StartIcon,
  id,
  type = "text",
  required,
  placeholder = "",
  className,
  ...props
}) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <FormField id={inputId} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        {StartIcon && (
          <StartIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted"
          />
        )}
        <input
          id={inputId}
          type={type}
          required={required}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(inputId, error, hint)}
          className={cn(fieldBase, fieldTone[tone], error && fieldInvalid, StartIcon && "pl-12")}
          {...props}
        />
      </div>
    </FormField>
  );
}
