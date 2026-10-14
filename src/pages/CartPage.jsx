import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import EmptyState from "../components/ui/EmptyState";
import SectionHeading from "../components/ui/SectionHeading";
import { selectCartItems } from "../features/cart/cartSelectors";
import { clearCart } from "../features/cart/cartSlice";
import CartItem from "../features/cart/CartItem";
import CartSummary from "../features/cart/CartSummary";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleClear() {
    dispatch(clearCart());
    setConfirmOpen(false);
    toast("Cart cleared");
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Explore the collection and add something you love."
          action={
            <Button as={Link} to={ROUTES.shop}>
              Start shopping
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-14">
      <SectionHeading
        as="h1"
        title="Your Cart"
        action={
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(true)}>
            Clear cart
          </Button>
        }
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <ul className="flex flex-col divide-y divide-line-soft">
          {items.map((item) => (
            <li key={item.productId} className="py-5 first:pt-0">
              <CartItem item={item} />
            </li>
          ))}
        </ul>
        <CartSummary />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleClear}
        danger
        title="Clear your cart?"
        message="All items will be removed from your cart."
        confirmLabel="Clear cart"
      />
    </div>
  );
}
