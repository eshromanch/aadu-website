"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H1 } from "@/components/common/Typography"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface BigHeroProps {
  title: string
  backgroundImage: string
  className?: string
}

/**
 * BigHero Component
 * 
 * A full-screen hero component for main landing pages. This is different from PageHero
 * which is a smaller card-style hero for sub-pages.
 * 
 * @example
 * ```tsx
 * // Homepage usage
 * <BigHero
 *   title="Turn Your Work Experience Into an Accredited Qualification"
 *   backgroundImage="/images/hero-bg.jpg"
 * />
 * 
 * // With custom className
 * <BigHero
 *   title="Welcome to Our Platform"
 *   backgroundImage="/images/welcome-bg.jpg"
 *   className="custom-hero-styles"
 * />
 * ```
 * 
 * @param title - The main heading text
 * @param backgroundImage - URL of the background image
 * @param className - Additional CSS classes for the container
 * 
 * @see PageHero - For smaller card-style heroes on sub-pages
 */
export function BigHero({ title, backgroundImage, className }: BigHeroProps) {
  return (
    <section className={cn("relative h-screen", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
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
            {title}
          </H1>
        </SectionContainer>
      </div>
    </section>
  )
} 