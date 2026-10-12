import { Inbox } from "lucide-react";
import { cn } from "../../lib/cn";

export default function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-6 py-12 text-center", className)}>
      <span className="flex size-14 items-center justify-center rounded-full bg-surface text-primary">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="text-xl">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
