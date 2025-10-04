"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20, H2Semibold } from "@/components/common/Typography"
import { ourStoryData } from "@/data/aboutData"
import Image from "next/image"

export function OurStory() {
  return (
    <div className="w-full bg-neutral-offWhiteBlue">
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          <H2Semibold className="text-primary-deepBlue mb-6">
            {ourStoryData.title}
          </H2Semibold>
          <Body20 className="text-neutral-bodyText leading-relaxed">
            {ourStoryData.description}
          </Body20>
        </div>
        
        {/* Right - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={ourStoryData.image}
              alt="Professional woman in academic setting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          <H2Semibold className="text-primary-deepBlue mb-6">
            Our Country Side Campus
          </H2Semibold>
          <Body20 className="text-neutral-bodyText leading-relaxed">
            Our Country Side Campus is a state-of-the-art facility located 50 km from the city. It is a modern and innovative campus that provides a conducive environment for learning and research.
          </Body20>
        </div>
        
        {/* Right - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={"/images/Urban Campus.jpeg"}
              alt="Professional woman in academic setting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
    </div>
  )
} 