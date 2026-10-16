import { Banknote, MessageSquare, Package, Truck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { ORDER_STATUS } from "../../constants/orderStatus";
import { formatPrice } from "../../lib/formatPrice";
import Alert from "../../components/ui/Alert";
import Card from "../../components/ui/Card";
import ErrorState from "../../components/ui/ErrorState";
import SectionHeading from "../../components/ui/SectionHeading";
import SegmentedControl from "../../components/ui/SegmentedControl";
import Skeleton from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { useLowStock, useOverview, useSales, useTopProducts } from "../../features/admin/dashboard/hooks";
import MiniList from "../../features/admin/dashboard/MiniList";
import SalesChart, { normalizeSales } from "../../features/admin/dashboard/SalesChart";
import StatCard from "../../features/admin/dashboard/StatCard";
import AdminOrdersTable from "../../features/admin/orders/AdminOrdersTable";
import { useAdminOrders } from "../../features/admin/orders/hooks";

const RANGES = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
];

export default function AdminDashboardPage() {
  const [days, setDays] = useState("30");
  const [metric, setMetric] = useState("sales");

  const overview = useOverview();
  const sales = useSales(days);
  const top = useTopProducts(days);
  const lowStock = useLowStock();
  const recent = useAdminOrders({ limit: 5 });
  
  const data = overview.data ?? {};
  const revenue = data.revenue ?? {};
  const products = data.products ?? {};
  const byStatus = data.orders?.byStatus ?? data.orders ?? {};
  const loading = overview.isPending;

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        as="h1"
        title="Store Overview"
        description="Your daily wellness-store metrics."
        action={<SegmentedControl label="Date range" options={RANGES} value={days} onChange={setDays} />}
      />

      {overview.isError ? (
        <ErrorState message={overview.error.message} onRetry={overview.refetch} />
      ) : (
        <>
          {data.alerts?.ordersWithoutEmail > 0 && (
            <Alert variant="error" title="Owner emails missing">
              {data.alerts.ordersWithoutEmail} order(s) have no notification email sent.{" "}
              <Link to={ROUTES.admin.orders} className="font-medium underline">
                Review orders
              </Link>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard loading={loading} icon={Banknote} label="Revenue collected" value={formatPrice(revenue.collected ?? 0)} hint="Delivered orders" />
            <StatCard loading={loading} icon={Truck} label="Awaiting delivery" value={formatPrice(revenue.awaitingDelivery ?? 0)} hint="Pending, confirmed, shipped" />
            <StatCard loading={loading} icon={Package} label="Active products" value={products.active ?? 0} hint={`${products.outOfStock ?? 0} out of stock · ${products.lowStock ?? 0} low`} to={ROUTES.admin.products} />
            <StatCard loading={loading} icon={MessageSquare} label="Pending reviews" value={data.reviews?.pending ?? 0} hint="Awaiting approval" to={ROUTES.admin.reviews} />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <StatCard loading={loading} label="Today" value={formatPrice(revenue.today?.sales ?? 0)} hint={`${revenue.today?.orders ?? 0} orders`} />
            <StatCard loading={loading} label="This month" value={formatPrice(revenue.thisMonth?.sales ?? 0)} hint={`${revenue.thisMonth?.orders ?? 0} orders`} />
            <StatCard loading={loading} label="Customers" value={data.customers?.total ?? 0} hint="Unique customers" />
          </div>

          {typeof byStatus === "object" && (
            <ul className="flex flex-wrap gap-3" aria-label="Orders by status">
              {Object.keys(ORDER_STATUS)
                .filter((status) => typeof byStatus[status] === "number")
                .map((status) => (
                  <li key={status} className="flex items-center gap-2">
                    <StatusBadge status={status} size="sm" />
                    <span className="text-sm font-medium text-ink">{byStatus[status]}</span>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}

      <Card tone="muted">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl">Sales Performance</h2>
            <p className="text-sm text-muted">Daily totals for the last {days} days (non-cancelled orders).</p>
          </div>
          <SegmentedControl
            label="Chart metric"
            options={[
              { value: "sales", label: "Revenue" },
              { value: "orders", label: "Orders" },
            ]}
            value={metric}
            onChange={setMetric}
          />
        </div>
        {sales.isPending ? (
          <Skeleton className="h-52 w-full" />
        ) : sales.isError ? (
          <ErrorState message={sales.error.message} onRetry={sales.refetch} className="py-6" />
        ) : (
          <SalesChart rows={normalizeSales(sales.data)} metric={metric} />
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card tone="muted">
          <h2 className="mb-4 text-xl">Trending Items</h2>
          <MiniList query={top} emptyText="No sales in this period" getMeta={(row) => `${row.quantity ?? row.totalQuantity ?? row.sold ?? row.unitsSold ?? 0} sold`} />
        </Card>
        <Card tone="muted">
          <div className="mb-4 flex items-center gap-2">
            <TriangleAlert aria-hidden="true" className="size-5 text-danger" />
            <h2 className="text-xl">Low Stock</h2>
          </div>
          <MiniList query={lowStock} emptyText="Stock levels look healthy" getMeta={(row) => `${row.stock ?? 0} left`} />
        </Card>
      </div>

      <Card tone="muted">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl">Recent Orders</h2>
          <Link to={ROUTES.admin.orders} className="text-sm font-medium text-primary hover:underline">
            View all orders
          </Link>
        </div>
        {recent.isPending ? (
          <Skeleton className="h-40 w-full" />
        ) : recent.isError ? (
          <ErrorState message={recent.error.message} onRetry={recent.refetch} className="py-6" />
        ) : recent.data.orders.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No orders yet.</p>
        ) : (
          <AdminOrdersTable orders={recent?.data?.orders} />
        )}
      </Card>
    </div>
  );
}
