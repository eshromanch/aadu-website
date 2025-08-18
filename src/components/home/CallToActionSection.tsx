"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body24 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { callToActionData } from "@/data/homeData"
import Image from "next/image"

export function CallToActionSection() {
  return (
    <SectionContainer className="py-16">
      <div className="h-[300px] lg:h-[500px] bg-neutral-babyBlueTint rounded-lg p-8 lg:p-12 text-center flex flex-col justify-center">
        <H2 className="text-primary-deepBlue mb-8">
          {callToActionData.title}
        </H2>
        <Button size="lg" className="mx-auto">
          {callToActionData.buttonText}
          <Image
            src="/icons/arrow-right.svg"
            alt="Arrow Right"
            width={20}
            height={20}
          />
        </Button>
      </div>
    </SectionContainer>
  )
} 