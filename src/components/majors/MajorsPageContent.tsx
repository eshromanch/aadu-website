"use client"

import { useState } from "react"
import { PageHero } from "@/components/common/PageHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body16 } from "@/components/common/Typography"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { faculties } from "@/data/majorsData"

export function MajorsPageContent() {
  const [openFaculty, setOpenFaculty] = useState<string | null>("science") // Default open to Faculty of Science

  const toggleFaculty = (facultyId: string) => {
    setOpenFaculty(openFaculty === facultyId ? null : facultyId)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionContainer className="py-8 lg:py-16">
        <PageHero
          title="Available Fields of Study"
          subtitle="Discover the diverse academic disciplines available for your degree"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </SectionContainer>

      {/* Main Content - Faculties and Majors */}
      <SectionContainer className="py-8 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <H2 className="text-primary-deepBlue mb-12 text-center">
            Explore Degree Majors by Faculty
          </H2>
          
          <Accordion>
            {faculties.map((faculty) => (
              <AccordionItem key={faculty.id} value={faculty.id}>
                <AccordionTrigger
                  onClick={() => toggleFaculty(faculty.id)}
                  isOpen={openFaculty === faculty.id}
                  className="text-primary-deepBlue text-[20px] lg:text-[24px]"
                >
                  {faculty.name}
                </AccordionTrigger>
                
                <AccordionContent isOpen={openFaculty === faculty.id}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {faculty.majors.map((major) => (
                      <div
                        key={major.id}
                        className="p-4 bg-neutral-offWhiteBlue rounded-2xl hover:bg-neutral-lightGray transition-colors cursor-pointer"
                      >
                        <Body16 className="text-primary-deepBlue font-medium">
                          {major.name}
                        </Body16>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
}

