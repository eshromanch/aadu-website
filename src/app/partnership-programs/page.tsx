"use client"

import { BigHero } from "@/components/common/BigHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { CardWithImage } from "@/components/common/CardWithImage"
import { partnershipProgramsData } from "@/data/partnershipProgramsData"

export default function PartnershipProgramsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BigHero
        title="Partnership Programs"
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Partnership Programs Section */}
      <SectionContainer className="py-16 lg:py-24">
        <div className="space-y-12 lg:space-y-16">
          {partnershipProgramsData.map((program, index) => (
            <CardWithImage
              key={program.id}
              title={program.title}
              description={program.description}
              image={program.image}
              imageAlt={program.imageAlt}
              buttonText={program.buttonText}
              variant={program.variant}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  )
} 