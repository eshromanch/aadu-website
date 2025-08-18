"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body24, Body20, Body20Semibold } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { degreeProgramsData } from "@/data/homeData"
import Image from "next/image"

export function DegreeProgramsSection() {
  return (
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left - Content */}
        <div className="flex flex-col justify-between lg:col-span-1">
          <H2 className="text-primary-deepBlue mb-6">
            {degreeProgramsData.title}
          </H2>
          <Button className="w-fit">
            {degreeProgramsData.buttonText}
            <Image
              src="/icons/arrow-right.svg"
              alt="Arrow Right"
              width={16}
              height={16}
            />
          </Button>
        </div>
        
        {/* Right - Degree Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {degreeProgramsData.programs.map((program, index) => (
              <div 
                key={index} 
                className={`${program.bgColor} ${program.hasShadow ? 'shadow-lg' : ''} rounded-[15px] w-full h-[360px] relative overflow-hidden`}
              >
                {/* Image Container with 14px top padding */}
                <div className="absolute top-[14px] left-1/2 transform -translate-x-1/2 w-[233px] h-[233px] rounded-[10px] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Title positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Body24 className={`${program.textColor} text-center`}>
                    {program.title}
                  </Body24>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 