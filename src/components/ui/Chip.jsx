import { cn } from "../../lib/cn";

export default function Chip({ active = false, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        active ? "bg-primary text-white" : "bg-surface text-ink hover:bg-surface-alt",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ChipGroup({ label, className, children }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0", className)}
    >
      {children}
    </div>
  );
}
