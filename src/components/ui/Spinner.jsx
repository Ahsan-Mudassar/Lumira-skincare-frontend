import { cn } from "../../lib/cn";

const sizes = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-[3px]",
};

export default function Spinner({ size = "md", label, className }) {
  return (
    <span role={label ? "status" : undefined} className={cn("inline-flex", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-full border-current border-t-transparent motion-reduce:animate-none",
          sizes[size]
        )}
      />
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}
