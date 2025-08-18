"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2 } from "@/components/common/Typography"
import { Accordion } from "@/components/ui/accordion"
import { faqData } from "@/data/homeData"

export function FAQSection() {
  return (
    <SectionContainer className="py-16">
      <H2 className="text-primary-deepBlue text-center mb-12">
        Frequently asked questions
      </H2>
      
      <div className="max-w-4xl mx-auto">
        <Accordion items={faqData} defaultOpen={0} />
      </div>
    </SectionContainer>
  )
} 