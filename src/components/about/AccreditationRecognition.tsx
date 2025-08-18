"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import { accreditationRecognitionData } from "@/data/aboutData"
import Image from "next/image"

export function AccreditationRecognition() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={accreditationRecognitionData.image}
              alt="Accreditation certificate"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Right - Content */}
        <div>
          <H2 className="text-primary-deepBlue mb-6">
            {accreditationRecognitionData.title}
          </H2>
          <Body20 className="text-neutral-bodyText leading-relaxed">
            {accreditationRecognitionData.description}
          </Body20>
        </div>
      </div>
    </SectionContainer>
  )
} 