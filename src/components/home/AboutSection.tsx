"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body24, Body20 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { aboutData } from "@/data/homeData"
import Image from "next/image"

export function AboutSection() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left - Content Card */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-babyBlueTint p-6 lg:p-12 rounded-lg lg:h-[500px] lg:flex lg:flex-col lg:justify-center">
            <H2 className="text-primary-deepBlue mb-4 lg:mb-6">
              {aboutData.title}
            </H2>
            <Body20 className="text-neutral-bodyText mb-6 lg:mb-8 leading-relaxed">
              {aboutData.description}
            </Body20>
            <Button className="w-fit">
              {aboutData.buttonText}
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={16}
                height={16}
              />
            </Button>
          </div>
        </div>
        
        {/* Right - Image (spans 1 column) */}
        <div className="lg:col-span-1">
          <div className="relative w-full h-64 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={aboutData.image}
              alt="University campus or students"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 