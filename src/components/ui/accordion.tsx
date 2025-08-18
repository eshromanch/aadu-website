"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: number
  className?: string
}

export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpen)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div key={index} className="bg-white border border-neutral-lightGray rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-offWhiteBlue transition-colors"
          >
            <span className="text-left font-semibold text-primary-deepBlue">
              {item.question}
            </span>
            <Image
              src="/icons/chevron-down.svg"
              alt="Expand"
              width={20}
              height={20}
              className={cn(
                "text-primary-deepBlue transition-transform",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-neutral-bodyText leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 