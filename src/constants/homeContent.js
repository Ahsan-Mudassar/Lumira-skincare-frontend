import { Leaf, ShieldCheck, Truck, Banknote } from "lucide-react";
import { formatPrice } from "../lib/formatPrice";
import { FREE_SHIPPING_THRESHOLD } from "./shipping";

export const TRUST_ITEMS = [
  { icon: Leaf, label: "Vegan & cruelty-free" },
  { icon: ShieldCheck, label: "Dermatologist tested" },
  { icon: Truck, label: `Free shipping over ${formatPrice(FREE_SHIPPING_THRESHOLD)}` },
  { icon: Banknote, label: "Cash on delivery" },
];

export const TESTIMONIALS = [
  {
    name: "Elena Chen",
    initials: "EC",
    quote: "The Botanical Barrier Serum completely transformed my winter skin. Deeply soothing without any heavy residue.",
  },
  {
    name: "Sophia Martinez",
    initials: "SM",
    quote: "I love knowing that Lumira is committed to sustainable glass packaging. The Cloud Cream smells so naturally fresh.",
  },
  {
    name: "Juliette Dubois",
    initials: "JD",
    quote: "My sensitive skin reacts to everything, but Lumira's gentle cleanser and soothing oils have kept my complexion calm.",
  },
];
