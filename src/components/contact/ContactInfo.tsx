import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body20, Body16 } from "@/components/common/Typography"
import { contactInfo } from "@/data/lifeExperienceData"
import Image from "next/image"

export function ContactInfo() {
  return (
    <SectionContainer className="py-8 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <H2 className="text-primary-deepBlue mb-6">Let&apos;s talk with us</H2>
        <Body20 className="text-neutral-bodyText mb-12">
          Questions, comments, or suggestions? Simply fill in the form and we&apos;ll be in touch shortly.
        </Body20>
        
        <div className="space-y-8">
          {contactInfo.map((contact, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-primary-deepBlue text-lg font-semibold">{contact.country}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-dodgerBlue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Image
                      src="/icons/Location.svg"
                      alt="Location"
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <Body16 className="text-neutral-bodyText">
                    {contact.address}
                  </Body16>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-dodgerBlue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Image
                      src="/icons/noun_Phone_3612570 1.svg"
                      alt="Phone"
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <Body16 className="text-neutral-bodyText">
                    {contact.phone}
                  </Body16>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-dodgerBlue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Image
                      src="/icons/noun_Email_247564 1.svg"
                      alt="Email"
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <Body16 className="text-neutral-bodyText">
                    {contact.email}
                  </Body16>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
} 