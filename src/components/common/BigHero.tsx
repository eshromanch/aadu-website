"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H1, H2, H2Semibold, H3 } from "@/components/common/Typography"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface BigHeroProps {
  title: string
  subtitle?: string
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
export function BigHero({ title, backgroundImage, className, subtitle }: BigHeroProps) {
  return (
    <section className={cn("relative h-[70vh]", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <SectionContainer className="pb-16">
          <H1 className="text-white ">
            {title}
          </H1>
          {subtitle && (
            <H3 className="mt-4 text-white ">
              {subtitle}
            </H3> 
          )}
        </SectionContainer>
      </div>
    </section>
  )
} 