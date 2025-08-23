import { PageHero } from "@/components/common/PageHero"
import { CardWithImage } from "@/components/common/CardWithImage"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { degreeProgramsHeroData } from "@/data/heroData"
import { degreePrograms, callToActionData, individualDegreePrograms } from "@/data/degreeProgramsData"
import Link from "next/link"
import { SectionContainer } from "@/components/common/SectionContainer"

export default function DegreeProgramsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}

        <SectionContainer className="py-8 lg:py-16">
        <PageHero
          title={degreeProgramsHeroData.title}
          subtitle={degreeProgramsHeroData.subtitle}
          backgroundImage={degreeProgramsHeroData.backgroundImage}
        />

        </SectionContainer>
      
      {/* Degree Program Cards */}
      {degreePrograms.map((program, index) => {
        const individualProgram = individualDegreePrograms.find(p => p.title === program.title)
        return (
          <Link key={index} href={`/degree-programs/${individualProgram?.id || 'bachelors'}`}>
            <CardWithImage
              title={program.title}
              description={program.description}
              buttonText={program.buttonText}
              variant={program.variant}
              image={program.image}
              imageAlt={program.imageAlt}
            />
          </Link>
        )
      })}
      
      {/* Call to Action Banner */}
      <CallToActionBanner
        title={callToActionData.title}
      />
    </div>
  )
} 