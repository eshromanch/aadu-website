"use client"

import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  className?: string
}

/**
 * PageHero Component
 * 
 * A reusable hero component for page headers that matches the exact design specifications.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <PageHero
 *   title="About AADU"
 *   subtitle="Empowering Professionals Through Accredited Recognition"
 *   backgroundImage="/images/hero-bg.jpg"
 *   className="container mx-auto px-8"
 * />
 * 
 * // Without subtitle
 * <PageHero
 *   title="Contact Us"
 *   backgroundImage="/images/contact-hero.jpg"
 * />
 * ```
 * 
 * @param title - The main heading text
 * @param subtitle - Optional subtitle text
 * @param backgroundImage - URL of the background image
 * @param className - Additional CSS classes for the container
 */
export function PageHero({ title, subtitle, backgroundImage, className }: PageHeroProps) {
  return (
    <section className={className}>
      {/* Main Container - Frame 22 */}
      <div className="relative w-full h-[200px] lg:h-[300px] mx-auto rounded-[20px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay - Rectangle 2 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        
        {/* Content Container */}
        <div className="relative z-10 h-full">
          {/* Title - About AADU */}
          <div className="absolute left-5 lg:left-8 top-[152px] lg:top-[171px]">
            <h1 className="text-white font-dm-sans font-normal text-[28px] lg:text-[50px] leading-[100%]">
              {title}
            </h1>
          </div>
          
          {/* Subtitle - Empowering Professionals... */}
          {subtitle && (
            <div className="absolute left-5 lg:left-8 top-[236px] lg:top-[236px]">
              <p className="text-white font-dm-sans font-normal text-[24px] leading-[100%] max-w-[669px]">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 