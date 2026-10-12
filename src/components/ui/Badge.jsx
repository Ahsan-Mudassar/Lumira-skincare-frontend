import { cn } from "../../lib/cn";

const variants = {
  primary: "bg-primary text-white", 
  accent: "bg-accent text-white", 
  neutral: "bg-surface-alt text-muted", 
  success: "bg-primary-light text-primary-dark",
  warning: "bg-peach text-accent",
  danger: "bg-rose text-danger", 
  info: "bg-sage/25 text-primary-dark",
  outline: "border border-line text-body",
};

const sizes = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({ variant = "neutral", size = "md", uppercase = false, className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
        variants[variant],
        sizes[size],
        uppercase && "uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}