"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body24, Body20, Body20Semibold } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { degreeProgramsData } from "@/data/homeData"
import Link from "next/link"
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
  <Link href="/degree-programs">
  <Button className="w-fit">
            {degreeProgramsData.buttonText}
            <Image
              src="/icons/arrow-right.svg"
              alt="Arrow Right"
              width={16}
              height={16}
            />
          </Button></Link>
        </div>
        
        {/* Right - Degree Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {degreeProgramsData.programs.map((program, index) => (
             <Link key={index} href={program.link}>
                <div 
                className={`${program.bgColor} ${program.hasShadow ? 'shadow-lg' : ''} rounded-[15px] w-full h-[360px] relative overflow-hidden flex flex-col items-center justify-between p-8`}
              >
                  <Image
                    src={program.image}
                    alt={program.title}
                    className="object-cover h-[233px] object-center rounded"
                    height={233}
                    width={233}
                    
                  />
                
                
                {/* Title positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Body24 className={`${program.textColor} text-center`}>
                    {program.title}
                  </Body24>
                </div>
              </div>
             </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 