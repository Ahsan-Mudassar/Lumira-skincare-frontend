import { z } from "zod";

export const reviewSchema = z.object({
  orderNumber: z.string().trim().min(3, "Enter your order number"),
  email: z.string().trim().email("Enter a valid email address"),
  title: z.string().trim().max(100, "Title can be up to 100 characters"),
  comment: z.string().trim().min(10, "Please write at least 10 characters").max(1000, "Comment can be up to 1000 characters"),
});
