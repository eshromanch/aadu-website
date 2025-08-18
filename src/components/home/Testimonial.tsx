"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { Body24, Body20, Body20Semibold } from "@/components/common/Typography"
import { testimonialData } from "@/data/homeData"
import Image from "next/image"

export function Testimonial() {
  return (
    <div className="w-full py-16 bg-neutral-offWhiteBlue">
      <SectionContainer className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left - Quote */}
        <div className="flex-1">
          <div className="relative">
            <Image
              src="/icons/Quote Icon.svg"
              alt="Quote"
              width={80}
              height={80}
              className="mb-6"
            />
            <Body24 className="text-neutral-bodyText mb-6 leading-relaxed">
              {testimonialData.quote}
            </Body24>
            <div className="flex items-center gap-2">
              <Body20 className="text-primary-deepBlue">
                - {testimonialData.author}
              </Body20>
            </div>
            <Body20Semibold className="text-neutral-bodyText">
              {testimonialData.position}
            </Body20Semibold>
          </div>
        </div>
        
        {/* Right - Portrait */}
        <div className="flex-1">
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image 
              src={testimonialData.image}
              alt={`${testimonialData.author}, ${testimonialData.position}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  )
} 