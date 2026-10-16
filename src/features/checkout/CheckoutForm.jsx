import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Banknote, MapPin, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { formatPrice } from "../../lib/formatPrice";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import SectionLabel from "../../components/ui/SectionLabel";
import Textarea from "../../components/ui/Textarea";
import { selectEstimatedTotal } from "../cart/cartSelectors";
import { checkoutSchema } from "./checkoutSchema";

export default function CheckoutForm({ onSubmit, isPending, error }) {
  const total = useSelector(selectEstimatedTotal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", phone: "", city: "", address: "", notes: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {error && (
        <Alert variant="error" title={error.status === 409 ? "Stock issue" : "We could not place your order"}>
          {error.message}
        </Alert>
      )}

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-1">
          <SectionLabel icon={User}>Contact details</SectionLabel>
        </legend>
        <Input label="Recipient full name" autoComplete="name" placeholder="Your full name" error={errors.name?.message} {...register("name")} />
        <Input label="Email address (for order tracking)" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
        <Input label="Contact phone (for verification call)" type="tel" autoComplete="tel" placeholder="03XXXXXXXXX" error={errors.phone?.message} {...register("phone")} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-1">
          <SectionLabel icon={MapPin}>Shipping destination</SectionLabel>
        </legend>
        <Input label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
        <Input label="Street address" autoComplete="street-address" placeholder="House, street, area" error={errors.address?.message} {...register("address")} />
        <Textarea label="Delivery notes (optional)" rows={3} error={errors.notes?.message} {...register("notes")} />
      </fieldset>

      <div className="flex flex-col gap-3">
        <SectionLabel icon={Banknote}>Payment method</SectionLabel>
        <div className="relative overflow-hidden rounded-xl border-2 border-primary bg-white p-4">
          <span className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1 text-xs tracking-wider text-white uppercase">Selected</span>
          <p className="font-medium text-ink">Cash on Delivery (COD)</p>
          <p className="text-sm text-muted">Pay securely when your package arrives.</p>
        </div>
      </div>

      <Alert variant="notice" title="Verification call notice">
        Our support team will call your contact number shortly after you place the order to confirm delivery details
        and address accuracy.
      </Alert>

      <Button type="submit" size="lg" uppercase fullWidth loading={isPending}>
        Complete purchase ({formatPrice(total)})
        <ArrowRight aria-hidden="true" className="size-4" />
      </Button>
    </form>
  );
}
