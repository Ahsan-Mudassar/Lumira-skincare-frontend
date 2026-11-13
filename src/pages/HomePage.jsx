import ContactSection from "../features/home/ContactSection";
import CategorySection from "../features/home/CategorySection";
import FeaturedSection from "../features/home/FeaturedSection";
import HeroSection from "../features/home/HeroSection";
import TestimonialsSection from "../features/home/TestimonialsSection";
import TrustStrip from "../features/home/TrustStrip";
import OurPartners from "../features/home/WhyChooseSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <OurPartners />
      <CategorySection />
      <FeaturedSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
