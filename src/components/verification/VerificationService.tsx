"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { Body20 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"

interface VerificationServiceProps {
  onSearch: (query: string) => void
  isSearching: boolean
}

export function VerificationService({ onSearch, isSearching }: VerificationServiceProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    onSearch(searchQuery)
  }

  return (
    <SectionContainer className="py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Text and Search Form */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Body20 className="text-neutral-bodyText leading-relaxed">
              Verify the authenticity of AADU degrees and certificates. Our verification service allows employers, institutions, and individuals to confirm student credentials and application status.
            </Body20>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              <strong>Primary Search Method:</strong> Enter the student ID number for quick and accurate verification. You can also search by student name, email address, phone number, major subject, or degree program.
            </Body20>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              All verification results include the student&apos;s current application status and degree information.
            </Body20>
          </div>

          {/* Search Form */}
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-bodyText w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Student ID (e.g., 1000001) or search by name, email, etc..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                />
              </div>
              <Button 
                type="submit" 
                className="px-6 py-3 bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  'Search'
                )}
              </Button>
            </form>
            <div className="text-sm text-neutral-bodyText space-y-1">
              <p className="font-semibold text-primary-deepBlue">Search Methods:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Student ID</strong> (recommended): Enter the 7-digit student ID number</li>
                <li>• Full name (e.g., &quot;John Smith&quot;)</li>
                <li>• Email address (e.g., &quot;john@example.com&quot;)</li>
                <li>• Phone number</li>
                <li>• Major subject (e.g., &quot;Computer Science&quot;)</li>
                <li>• Degree program (e.g., &quot;Bachelor&apos;s Degree&quot;)</li>
              </ul>
            </div>
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
  )
} 