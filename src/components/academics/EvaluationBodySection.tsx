"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import { evaluationBodyData } from "@/data/academicsData"
import Image from "next/image"

export function EvaluationBodySection() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Content */}
        <div className="space-y-6">
          <H2 className="text-primary-deepBlue">
            {evaluationBodyData.title}
          </H2>
          <div className="space-y-4">
            {evaluationBodyData.paragraphs.map((paragraph, index) => (
              <Body20 key={index} className="text-neutral-bodyText leading-relaxed">
                {paragraph}
              </Body20>
            ))}
          </div>
        </div>
        
        {/* Right - Image */}
        <div className="relative w-full h-64 lg:h-[400px] rounded-lg overflow-hidden">
          <Image
            src={evaluationBodyData.image}
            alt="Faculty members collaborating"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </SectionContainer>
  )
} 