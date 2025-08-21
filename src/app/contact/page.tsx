"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body20, Body16 } from "@/components/common/Typography"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { Button } from "@/components/ui/button"
import { BigHero } from "@/components/common/BigHero"
import { PageHero } from "@/components/common/PageHero"
import { contactInfo } from "@/data/lifeExperienceData"
import Image from "next/image"

interface ContactFormData {
  fullName: string
  phoneNumber: string
  emailAddress: string
  inquirySubject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    inquirySubject: "",
    message: ""
  })

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionContainer className="py-16 lg:py-24">
        <PageHero
          title="Contact us"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </SectionContainer>

      {/* Contact Form Section */}
      <SectionContainer className="py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-offWhiteBlue rounded-[25px] p-8 lg:p-12 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.inquirySubject}
                    onChange={(e) => handleInputChange('inquirySubject', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                  >
                    <option value="">Select inquiry subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Degree Programs">Degree Programs</option>
                    <option value="Application Process">Application Process</option>
                    <option value="Verification Services">Verification Services</option>
                    <option value="Partnership Programs">Partnership Programs</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Tell us about your interest
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent h-32 resize-none"
                    placeholder="Please describe your inquiry or interest..."
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button type="submit" size="lg" className="px-8 py-4 text-lg">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <H2 className="text-primary-deepBlue mb-6">Let's talk with us</H2>
            <Body20 className="text-neutral-bodyText mb-12">
              Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
            </Body20>
            
            <div className="space-y-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="space-y-4">
                  <H3 className="text-primary-deepBlue text-lg font-semibold">{contact.country}</H3>
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
        </div>
      </SectionContainer>
    </div>
  )
} 