
import AboutSection from "./AboutSection";
import CoursesSection from "./CoursesSection";
import HeroSection from "./hero/Hero";
import InstructorsSection from "./InstructorsSection";
import PartnersSection from "./PartnersSection";
import PromoSection from "./PromoSection";
import TestimonialsSection from "./TestimonialsSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CoursesSection />
      <AboutSection/>
      <InstructorsSection />
      <TestimonialsSection />
      <PartnersSection/>
      <PromoSection/>
    </div>
  );
}
