import { cn } from "../../lib/cn";

const tones = {
  white: "bg-white shadow-soft",
  muted: "bg-cream-alt",
  surface: "bg-surface",
};

const paddings = {
  none: "",
  sm: "p-2",
  md: "p-6",
  lg: "p-8",
};

export default function Card({ as: Component = "div", tone = "white", padding = "md", className, children, ...props }) {
  return (
    <Component className={cn("rounded-xl", tones[tone], paddings[padding], className)} {...props}>
      {children}
    </Component>
  );
}
