import { OurStory } from "@/components/about/OurStory"
import { MissionVision } from "@/components/about/MissionVision"
import { OurValues } from "@/components/about/OurValues"
import { AccreditationRecognition } from "@/components/about/AccreditationRecognition"
import { EvaluationBody } from "@/components/about/EvaluationBody"
import { TalkWithUs } from "@/components/about/TalkWithUs"
import { aboutHeroData } from "@/data/heroData"
import { PageHero } from "@/components/common/PageHero"
import { SectionContainer } from "@/components/common/SectionContainer"


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SectionContainer className="py-8 lg:py-16">
        <PageHero
          title={aboutHeroData.title}
          subtitle={aboutHeroData.subtitle}
          backgroundImage={aboutHeroData.backgroundImage}
        />
      </SectionContainer>
      <OurStory />
      <MissionVision />
      <OurValues />
      <AccreditationRecognition />
      <EvaluationBody />
      <TalkWithUs />
    </div>
  )
} 