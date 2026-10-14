import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "./cartSelectors";
import { MAX_CART_LINES, MAX_ITEM_QUANTITY, addItem } from "./cartSlice";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";
import { isOutOfStock, toCartItem } from "../products/productUtils";

export default function AddToCartButton({ product, quantity = 1, variant = "icon", className }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const soldOut = isOutOfStock(product);

  function handleAdd() {
    const item = toCartItem(product, quantity);
    const existing = items.find((line) => line.productId === item.productId);

    if (existing?.quantity >= MAX_ITEM_QUANTITY) {
      toast.error(`You can order up to ${MAX_ITEM_QUANTITY} of one item.`);
      return;
    }
    if (!existing && items.length >= MAX_CART_LINES) {
      toast.error(`Your cart can hold up to ${MAX_CART_LINES} different products.`);
      return;
    }
    dispatch(addItem(item));
    toast.success(`${product.name} added to cart`);
  }

  if (variant === "button") {
    return (
      <Button onClick={handleAdd} disabled={soldOut} className={className}>
        <ShoppingBag aria-hidden="true" className="size-4" />
        {soldOut ? "Sold out" : "Add to cart"}
      </Button>
    );
  }

  return (
    <IconButton
      label={soldOut ? `${product.name} is sold out` : `Add ${product.name} to cart`}
      variant="sage"
      size="sm"
      onClick={handleAdd}
      disabled={soldOut}
      className={className}
    >
      <ShoppingBag />
    </IconButton>
  );
}
