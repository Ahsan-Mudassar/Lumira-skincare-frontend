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
