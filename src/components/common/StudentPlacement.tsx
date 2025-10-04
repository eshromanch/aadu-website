"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20 } from "@/components/common/Typography"
import Image from "next/image"

interface PlacementCompany {
  id: number
  name: string
  logo: string
  alt: string
}

const placementCompanies: PlacementCompany[] = [
  {
    id: 1,
    name: "Global Tech Solutions",
    logo: "/images/trademark 2.jpg",
    alt: "Global Tech Solutions Company Logo"
  },
  {
    id: 2,
    name: "International Business Corp",
    logo: "/images/trademark1.png", // Using Partner Advantages image as second trademark
    alt: "International Business Corp Company Logo"
  }
]

export function StudentPlacement() {
  return (
    <SectionContainer className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <H2 className="text-primary-deepBlue mb-4">Our Students Are Placed At</H2>
          <Body20 className="text-neutral-bodyText max-w-3xl mx-auto">
            Our graduates have successfully secured positions at leading companies worldwide, 
            demonstrating the value and recognition of our degree programs in the professional market.
          </Body20>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {placementCompanies.map((company) => (
            <div key={company.id} className="group">
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 text-center hover:shadow-lg transition-all duration-300 hover:bg-gray-100">
                {/* Company Logo */}
                <div className="mb-6">
                  <div className="relative w-full h-full mx-auto mb-4">
                    <Image
                      src={company.logo}
                      alt={company.alt}
                      width={800}
                      height={800}
                      className="object-contain rounded-xl w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Company Name */}
                {/* <h3 className="text-xl font-semibold text-primary-deepBlue mb-2">
                  {company.name}
                </h3> */}
                
                {/* Success Message */}
                <p className="text-sm text-neutral-bodyText">
                  Our graduates are making their mark at this prestigious organization
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-primary-dodgerBlue/5 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-primary-deepBlue mb-3">
              Join Our Success Stories
            </h3>
            <Body20 className="text-neutral-bodyText">
              With our accredited degree programs and comprehensive support, 
              you too can achieve your career goals and join our network of successful graduates.
            </Body20>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
