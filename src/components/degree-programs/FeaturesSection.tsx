"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H3, Body16 } from "@/components/common/Typography"
import Image from "next/image"

const features = [
  {
    icon: "/icons/books.svg",
    title: "No Classes, No Exams",
    description: "Under our Corporate Partnership scheme, employees are eligible to apply for evaluated degrees based on experience, without attending classes or standardized exams. Submitted materials are reviewed by qualified faculty evaluators, and successful applicants may receive degree documentation within 20 to 45 business days, subject to verification and processing"
  },
  {
    icon: "/icons/delivery.svg",
    title: "Fast and Professional Evaluation",
    description: "Your application is reviewed by expert faculty, and your accredited degree will be delivered to you via FedEx/DHL in just 20 days."
  },
  {
    icon: "/icons/earth.svg",
    title: "Globally Recognized Accreditation",
    description: "American University is accredited by the Education Accreditation Council of America (EACOA), ensuring your bachelor's degree is recognized and trusted."
  },
  {
    icon: "/icons/checklist.svg",
    title: "Major in over 180+ subjects",
    description: "Choose from a list of over 180+ available majors for your Bachelor's degree. View list of all available majors and select the one which fits your life experience best."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-2">
          {features.map((feature, index) => (
            <div key={index} className="bg-neutral-lightGray rounded-[20px] p-8 lg:p-12 space-y-6 items-start">
              {/* Icon */}
              <div className="">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 lg:w-20 lg:h-20"
                />
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <H3 className="text-primary-deepBlue font-bold">
                  {feature.title}
                </H3>
                <Body16 className="text-neutral-bodyText leading-relaxed">
                  {feature.description}
                </Body16>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
} 