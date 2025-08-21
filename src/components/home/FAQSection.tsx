"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body16 } from "@/components/common/Typography"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { faqData } from "@/data/homeData"

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>("0") // Default open to first FAQ

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  return (
    <SectionContainer className="py-16 lg:py-24">
      <H2 className="text-primary-deepBlue text-center mb-12">
        Frequently asked questions
      </H2>
      
      <div className="max-w-4xl mx-auto">
        <Accordion>
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger
                onClick={() => toggleFAQ(index.toString())}
                isOpen={openFAQ === index.toString()}
                className="text-primary-deepBlue text-[18px] lg:text-[20px]"
              >
                {faq.question}
              </AccordionTrigger>

              <AccordionContent isOpen={openFAQ === index.toString()}>
                <Body16 className="text-neutral-bodyText leading-relaxed">
                  {faq.answer}
                </Body16>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionContainer>
  )
} 