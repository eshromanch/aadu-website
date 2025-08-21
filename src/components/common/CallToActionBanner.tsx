"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { cn } from "@/lib/utils"

interface CallToActionBannerProps {
  title: string
  className?: string
}

export function CallToActionBanner({ title, className }: CallToActionBannerProps) {
  return (
    <section className={cn("bg-primary-deepBlue py-16 lg:py-24", className)}>
      <SectionContainer>
        {/* Centered White Card */}
        <div className="bg-neutral-offWhiteBlue rounded-[25px] p-8 lg:p-12 max-w-[1200px] mx-auto">
          <div className="text-center space-y-4">
            {/* First Line */}
            <div className="text-[28px] lg:text-[40px] font-dm-sans font-normal leading-[120%] text-primary-deepBlue">
              Get your desired degree delivered in just
            </div>
            
            {/* Second Line with FedEx Logo */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
              <div className="text-[28px] lg:text-[40px] font-dm-sans font-bold leading-[120%] text-primary-deepBlue">
                45 days, with FREE shipping via
              </div>
              <div className="text-[28px] lg:text-[40px] font-bold leading-[120%]">
                <span className="text-[#4d148c]">Fed</span>
                <span className="text-[#ff6600]">Ex</span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
} 