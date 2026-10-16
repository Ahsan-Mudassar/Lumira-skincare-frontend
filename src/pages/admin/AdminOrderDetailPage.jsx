import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { ORDER_STATUS, ORDER_STATUS_TRANSITIONS } from "../../constants/orderStatus";
import { ROUTES } from "../../constants/routes";
import { formatDate } from "../../lib/formatDate";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ErrorState from "../../components/ui/ErrorState";
import Select from "../../components/ui/Select";
import Skeleton from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import Textarea from "../../components/ui/Textarea";
import { useAdminOrder, useResendOrderEmail, useUpdateOrderStatus } from "../../features/admin/orders/hooks";
import OrderItems from "../../features/orders/OrderItems";

function StatusPanel({ order }) {
  const allowed = ORDER_STATUS_TRANSITIONS[order.status] ?? [];
  const [next, setNext] = useState(allowed[0] ?? "");
  const [note, setNote] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const update = useUpdateOrderStatus();

  function apply() {
    update.mutate(
      { id: order._id, status: next, ...(note.trim() && { note: note.trim() }) },
      {
        onSuccess: () => {
          toast.success(`Order marked ${ORDER_STATUS[next]?.label.toLowerCase()}`);
          setNote("");
          setConfirmCancel(false);
        },
        onError: (error) => {
          toast.error(error.message);
          setConfirmCancel(false);
        },
      }
    );
  }

  if (allowed.length === 0) {
    return <p className="text-sm text-muted">This order is {order.status}. No further status changes are possible.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Select label="Change status to" value={next} onChange={(e) => setNext(e.target.value)} tone="surface">
        {allowed.map((status) => (
          <option key={status} value={status}>{ORDER_STATUS[status].label}</option>
        ))}
      </Select>
      <Textarea label="Note (optional)" rows={2} maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} tone="surface" />
      <Button
        variant={next === "cancelled" ? "danger" : "primary"}
        loading={update.isPending && !confirmCancel}
        onClick={() => (next === "cancelled" ? setConfirmCancel(true) : apply())}
        className="self-start"
      >
        Update status
      </Button>
      <ConfirmDialog
        open={confirmCancel}
        onClose={() => setConfirmCancel(false)}
        onConfirm={apply}
        loading={update.isPending}
        danger
        title="Cancel this order?"
        message="Stock for all items will be restored. This cannot be undone."
        confirmLabel="Cancel order"
        cancelLabel="Keep order"
      />
    </div>
  );
}

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const { data: order, isPending, isError, error, refetch } = useAdminOrder(id);
  const resend = useResendOrderEmail();
  const [forceOpen, setForceOpen] = useState(false);

  function sendEmail(force) {
    resend.mutate(
      { id, force },
      {
        onSuccess: () => {
          toast.success("Notification email sent");
          setForceOpen(false);
        },
        onError: (err) => {
          if (err.status === 409 && !force) setForceOpen(true);
          else toast.error(err.message);
        },
      }
    );
  }

  if (isPending) return <Skeleton className="h-96 w-full" />;
  if (isError) return <ErrorState title="Could not load order" message={error.message} onRetry={refetch} />;

  const customer = order.customer ?? order.customerSnapshot ?? {};
  const address = order.shippingAddress ?? {};
  const history = order.statusHistory ?? [];

  return (
    <div className="flex flex-col gap-6">
      <Link to={ROUTES.admin.orders} className="inline-flex w-fit items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" />
        All orders
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl">{order.orderNumber}</h1>
        <StatusBadge status={order.status} />
        <p className="text-sm text-muted">Placed {formatDate(order.createdAt, { time: true })}</p>
      </div>

      {order.emailSent === false && (
        <Alert variant="error" title="Notification email not sent">
          The owner email for this order did not go out.
          <Button variant="outline" size="sm" className="mt-3" onClick={() => sendEmail(false)} loading={resend.isPending}>
            <Mail aria-hidden="true" className="size-4" />
            Resend email
          </Button>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card tone="muted">
            <h2 className="mb-4 text-xl">Items</h2>
            <OrderItems items={order.items} subtotal={order.subtotal} shippingFee={order.shippingFee} total={order.total} />
          </Card>
          <Card tone="muted">
            <h2 className="mb-4 text-xl">Status history</h2>
            <ol className="flex flex-col gap-3">
              {history.map((entry, index) => (
                <li key={`${entry.status}-${index}`} className="flex items-start gap-3">
                  <StatusBadge status={entry.status} size="sm" />
                  <div className="text-sm">
                    <p className="text-body">
                      {formatDate(entry.changedAt, { time: true })}
                      {(entry.changedBy?.name ?? entry.changedBy?.email) && <> &middot; {entry.changedBy.name ?? entry.changedBy.email}</>}
                    </p>
                    {entry.note && <p className="text-muted">{entry.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card tone="muted">
            <h2 className="mb-4 text-xl">Update status</h2>
            <StatusPanel key={order.status} order={order} />
          </Card>
          <Card tone="muted">
            <h2 className="mb-3 text-xl">Customer</h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div><dt className="text-muted">Name</dt><dd className="text-ink">{customer.name}</dd></div>
              <div><dt className="text-muted">Phone</dt><dd><a href={`tel:${customer.phone}`} className="text-primary hover:underline">{customer.phone}</a></dd></div>
              {customer.email && <div><dt className="text-muted">Email</dt><dd className="break-all text-ink">{customer.email}</dd></div>}
            </dl>
          </Card>
          <Card tone="muted">
            <h2 className="mb-3 text-xl">Shipping address</h2>
            <p className="text-sm text-ink">{address.address}</p>
            <p className="text-sm text-body">{address.city ?? order.city}</p>
            {address.notes && <p className="mt-2 text-sm text-muted">Note: {address.notes}</p>}
            <p className="mt-3 text-xs text-muted">Payment: cash on delivery</p>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={forceOpen}
        onClose={() => setForceOpen(false)}
        onConfirm={() => sendEmail(true)}
        loading={resend.isPending}
        title="Email already sent"
        message="The notification email was already sent for this order. Send it again?"
        confirmLabel="Send again"
      />
    </div>
  );
}
