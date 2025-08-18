"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H1 } from "@/components/common/Typography"
import { heroData } from "@/data/homeData"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage}
          alt="University students background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <SectionContainer className="pb-16">
          <H1 className="text-white max-w-4xl">
            {heroData.title}
          </H1>
        </SectionContainer>
      </div>
    </section>
  )
} 