"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20, H2Semibold } from "@/components/common/Typography"
import { ContactInfo } from "@/components/ui/contact-info"
import { talkWithUsData } from "@/data/aboutData"

export function TalkWithUs() {
  return (
    <section className="bg-neutral-babyBlueTint py-16">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left - Content */}
          <div className="lg:col-span-1">
            <H2Semibold className="text-primary-deepBlue mb-6">
              {talkWithUsData.title}
            </H2Semibold>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              {talkWithUsData.description}
            </Body20>
          </div>
          
          {/* Right - Branch Information */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {talkWithUsData.branches.map((branch, index) => (
                <ContactInfo
                  key={index}
                  title={branch.title}
                  items={[
                    { 
                      label: "Address", 
                      value: branch.address,
                      icon: "/icons/Location.svg"
                    },
                    { 
                      label: "Phone", 
                      value: branch.phone,
                      icon: "/icons/noun_Phone_3612570 1.svg"
                    },
                    { 
                      label: "Email", 
                      value: branch.email,
                      icon: "/icons/noun_Email_247564 1.svg"
                    }
                  ]}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
} 