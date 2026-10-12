import { cn } from "../../lib/cn";

export default function SectionLabel({ icon: Icon, className, children }) {
  return (
    <p className={cn("flex items-center gap-2 text-sm font-medium tracking-wider text-ink uppercase", className)}>
      {Icon && <Icon aria-hidden="true" className="size-4 text-primary" />}
      {children}
    </p>
  );
}
