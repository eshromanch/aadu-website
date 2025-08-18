"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body16 } from "@/components/common/Typography"
import { ourValuesData } from "@/data/aboutData"
import Image from "next/image"

export function OurValues() {
  return (
    <SectionContainer className="py-16">
      <div className="text-center mb-12">
        <H2 className="text-primary-deepBlue">
          {ourValuesData.title}
        </H2>
      </div>
      
      {/* Image */}
      <div className="mb-12">
        <div className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden max-w-4xl mx-auto">
          <Image
            src={ourValuesData.image}
            alt="Library setting"
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {ourValuesData.values.map((value, index) => (
          <div key={index} className="bg-primary-deepBlue p-6 rounded-lg text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
              <Image
                src={value.icon}
                alt={value.title}
                width={24}
                height={24}
                className="filter brightness-0 invert"
              />
            </div>
            <h3 className="text-white font-semibold mb-2">
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