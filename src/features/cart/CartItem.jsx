import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { formatPrice } from "../../lib/formatPrice";
import IconButton from "../../components/ui/IconButton";
import QuantityStepper from "../../components/ui/QuantityStepper";
import { MAX_ITEM_QUANTITY, removeItem, updateQuantity } from "./cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const href = ROUTES.product(item.slug);

  function handleRemove() {
    dispatch(removeItem(item.productId));
    toast(`${item.name} removed`);
  }

  return (
    <div className="flex gap-4">
      <Link to={href} className="shrink-0 overflow-hidden rounded-lg bg-surface">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" className="size-24 object-cover md:size-28" />
        ) : (
          <div aria-hidden="true" className="size-24 md:size-28" />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base leading-snug md:text-lg">
              <Link to={href} className="hover:text-primary">
                {item.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted">{formatPrice(item.price)} each</p>
          </div>
          <IconButton label={`Remove ${item.name} from cart`} size="sm" onClick={handleRemove}>
            <Trash2 />
          </IconButton>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={item.quantity}
            max={MAX_ITEM_QUANTITY}
            onChange={(quantity) => dispatch(updateQuantity({ productId: item.productId, quantity }))}
          />
          <p className="text-base font-semibold text-ink md:text-lg">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
