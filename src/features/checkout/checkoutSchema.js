import { z } from "zod";

const phonePattern = /^(03\d{9}|\+923\d{9})$/;

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(60, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .refine((value) => phonePattern.test(value), "Enter a valid mobile number, like 03XXXXXXXXX"),
  city: z.string().trim().min(2, "Enter your city").max(60, "City is too long"),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(300, "Address is too long"),
  notes: z.string().trim().max(500, "Notes can be up to 500 characters"),
});
