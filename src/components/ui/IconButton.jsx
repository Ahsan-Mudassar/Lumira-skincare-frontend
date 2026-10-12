import { cn } from "../../lib/cn";

const variants = {
  sage: "bg-sage text-white hover:bg-primary",
  primary: "bg-primary text-white hover:bg-primary-dark", 
  surface: "bg-white/90 text-ink shadow-soft hover:bg-white", 
  ghost: "text-ink hover:bg-surface", 
};

const sizes = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-5",
  lg: "size-12 [&_svg]:size-6",
};

export default function IconButton({
  as: Component = "button",
  label,
  variant = "ghost",
  size = "md",
  type,
  className,
  children,
  ...props
}) {
  return (
    <Component
      {...(Component === "button" && { type: type ?? "button" })}
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
