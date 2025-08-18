"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H3, Body20 } from "@/components/common/Typography"
import { missionVisionData } from "@/data/aboutData"
import Image from "next/image"

export function MissionVision() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Mission & Vision Cards */}
        <div className="space-y-6">
          {/* Mission Card */}
          <div className="bg-primary-deepBlue p-8 rounded-lg">
            <H3 className="text-white mb-4">
              {missionVisionData.mission.title}
            </H3>
            <Body20 className="text-white leading-relaxed">
              {missionVisionData.mission.description}
            </Body20>
          </div>
          
          {/* Vision Card */}
          <div className="bg-neutral-babyBlueTint p-8 rounded-lg">
            <H3 className="text-primary-deepBlue mb-4">
              {missionVisionData.vision.title}
            </H3>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              {missionVisionData.vision.description}
            </Body20>
          </div>
        </div>
        
        {/* Right - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={missionVisionData.image}
              alt="Graduation celebration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 