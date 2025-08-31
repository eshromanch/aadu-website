"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20, H2Semibold, Body20Semibold } from "@/components/common/Typography"
import { accreditationRecognitionData } from "@/data/aboutData"
import Image from "next/image"

export function AccreditationRecognition() {
  return (
    <div className="w-full py-16 bg-neutral-offWhiteBlue">
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden flex justify-center items-center">
            <Image
              src={accreditationRecognitionData.image}
              alt="Accreditation certificate"
              width={400}
              height={400}
              className="w-4/6 h-full"
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
          <div className="mt-10 justify-center items-center text-left">
            {accreditationRecognitionData.list.map((item, index) => (
              <div key={index} className="">
                <li>
                <Body20Semibold className="text-neutral-bodyText text-left">{item}</Body20Semibold>
              </li>
                </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
    </div>
  )
} 