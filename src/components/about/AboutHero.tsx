"use client"

import { PageHero } from "@/components/common/PageHero"
import { aboutHeroData } from "@/data/heroData"

export function AboutHero() {
  return (
      <PageHero
        title={aboutHeroData.title}
        subtitle={aboutHeroData.subtitle}
        backgroundImage={aboutHeroData.backgroundImage}
        className="container mx-auto py-16 lg:py-24"
      />
  )
} 