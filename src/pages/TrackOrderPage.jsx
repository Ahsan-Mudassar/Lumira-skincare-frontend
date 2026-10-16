import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";
import StatusBadge from "../components/ui/StatusBadge";
import { formatDate } from "../lib/formatDate";
import OrderItems from "../features/orders/OrderItems";
import OrderTimeline from "../features/orders/OrderTimeline";
import TrackOrderForm from "../features/orders/TrackOrderForm";
import { useTrackOrder } from "../features/orders/useTrackOrder";

export default function TrackOrderPage() {
  const track = useTrackOrder();
  const order = track.data?.data;

  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <SectionHeading
        as="h1"
        title="Track Your Shipment"
        description="Enter your order number and the email you used at checkout."
      />

      <Card className="mt-8">
        <TrackOrderForm onSubmit={(values) => track.mutate(values)} isPending={track.isPending} error={track.error} />
      </Card>

      {order && (
        <div className="mt-8 flex flex-col gap-6" aria-live="polite">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted">Order</p>
                <h2 className="text-2xl">{order.orderNumber}</h2>
                <p className="text-sm text-muted">Placed {formatDate(order.createdAt, { time: true })}{order.city ? ` · ${order.city}` : ""}</p>
              </div>
              <StatusBadge status={order.status} size="md" uppercase />
            </div>
            <div className="mt-6">
              <OrderTimeline status={order.status} history={order.statusHistory} />
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl">Package contents</h2>
              <Badge variant="outline" size="sm">Cash on delivery</Badge>
            </div>
            <OrderItems items={order.items} subtotal={order.subtotal} shippingFee={order.shippingFee} total={order.total} />
          </Card>
        </div>
      )}
    </div>
  );
}
