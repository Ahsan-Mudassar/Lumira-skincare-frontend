import Badge from "./Badge";
import { ORDER_STATUS } from "../../constants/orderStatus";

export default function StatusBadge({ status, ...props }) {
  const config = ORDER_STATUS[status] ?? { label: status, variant: "neutral" };
  return (
    <Badge variant={config.variant} {...props}>
      {config.label}
    </Badge>
  );
}
