
import { BigHero } from "@/components/common/BigHero"
import { Testimonial } from "@/components/home/Testimonial"
import { LifeExperienceSection } from "@/components/home/LifeExperienceSection"
import { DegreeProgramsSection } from "@/components/home/DegreeProgramsSection"
import { AboutSection } from "@/components/home/AboutSection"
import { FAQSection } from "@/components/home/FAQSection"
import { CallToActionSection } from "@/components/home/CallToActionSection"
import { homeHeroData } from "@/data/heroData"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BigHero
        title={homeHeroData.title}
        subtitle={homeHeroData.subtitle}
        backgroundImage={homeHeroData.backgroundImage}
      />
      <Testimonial />
      <LifeExperienceSection />
      <DegreeProgramsSection />
      <AboutSection />
      <FAQSection />
      <CallToActionSection />
    </div>
  )
}
