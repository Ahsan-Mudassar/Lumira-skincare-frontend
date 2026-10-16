import { useSelector } from "react-redux";
import {useState} from "react"
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import SectionHeading from "../components/ui/SectionHeading";
import { selectCartItems } from "../features/cart/cartSelectors";
import CheckoutForm from "../features/checkout/CheckoutForm";
import OrderSummary from "../features/checkout/OrderSummary";
import { useCheckout } from "../features/checkout/useCheckout";

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const checkout = useCheckout();

  const [startedEmpty] = useState(()=>items.length===0)
  if (startedEmpty) return <Navigate to={ROUTES.cart} replace />;

  return (
    <div className="container-page py-10 md:py-14">
      <SectionHeading as="h1" title="Checkout" description="Guest checkout. No account needed." />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        <CheckoutForm onSubmit={(values) => checkout.submit(values, items)} isPending={checkout.isPending} error={checkout.error} />
        <OrderSummary />
      </div>
    </div>
  );
}
