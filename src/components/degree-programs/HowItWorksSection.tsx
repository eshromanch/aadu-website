"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body16, H4Semibold } from "@/components/common/Typography"
import Image from "next/image"

const steps = [
  {
    number: "1",
    title: "Submit Application",
    description: "Complete your application with work history and experience details."
  },
  {
    number: "2", 
    title: "Experience",
    description: "Provide your details and work history."
  },
  {
    number: "3",
    title: "Receive Degree", 
    description: "Provide your details and work history."
  },
  {
    number: "4",
    title: "Get Certified",
    description: "Provide your details and work history."
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24">
      <SectionContainer>
        <div className="text-left space-y-12 lg:space-y-16">
          <H2 className="text-primary-deepBlue">
            How It Works
          </H2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
            {/* Vertical separators */}
            <div className="hidden lg:block absolute left-1/4 top-0 bottom-0 w-px bg-white/20"></div>
            <div className="hidden lg:block absolute left-2/4 top-0 bottom-0 w-px bg-white/20"></div>
            <div className="hidden lg:block absolute left-3/4 top-0 bottom-0 w-px bg-white/20"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="space-y-6 flex flex-col items-start">
                {/* Number Icon */}
                <div className="flex">
                  <Image
                    src={`/icons/${step.number}.svg`}
                    alt={`Step ${step.number}`}
                    width={80}
                    height={80}
                    className="w-16 h-16 lg:w-20 lg:h-20"
                  />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <H4Semibold className="text-primary-deepBlue font-bold">
                    {step.title}
                  </H4Semibold>
                  <Body16 className="">
                    {step.description}
                  </Body16>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
} 