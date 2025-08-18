
import { Hero } from "@/components/home/Hero"
import { Testimonial } from "@/components/home/Testimonial"
import { LifeExperienceSection } from "@/components/home/LifeExperienceSection"
import { DegreeProgramsSection } from "@/components/home/DegreeProgramsSection"
import { AboutSection } from "@/components/home/AboutSection"
import { FAQSection } from "@/components/home/FAQSection"
import { CallToActionSection } from "@/components/home/CallToActionSection"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Testimonial />
      <LifeExperienceSection />
      <DegreeProgramsSection />
      <AboutSection />
      <FAQSection />
      <CallToActionSection />
    </div>
  )
}
