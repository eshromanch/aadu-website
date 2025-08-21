"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body20, Body16 } from "@/components/common/Typography"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/common/PageHero"
import Image from "next/image"

interface StudentInfo {
  name: string
  registrationNo: string
  email: string
  session: string
  majorSubject: string
  gender: string
  institute: string
  dateOfBirth: string
  certificateNo: string
}

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StudentInfo | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock student data - in real app this would come from API
  const mockStudentData: StudentInfo = {
    name: "Safikur Rahman",
    registrationNo: "14568423446",
    email: "safikurrahman@gmail.com",
    session: "2025",
    majorSubject: "Administration of justice",
    gender: "Male",
    institute: "AADU",
    dateOfBirth: "25/4/1998",
    certificateNo: "18564985421"
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock search - in real app this would be an API call
      if (searchQuery.toLowerCase().includes("14568423446")) {
        setSearchResults(mockStudentData)
      } else {
        setSearchResults(null)
      }
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionContainer className="py-16 lg:py-24">
        <PageHero
          title="AADU's Education Verification Service"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </SectionContainer>

      {/* Main Content Section */}
      <SectionContainer className="py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text and Search Form */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Body20 className="text-neutral-bodyText leading-relaxed">
                Many employers require verification of academic documents. Unlike others, American University includes four Education Verification Letters with every degree package.
              </Body20>
              <Body20 className="text-neutral-bodyText leading-relaxed">
                These letters confirm the degree holder's details—program, GPA, graduation year—and include a web link for online verification. We can also send them directly to employers or institutions upon request, creating a strong, authentic impression.
              </Body20>
              <Body20 className="text-neutral-bodyText leading-relaxed">
                Additional copies can be ordered anytime through our online form.
              </Body20>
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="flex-1 px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                />
                <Button 
                  type="submit" 
                  className="px-6 py-3 bg-primary-deepBlue hover:bg-primary-deepBlue/90"
                  disabled={isSearching}
                >
                  <Image
                    src="/icons/search-alt_svgrepo.com.svg"
                    alt="Search"
                    width={20}
                    height={20}
                    className="filter brightness-0 invert"
                  />
                </Button>
              </form>
              <p className="text-sm font-semibold text-neutral-bodyText">
                Note: Search by your Student ID
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-[20px] overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Student working at desk"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionContainer>

      {/* Certification Summary Section */}
      {searchResults && (
        <SectionContainer className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[25px] shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-primary-deepBlue px-8 py-6">
                <H3 className="text-white text-center">Certification Summary</H3>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left - Profile Picture */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-neutral-lightGray">
                      <Image
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Student Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Right - Student Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Name of Student:</span>
                        <span className="text-sm font-semibold">{searchResults.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Registration No:</span>
                        <span className="text-sm font-semibold">{searchResults.registrationNo}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Email Address:</span>
                        <span className="text-sm font-semibold">{searchResults.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Session:</span>
                        <span className="text-sm font-semibold">{searchResults.session}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Major Subject:</span>
                        <span className="text-sm font-semibold">{searchResults.majorSubject}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Gender:</span>
                        <span className="text-sm font-semibold">{searchResults.gender}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Name of the institute:</span>
                        <span className="text-sm font-semibold">{searchResults.institute}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                        <span className="text-sm text-neutral-bodyText font-medium">Date of Birth:</span>
                        <span className="text-sm font-semibold">{searchResults.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-neutral-bodyText font-medium">Certificate No:</span>
                        <span className="text-sm font-semibold">{searchResults.certificateNo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      )}

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
} 