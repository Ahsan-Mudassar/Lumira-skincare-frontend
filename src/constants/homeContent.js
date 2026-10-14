import { Leaf, Rabbit, Recycle, ShieldCheck, Truck, Banknote } from "lucide-react";
import { formatPrice } from "../lib/formatPrice";
import { FREE_SHIPPING_THRESHOLD } from "./shipping";

export const TRUST_ITEMS = [
  { icon: Leaf, label: "Vegan & cruelty-free" },
  { icon: ShieldCheck, label: "Dermatologist tested" },
  { icon: Truck, label: `Free shipping over ${formatPrice(FREE_SHIPPING_THRESHOLD)}` },
  { icon: Banknote, label: "Cash on delivery" },
];

export const COMMITMENTS = [
  {
    icon: Leaf,
    title: "100% Natural Actives",
    text: "Hand-harvested botanicals and cold-pressed extracts, chosen for potency your skin barrier can feel.",
  },
  {
    icon: Rabbit,
    title: "Cruelty-Free & Ethical",
    text: "Formulated without animal testing, so your routine stays in harmony with nature.",
  },
  {
    icon: Recycle,
    title: "Sustainable Packaging",
    text: "Recyclable amber glass and recycled paper, designed to keep waste to a minimum.",
  },
  {
    icon: ShieldCheck,
    title: "Dermatologist Tested",
    text: "Gentle formulas tested for sensitive and reactive skin, with no synthetic fragrance.",
  },
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
