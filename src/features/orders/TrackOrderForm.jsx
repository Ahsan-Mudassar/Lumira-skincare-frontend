import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const trackSchema = z.object({
  orderNumber: z.string().trim().min(3, "Enter your order number, like LUM-0001"),
  email: z.string().trim().email("Enter the email you used at checkout"),
});

export default function TrackOrderForm({ onSubmit, isPending, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(trackSchema), defaultValues: { orderNumber: "", email: "" } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {error && <Alert variant="error">{error.message}</Alert>}
      <Input tone="surface" label="Order number" placeholder="e.g. LUM-0001" autoCapitalize="characters" error={errors.orderNumber?.message} {...register("orderNumber")} />
      <Input tone="surface" label="Email address" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
      <Button type="submit" size="lg" loading={isPending}>
        <Search aria-hidden="true" className="size-4" />
        Find package
      </Button>
    </form>
  );
}
