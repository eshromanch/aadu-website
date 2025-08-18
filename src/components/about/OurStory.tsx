"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import { ourStoryData } from "@/data/aboutData"
import Image from "next/image"

export function OurStory() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          <H2 className="text-primary-deepBlue mb-6">
            {ourStoryData.title}
          </H2>
          <Body20 className="text-neutral-bodyText leading-relaxed">
            {ourStoryData.description}
          </Body20>
        </div>
        
        {/* Right - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={ourStoryData.image}
              alt="Professional woman in academic setting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 