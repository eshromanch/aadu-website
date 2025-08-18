"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { lifeExperienceData } from "@/data/homeData"
import Image from "next/image"

export function LifeExperienceSection() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left - Image (spans 1 column) */}
        <div className="lg:col-span-1">
          <div className="relative w-full h-64 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={lifeExperienceData.image}
              alt="Students in university setting"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Right - Content Card */}
        <div className="lg:col-span-2">
          <div className="bg-primary-deepBlue p-6 lg:p-12 rounded-lg lg:h-[500px] lg:flex lg:flex-col lg:justify-center">
            <H2 className="text-white mb-4 lg:mb-6">
              {lifeExperienceData.title}
            </H2>
            <Body20 className="text-white mb-6 lg:mb-8 leading-relaxed">
              {lifeExperienceData.description}
            </Body20>
            <Button variant="secondary" className="w-fit">
              {lifeExperienceData.buttonText}
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={16}
                height={16}
              />
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 