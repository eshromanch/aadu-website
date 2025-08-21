"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body16, H2Semibold } from "@/components/common/Typography"
import { ourValuesData } from "@/data/aboutData"
import Image from "next/image"

export function OurValues() {
  return (
    <SectionContainer className="py-16">
      <div className="text-center mb-12">
        <H2Semibold className="text-primary-deepBlue">
          {ourValuesData.title}
        </H2Semibold>
      </div>

      
      {/* Values Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 ">
        {ourValuesData.values.map((value, index) => (
          <div key={index} className="bg-primary-deepBlue rounded-lg text-center p-12">
            <div className="mx-auto mb-4  rounded-lg flex items-center justify-center">
              <Image
                src={value.icon}
                alt={value.title}
                width={70}
                height={70}
                className=""
              />
            </div>
            <h3 className="text-white font-semibold mb-6">
              {value.title}
            </h3>
            <Body16 className="text-white/90">
              {value.description}
            </Body16>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
} 