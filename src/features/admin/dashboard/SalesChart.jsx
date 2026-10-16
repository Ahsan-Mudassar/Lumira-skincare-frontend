import { formatPrice } from "../../../lib/formatPrice";

// UNVERIFIED: README sirf "daily series, zero-filled days + totals" kehta hai, field naam nahi.
// Neeche ka normalizer kai mumkin naam try karta hai. Real response dekh kar yahan tight karenge.
export function normalizeSales(data) {
  const rows = Array.isArray(data) ? data : (data?.series ?? data?.days ?? data?.daily ?? data?.data ?? []);
  return rows.map((row) => ({
    label: String(row.date ?? row.day ?? row._id ?? ""),
    sales: Number(row.sales ?? row.revenue ?? row.total ?? 0),
    orders: Number(row.orders ?? row.count ?? row.orderCount ?? 0),
  }));
}

const shortDate = (label) => {
  const date = new Date(label);
  return Number.isNaN(date.getTime()) ? label : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(date);
};

// Chart library ke baghair simple bars (Figma jaisa). metric: "sales" | "orders"
export default function SalesChart({ rows, metric }) {
  const max = Math.max(...rows.map((row) => row[metric]), 1);
  const total = rows.reduce((sum, row) => sum + row[metric], 0);
  const format = (value) => (metric === "sales" ? formatPrice(value) : `${value} orders`);

  if (rows.length === 0) return <p className="py-10 text-center text-sm text-muted">No sales data for this period.</p>;

  return (
    <div>
      <div
        role="img"
        aria-label={`Bar chart of ${metric === "sales" ? "revenue" : "orders"} for ${rows.length} days. Total ${format(total)}.`}
        className="flex h-52 items-end gap-1 rounded-lg bg-cream p-3"
      >
        {rows.map((row) => (
          <div
            key={row.label}
            title={`${shortDate(row.label)}: ${format(row[metric])}`}
            className="min-w-[3px] flex-1 rounded-t bg-sage/60 transition-colors hover:bg-primary"
            style={{ height: `${Math.max((row[metric] / max) * 100, row[metric] > 0 ? 3 : 1)}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{shortDate(rows[0].label)}</span>
        <span>Total: {format(total)}</span>
        <span>{shortDate(rows[rows.length - 1].label)}</span>
      </div>
    </div>
  );
}
