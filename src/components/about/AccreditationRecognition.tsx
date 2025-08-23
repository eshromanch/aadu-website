"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20, H2Semibold } from "@/components/common/Typography"
import { accreditationRecognitionData } from "@/data/aboutData"
import Image from "next/image"

export function AccreditationRecognition() {
  return (
    <div className="w-full py-16 bg-neutral-offWhiteBlue">
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
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
          <H2Semibold className="text-primary-deepBlue mb-6">
            {accreditationRecognitionData.title}
          </H2Semibold>
          <Body20 className="text-neutral-bodyText leading-relaxed">
            {accreditationRecognitionData.description}
          </Body20>
        </div>
      </div>
    </SectionContainer>
    </div>
  )
} 