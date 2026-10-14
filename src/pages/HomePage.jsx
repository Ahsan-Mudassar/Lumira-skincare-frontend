import CategorySection from "../features/home/CategorySection";
import FeaturedSection from "../features/home/FeaturedSection";
import HeroSection from "../features/home/HeroSection";
import TestimonialsSection from "../features/home/TestimonialsSection";
import TrustStrip from "../features/home/TrustStrip";
import WhyChooseSection from "../features/home/WhyChooseSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WhyChooseSection />
      <CategorySection />
      <FeaturedSection />
      <TestimonialsSection />
    </>
  );
}
