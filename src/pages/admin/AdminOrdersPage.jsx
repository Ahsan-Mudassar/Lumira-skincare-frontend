import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ORDER_STATUS } from "../../constants/orderStatus";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import Pagination from "../../components/ui/Pagination";
import SectionHeading from "../../components/ui/SectionHeading";
import Select from "../../components/ui/Select";
import Skeleton from "../../components/ui/Skeleton";
import AdminOrdersTable from "../../features/admin/orders/AdminOrdersTable";
import { useAdminOrders } from "../../features/admin/orders/hooks";

const dateInput =
  "rounded-full bg-surface px-4 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary";

export default function AdminOrdersPage() {
  const [params, setParams] = useSearchParams();
  const filters = {
    status: params.get("status") ?? "",
    search: params.get("search") ?? "",
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
    page: Number(params.get("page")) || 1,
    limit: 20,
  };
  const hasFilters = Boolean(filters.status || filters.search || filters.from || filters.to);
  const { data, isPending, isError, error, refetch } = useAdminOrders(filters);

  function update(patch) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (!("page" in patch)) next.delete("page"); // filter badla to page 1 se
    setParams(next);
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading as="h1" title="Orders" description="Review, confirm and ship customer orders." />

      <Card tone="muted" padding="sm" className="flex flex-wrap items-center gap-3">
        <form
          role="search"
          key={`s-${filters.search}`}
          onSubmit={(event) => {
            event.preventDefault();
            update({ search: new FormData(event.currentTarget).get("q").toString().trim() });
          }}
          className="relative w-full sm:w-64"
        >
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input name="q" defaultValue={filters.search} maxLength={50} aria-label="Search by order number or phone" placeholder="Order no. or phone" className="w-full rounded-full bg-surface py-2 pr-4 pl-10 text-base text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-primary md:text-sm" />
        </form>
        <Select variant="pill" aria-label="Filter by status" value={filters.status} onChange={(e) => update({ status: e.target.value })}>
          <option value="">Status: All</option>
          {Object.entries(ORDER_STATUS).map(([value, { label }]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
        <label className="flex items-center gap-2 text-sm text-body">
          From
          <input type="date" value={filters.from} max={filters.to || undefined} onChange={(e) => update({ from: e.target.value })} className={dateInput} />
        </label>
        <label className="flex items-center gap-2 text-sm text-body">
          To
          <input type="date" value={filters.to} min={filters.from || undefined} onChange={(e) => update({ to: e.target.value })} className={dateInput} />
        </label>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => setParams({})}>
            <X aria-hidden="true" className="size-4" />
            Clear
          </Button>
        )}
      </Card>

      <Card tone="muted" padding="sm">
        {isPending ? (
          <Skeleton className="h-64 w-full" />
        ) : isError ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : data.orders.length === 0 ? (
          <EmptyState title="No orders found" description={hasFilters ? "Try changing or clearing the filters." : "Orders will appear here once customers check out."} />
        ) : (
          <>
            <AdminOrdersTable orders={data.orders} />
            <Pagination className="mt-4" page={data.pagination?.page ?? 1} totalPages={data.pagination?.totalPages} onPageChange={(page) => update({ page: String(page) })} />
          </>
        )}
      </Card>
    </div>
  );
}
