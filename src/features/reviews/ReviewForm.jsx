import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import RatingInput from "../../components/ui/RatingInput";
import Textarea from "../../components/ui/Textarea";
import { createReview } from "./reviewsApi";
import { reviewSchema } from "./reviewSchema";

export default function ReviewForm({ productId, productSlug, onDone }) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { orderNumber: "", email: "", title: "", comment: "" },
  });

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: (res) => {
      toast.success(res.message || "Thank you! Your review will appear after it is approved.");
      queryClient.invalidateQueries({ queryKey: ["products", "reviews", productSlug] });
      reset();
      setRating(0);
      onDone?.();
    },
  });

  function onSubmit(values) {
    if (rating < 1) {
      setRatingError("Please choose a rating.");
      return;
    }
    setRatingError("");
    mutation.mutate({
      orderNumber: values.orderNumber,
      email: values.email,
      productId,
      rating,
      ...(values.title && { title: values.title }),
      comment: values.comment,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        You can review a product after your order has been delivered. Enter the order number and email you used at
        checkout.
      </p>
      {mutation.isError && <Alert variant="error">{mutation.error.message}</Alert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input tone="surface" label="Order number" placeholder="LUM-0001" error={errors.orderNumber?.message} {...register("orderNumber")} />
        <Input tone="surface" label="Email" type="email" error={errors.email?.message} {...register("email")} />
      </div>
      <RatingInput value={rating} onChange={setRating} error={ratingError} />
      <Input tone="surface" label="Title (optional)" error={errors.title?.message} {...register("title")} />
      <Textarea tone="surface" label="Your review" error={errors.comment?.message} {...register("comment")} />
      <Button type="submit" loading={mutation.isPending} className="self-start">
        Submit review
      </Button>
    </form>
  );
}
