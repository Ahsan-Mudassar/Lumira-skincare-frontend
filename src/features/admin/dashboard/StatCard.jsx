import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Skeleton from "../../../components/ui/Skeleton";

// Figma admin stat card: chhota label + bara number + hint. `to` ho to card link ban jata hai.
export default function StatCard({ label, value, hint, icon: Icon, to, loading }) {
  const content = (
    <Card tone="muted" className="flex h-full flex-col gap-3 transition-colors hover:bg-surface">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm tracking-wide text-body uppercase">{label}</p>
        {Icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary-dark">
            <Icon aria-hidden="true" className="size-4" />
          </span>
        )}
      </div>
      {loading ? <Skeleton className="h-8 w-28" /> : <p className="font-serif text-2xl text-ink md:text-3xl">{value}</p>}
      {hint && !loading && <p className="text-sm text-muted">{hint}</p>}
    </Card>
  );
  return to ? (
    <Link to={to} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      {content}
    </Link>
  ) : (
    content
  );
}
