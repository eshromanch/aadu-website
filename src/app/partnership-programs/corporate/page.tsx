"use client"

import { BigHero } from "@/components/common/BigHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body20, Body16, H2Semibold } from "@/components/common/Typography"
import { HowItWorksSection } from "@/components/degree-programs/HowItWorksSection"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { corporatePartnershipData } from "@/data/corporatePartnershipData"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Truck, Globe, GraduationCap } from "lucide-react"
import { FeaturesSection } from "@/components/degree-programs/FeaturesSection"
import { CallToActionSection } from "@/components/home/CallToActionSection"
import { PageHero } from "@/components/common/PageHero"
export default function CorporatePartnershipPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
     <SectionContainer className="py-8 lg:py-16"> 
        <PageHero
        title="Corporate Partnership Program"
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      </SectionContainer>
      <div className="w-full bg-primary-deepBlue">
    <SectionContainer className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          <H2Semibold className="text-white mb-6">
          About the Program
          </H2Semibold>
          <Body20 className="text-white leading-relaxed">
          AADU partners with corporations willing to invest in their employees' overall career growth—boosting productivity and organizational success. Updated with the latest industry trends, the program lets employees choose majors tailored to business needs, adding value to both personal and professional development.
          </Body20>
        </div>
        
        {/* Right - Image */}
        <div>
          <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
              alt="Professional woman in academic setting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
    </div>

      {/* Features Section */}
      <SectionContainer className="">
        <FeaturesSection />
        </SectionContainer>
      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Partner Advantages Section */}
      <SectionContainer className="py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Content */}
          <div className="space-y-8">
            <H2 className="text-primary-deepBlue">
              Partner Advantages
            </H2>
            <div className="space-y-6">
              <Body20 className="text-neutral-bodyText leading-relaxed">
                {corporatePartnershipData.partnerAdvantages.intro}
              </Body20>
              
              {corporatePartnershipData.partnerAdvantages.advantages.map((advantage, index) => (
                <div key={index} className="space-y-3">
                  <H3 className="text-primary-deepBlue">
                    {advantage.title}
                  </H3>
                  <Body16 className="text-neutral-bodyText leading-relaxed">
                    {advantage.description}
                  </Body16>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-[20px] overflow-hidden">
            <Image
              src={corporatePartnershipData.partnerAdvantagesImage}
              alt="Man working at desk with laptop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionContainer>

      {/* Call to Action Banner */}
      <CallToActionSection />
    </div>
  )
} 