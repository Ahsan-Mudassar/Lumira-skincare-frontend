import { cn } from "../../lib/cn";
import Spinner from "./Spinner";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-primary text-white shadow-soft hover:bg-primary-dark",
  secondary: "bg-surface text-ink hover:bg-surface-alt", 
  outline: "border border-primary text-primary hover:bg-primary-light/40",
  ghost: "text-primary hover:bg-surface",
  danger: "bg-danger text-white hover:bg-danger/90",
  dangerGhost: "text-danger hover:bg-rose",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  pill = false,
  uppercase = false,
  loading = false,
  fullWidth = false,
  disabled,
  type,
  className,
  children,
  ...props
}) {
  const isNativeButton = Component === "button";

  return (
    <Component
      {...(isNativeButton && {
        type: type ?? "button",
        disabled: disabled || loading,
      })}
      aria-busy={loading || undefined}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        pill ? "rounded-full" : "rounded-4xl",
        uppercase && "uppercase tracking-wider", 
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </Component>
  );
}
