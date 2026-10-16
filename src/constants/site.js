import { ROUTES } from "./routes";

export const SITE = {
  name: "Lumira",
  fullName: "Lumira Skincare",
  tagline: "Natural efficacy for modern wellness.",
};

export const NAV_LINKS = [
  { label: "Home", to: ROUTES.home, end: true },
  { label: "Shop", to: ROUTES.shop },
  { label: "Track Order", to: ROUTES.trackOrder },
];

export const CONTACT = {
  email: "hello@lumira.example",
  phone: "0371 6759332",
  whatsapp: "+92309 4567389", 
  address: "Lahore, Pakistan",
  hours: "Mon - Sat, 10:00 AM - 7:00 PM",
};
