
import AboutSection from "./AboutSection";
import CoursesSection from "./CoursesSection";
import HeroSection from "./hero/Hero";
import PromoSection from "./PromoSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CoursesSection />
      <AboutSection/>

      <PromoSection/>
    </div>
  );
}
