import { Check, Home, Package, Truck, X } from "lucide-react";
import { formatDate } from "../../lib/formatDate";
import { cn } from "../../lib/cn";

const STEPS = [
  { status: "pending", label: "Order placed", icon: Package },
  { status: "confirmed", label: "Confirmed", icon: Check },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: Home },
];

export default function OrderTimeline({ status, history = [] }) {
  const changedAt = (target) => history.find((entry) => entry.status === target)?.changedAt;

  if (status === "cancelled") {
    return (
      <ol className="flex flex-col gap-4">
        {history.map((entry) => (
          <li key={`${entry.status}-${entry.changedAt}`} className="flex items-center gap-4">
            <span className={cn("flex size-9 items-center justify-center rounded-full", entry.status === "cancelled" ? "bg-rose text-danger" : "bg-primary text-white")}>
              {entry.status === "cancelled" ? <X aria-hidden="true" className="size-4" /> : <Check aria-hidden="true" className="size-4" />}
            </span>
            <div>
              <p className="font-medium text-ink capitalize">{entry.status === "pending" ? "Order placed" : entry.status}</p>
              <p className="text-sm text-muted">{formatDate(entry.changedAt, { time: true })}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  const currentIndex = STEPS.findIndex((step) => step.status === status);

  return (
    <ol className="flex flex-col gap-5">
      {STEPS.map((step, index) => {
        const done = index <= currentIndex;
        const current = index === currentIndex;
        const Icon = step.icon;
        const date = changedAt(step.status);
        return (
          <li key={step.status} className="flex items-center gap-4" aria-current={current ? "step" : undefined}>
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", done ? "bg-primary text-white" : "bg-surface text-muted")}>
              <Icon aria-hidden="true" className="size-4" />
            </span>
            <div>
              <p className={cn("font-medium", done ? "text-ink" : "text-muted")}>{step.label}</p>
              <p className="text-sm text-muted">{date ? formatDate(date, { time: true }) : done ? "" : "Pending"}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
