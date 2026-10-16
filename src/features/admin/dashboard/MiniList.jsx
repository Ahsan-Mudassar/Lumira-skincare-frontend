import EmptyState from "../../../components/ui/EmptyState";
import ErrorState from "../../../components/ui/ErrorState";
import Skeleton from "../../../components/ui/Skeleton";

// UNVERIFIED: stats lists ke field naam README mein nahi: kai mumkin naam try hote hain.
export function toRows(data) {
  return Array.isArray(data) ? data : (data?.items ?? data?.products ?? data?.data ?? []);
}
export const rowName = (row) => row.name ?? row.product?.name ?? row.productName ?? "Product";
export const rowImage = (row) => {
  const image = row.image ?? row.images?.[0] ?? row.product?.images?.[0];
  return typeof image === "string" ? image : (image?.url ?? null);
};

export default function MiniList({ query, getMeta, emptyText }) {
  if (query.isPending) return <Skeleton className="h-40 w-full" />;
  if (query.isError) return <ErrorState message={query.error.message} onRetry={query.refetch} className="py-6" />;
  const rows = toRows(query.data);
  if (rows.length === 0) return <EmptyState title={emptyText} className="py-6" />;

  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row, index) => {
        const image = rowImage(row);
        return (
          <li key={row._id ?? row.productId ?? index} className="flex items-center gap-3 rounded-lg bg-white p-2">
            {image ? <img src={image} alt="" className="size-10 rounded-md object-cover" /> : <div aria-hidden="true" className="size-10 rounded-md bg-surface" />}
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{rowName(row)}</p>
            <p className="text-sm text-muted">{getMeta(row)}</p>
          </li>
        );
      })}
    </ul>
  );
}
