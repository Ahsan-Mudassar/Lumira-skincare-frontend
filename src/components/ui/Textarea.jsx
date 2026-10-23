import { useId } from "react";
import { cn } from "../../lib/cn";
import FormField from "./FormField";
import { fieldBase, fieldTone, fieldInvalid, describedBy } from "./fieldStyles";

export default function Textarea({
  label,
  error,
  hint,
  tone = "white",
  id,
  rows = 4,
  required,
  className,
  placeholder="",
  ...props
}) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <FormField id={textareaId} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(textareaId, error, hint)}
        className={cn(fieldBase, fieldTone[tone], error && fieldInvalid, "resize-y")}
        {...props}
      />
    </FormField>
  );
}
