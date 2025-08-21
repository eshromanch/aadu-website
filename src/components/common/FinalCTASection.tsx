"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { CombinationPackagesDrawer } from "@/components/degree-programs/CombinationPackagesDrawer"

export function FinalCTASection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLearnMoreClick = () => {
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <section className="bg-neutral-babyBlueTint py-16 lg:py-24">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
            {/* Vertical separator line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
            
            {/* Left Column - Apply Now */}
            <div className="text-center lg:text-left space-y-6">
              <H2 className="text-primary-deepBlue leading-tight">
                Looking for a bright new future?
                <br />
                It starts here
              </H2>
              <Button 
                variant="default" 
                size="lg"
                className="bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white px-8 py-4 text-[18px] font-semibold rounded-lg"
              >
                Apply Now
              </Button>
            </div>
            
            {/* Right Column - Learn More */}
            <div className="text-center lg:text-left space-y-6">
              <H2 className="text-primary-deepBlue leading-tight">
                Need multiple degrees?
                <br />
                View our combination packages
              </H2>
              <Button 
                variant="default" 
                size="lg"
                className="bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white px-8 py-4 text-[18px] font-semibold rounded-lg"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Combination Packages Drawer */}
      <CombinationPackagesDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
      />
    </>
  )
} 