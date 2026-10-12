import { useId } from "react";
import { cn } from "../../lib/cn";

export default function Checkbox({ label, id, className, ...props }) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <label
      htmlFor={checkboxId}
      className={cn("inline-flex cursor-pointer items-center gap-3 text-sm text-body", className)}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="size-5 cursor-pointer rounded accent-primary"
        {...props}
      />
      {label}
    </label>
  );
}
