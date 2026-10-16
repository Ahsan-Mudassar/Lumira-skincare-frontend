import { Eye, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { formatDate } from "../../../lib/formatDate";
import { formatPrice } from "../../../lib/formatPrice";
import IconButton from "../../../components/ui/IconButton";
import StatusBadge from "../../../components/ui/StatusBadge";
import Table, { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../../components/ui/Table";

export default function AdminOrdersTable({ orders }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Order</TableHeadCell>
          <TableHeadCell>Customer</TableHeadCell>
          <TableHeadCell>City</TableHeadCell>
          <TableHeadCell>Items</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Placed</TableHeadCell>
          <TableHeadCell className="text-right">View</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.data?.map((order) => (
          <TableRow key={order._id ?? order.orderNumber}>
            <TableCell className="font-medium text-primary">
              {order.orderNumber}
              {order.emailSent === false && (
                <span title="Owner notification email was not sent" className="ml-2 inline-flex align-middle text-danger">
                  <TriangleAlert aria-label="Email not sent" className="size-4" />
                </span>
              )}
            </TableCell>
            <TableCell>
              <p className="text-ink">{order.customerSnapshot?.name}</p>
              <p className="text-xs text-muted">{order.customerSnapshot?.phone}</p>
            </TableCell>
            <TableCell>{order.city}</TableCell>
            <TableCell>{order.itemCount}</TableCell>
            <TableCell className="font-medium text-ink">{formatPrice(order.total)}</TableCell>
            <TableCell>
              <StatusBadge status={order.status} size="sm" />
            </TableCell>
            <TableCell className="whitespace-nowrap">{formatDate(order.createdAt)}</TableCell>
            <TableCell className="text-right">
              <IconButton as={Link} to={ROUTES.admin.order(order._id)} label={`View order ${order.orderNumber}`} size="sm">
                <Eye />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
