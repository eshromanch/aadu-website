"use client"

import { useSearchParams } from "next/navigation"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, Body16 } from "@/components/common/Typography"
import { SearchResults } from "@/components/search/SearchResults"
import { SearchHero } from "@/components/common/SearchHero"
import { searchContent } from "@/data/searchData"
import Link from "next/link"

export function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  if (!query) {
    return (
      <div className="min-h-screen">
        <SectionContainer className="py-8 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <H2 className="text-primary-deepBlue mb-8">
              What would you like to search for?
            </H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Degree Programs",
                  description: "Bachelor's, Master's, Doctorate, and more",
                  searchTerm: "Degree Programs",
                  href: "/search?q=Degree%20Programs"
                },
                {
                  title: "Majors & Fields",
                  description: "Business, Computer Science, Engineering, etc.",
                  searchTerm: "Majors",
                  href: "/search?q=Majors"
                },
                {
                  title: "Services",
                  description: "Verification, partnerships, and support",
                  searchTerm: "Services",
                  href: "/search?q=Services"
                },
                {
                  title: "Application",
                  description: "Apply for your degree program",
                  searchTerm: "Apply",
                  href: "/search?q=Apply"
                },
                {
                  title: "Contact",
                  description: "Get in touch with our team",
                  searchTerm: "Contact",
                  href: "/search?q=Contact"
                },
                {
                  title: "About AADU",
                  description: "Learn about our mission and values",
                  searchTerm: "About",
                  href: "/search?q=About"
                }
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="p-6 bg-white border border-neutral-lightGray rounded-lg hover:shadow-md transition-shadow text-left block"
                >
                  <h3 className="text-lg font-semibold text-primary-deepBlue mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-bodyText">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    )
  }

  const results = searchContent(query)

  return (
    <div className="min-h-screen">
      <SearchHero onSearch={() => {}} />
      <SearchResults query={query} results={results} />
    </div>
  )
}
