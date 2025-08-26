"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H3, Body20, H3Semibold } from "@/components/common/Typography"
import { missionVisionData } from "@/data/aboutData"
import Image from "next/image"

export function MissionVision() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Mission & Vision Cards */}
        <div className="flex flex-col justify-between h-full space-y-8">
          {/* Mission Card */}
          <div className="bg-primary-deepBlue p-8 rounded-2xl">
            <H3Semibold className="text-white mb-4">
              {missionVisionData.mission.title}
            </H3Semibold>
            <Body20 className="text-white leading-relaxed">
              {missionVisionData.mission.description}
            </Body20>
          </div>
          
          {/* Vision Card */}
          <div className="bg-primary-dodgerBlue p-8 rounded-2xl">
            <H3Semibold className="text-white mb-4">
              {missionVisionData.vision.title}
            </H3Semibold>
            <Body20 className="text-white leading-relaxed">
              {missionVisionData.vision.description}
            </Body20>
          </div>
        </div>
        
        {/* Right - Image */}
        <Image
              src={missionVisionData.image}
              alt="Graduation celebration"
              width={500}
              height={500}
              className="w-full h-full lg:h-[500px] rounded-lg object-cover"
            />
      </div>
    </SectionContainer>
  )
} 