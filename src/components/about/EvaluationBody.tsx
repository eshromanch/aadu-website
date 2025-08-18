"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import { evaluationBodyData } from "@/data/aboutData"
import Image from "next/image"

export function EvaluationBody() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          <H2 className="text-primary-deepBlue mb-6">
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
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={evaluationBodyData.image}
              alt="Faculty team meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 