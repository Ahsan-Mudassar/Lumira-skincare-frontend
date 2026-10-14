import { ROUTES } from "../../constants/routes";
export const HERO_SLIDES = [
  {
    image:
      "https://res.cloudinary.com/dzssuss65/image/upload/v1791824192/Lumira_Niacinamide_Serum_Still_Life_yl6jhg.png",
    alt: "Lumira Niacinamide Serum bottle",
    badge: "Clarifying Serum",
    title: "Clear, even-toned skin, one drop at a time.",
    description: "A lightweight niacinamide serum designed to support a clearer-looking, balanced complexion.",
    cta: "Shop Serums",
    to: `${ROUTES.shop}?search=Niacinamide`,
    spotlight: { name: "Niacinamide Serum", to: `${ROUTES.shop}?search=Niacinamide` },
  },
  {
    image:
      "https://res.cloudinary.com/dzssuss65/image/upload/v1791824192/Lumira_Rosewater_Toner_Still_Life_lxsftx.png",
    alt: "Lumira Rosewater Toner bottle",
    badge: "Soothing Toner",
    title: "Calm, fresh and beautifully balanced.",
    description: "A gentle rosewater toner to refresh your skin between cleansing and care.",
    cta: "Shop Toners",
    to: `${ROUTES.shop}?search=Toner`,
    spotlight: { name: "Rosewater Toner", to: `${ROUTES.shop}?search=Rosewater` },
  },
  {
    image:
      "https://res.cloudinary.com/dzssuss65/image/upload/v1791824188/Gemini_Generated_Image_hxoglfhxoglfhxog_d1xkih.jpg",
    alt: "",
    badge: "Purity & Botanical Efficacy",
    title: "Serene skincare rooted in botanical science.",
    description: "Explore the Lumira collection of serums, cleansers, creams and masks for every skin type.",
    cta: "Shop Collection",
    to: ROUTES.shop,
  },
  {
    image:
      "https://res.cloudinary.com/dzssuss65/image/upload/v1791824188/Gemini_Generated_Image_4se9mf4se9mf4se9_lli9mv.jpg",
    alt: "",
    badge: "Daily Rituals",
    title: "Simple, thoughtful formulas for a routine you will love.",
    description: "Build a calm daily ritual with skincare made to feel as good as it looks.",
    cta: "Explore Rituals",
    to: ROUTES.shop,
  },
];