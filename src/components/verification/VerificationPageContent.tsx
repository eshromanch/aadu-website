"use client"

import { useState } from "react"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { PageHero } from "@/components/common/PageHero"
import { VerificationService } from "@/components/verification/VerificationService"
import { CertificationSummary } from "@/components/verification/CertificationSummary"
import { verificationHeroData, type StudentInfo } from "@/data/verificationData"
import { SectionContainer } from "@/components/common/SectionContainer"

export function VerificationPageContent() {
  const [searchResults, setSearchResults] = useState<StudentInfo[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setSearchError("")
      return
    }

    setIsSearching(true)
    setSearchError("")
    
    try {
      const response = await fetch(`/api/verification?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      if (response.ok) {
        setSearchResults(data.data || [])
        if (data.count === 0) {
          setSearchError("No students found with the provided search criteria.")
        }
      } else {
        setSearchResults([])
        setSearchError(data.message || "Search failed. Please try again.")
      }
    } catch {
      setSearchResults([])
      setSearchError("Network error. Please check your connection and try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionContainer className="py-8 lg:py-16">
        <PageHero
          title={verificationHeroData.title}
          backgroundImage={verificationHeroData.backgroundImage}
        />
      </SectionContainer>

      {/* Verification Service Section */}
      <VerificationService onSearch={handleSearch} isSearching={isSearching} />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="py-16 lg:py-24 bg-neutral-offWhiteBlue">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-primary-deepBlue mb-8 text-center">
                Search Results ({searchResults.length} found)
              </h2>
              <div className="space-y-6">
                {searchResults.map((student, index) => (
                  <CertificationSummary key={index} studentInfo={student} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {searchError && (
        <div className="py-16 lg:py-24 bg-neutral-offWhiteBlue">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  No Results Found
                </h3>
                <p className="text-red-600 mb-4">{searchError}</p>
                <p className="text-sm text-red-500">
                  Try searching by:
                </p>
                <ul className="text-sm text-red-500 mt-2 space-y-1">
                  <li>• Student&apos;s full name</li>
                  <li>• Email address</li>
                  <li>• Phone number</li>
                  <li>• Major/Subject</li>
                  <li>• Degree program</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
}

