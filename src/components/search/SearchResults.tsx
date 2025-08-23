"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body16 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { SearchResult, SearchCategory } from "@/data/searchData"
import { ArrowRight, BookOpen, GraduationCap, FileText, Users, Settings } from "lucide-react"
import Link from "next/link"

interface SearchResultsProps {
  results: SearchResult[]
  query: string
}

const categoryIcons = {
  "degree-programs": GraduationCap,
  "majors": BookOpen,
  "pages": FileText,
  "services": Settings,
  "about": Users
}

const categoryLabels = {
  "degree-programs": "Degree Programs",
  "majors": "Majors & Fields of Study",
  "pages": "Pages",
  "services": "Services",
  "about": "About"
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory | "all">("all")

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = []
    }
    acc[result.category].push(result)
    return acc
  }, {} as Record<SearchCategory, SearchResult[]>)

  // Get filtered results
  const filteredResults = selectedCategory === "all" 
    ? results 
    : groupedResults[selectedCategory] || []

  // Get category counts
  const categoryCounts = Object.keys(groupedResults).reduce((acc, category) => {
    acc[category as SearchCategory] = groupedResults[category as SearchCategory].length
    return acc
  }, {} as Record<SearchCategory, number>)

  if (results.length === 0) {
    return (
      <SectionContainer className="py-8 lg:py-16">
        <div className="text-center">
          <H2 className="text-primary-deepBlue mb-4">No results found</H2>
          <Body16 className="text-neutral-bodyText mb-8">
            We couldn't find any results for "{query}". Try searching with different keywords.
          </Body16>
          <div className="space-y-4">
            <p className="text-sm text-neutral-bodyText">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Degree Programs", "Majors", "Apply", "Contact", "About"].map((suggestion) => (
                <Link key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`}>
                  <Button variant="outline" size="sm">
                    {suggestion}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer className="py-8 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Search Summary */}
        <div className="mb-8">
          <H2 className="text-primary-deepBlue mb-2">
            Search Results for "{query}"
          </H2>
          <Body16 className="text-neutral-bodyText">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </Body16>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All ({results.length})
            </Button>
            {Object.entries(categoryCounts).map(([category, count]) => {
              const Icon = categoryIcons[category as SearchCategory]
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category as SearchCategory)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {categoryLabels[category as SearchCategory]} ({count})
                </Button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {filteredResults.map((result) => {
            const Icon = categoryIcons[result.category]
            return (
              <div
                key={result.id}
                className="bg-white border border-neutral-lightGray rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-dodgerBlue rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <H3 className="text-primary-deepBlue mb-2">
                          <Link href={result.url} className="hover:underline">
                            {result.title}
                          </Link>
                        </H3>
                        <Body16 className="text-neutral-bodyText mb-3">
                          {result.description}
                        </Body16>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-neutral-offWhiteBlue text-primary-deepBlue text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Category Badge */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-bodyText">
                            Category: {categoryLabels[result.category]}
                          </span>
                        </div>
                      </div>
                      
                      <Link href={result.url}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          View
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No results for selected category */}
        {filteredResults.length === 0 && selectedCategory !== "all" && (
          <div className="text-center py-12">
            <H3 className="text-primary-deepBlue mb-2">No results in this category</H3>
            <Body16 className="text-neutral-bodyText mb-4">
              Try selecting a different category or search with different keywords.
            </Body16>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("all")}
            >
              View All Results
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  )
} 