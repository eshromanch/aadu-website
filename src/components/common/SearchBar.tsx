"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { getSearchSuggestions } from "@/data/searchData"

interface SearchBarProps {
  placeholder?: string
  className?: string
  variant?: "navbar" | "hero"
  onSearch?: (query: string) => void
  onSearchComplete?: () => void
}

export function SearchBar({ 
  placeholder = "Search", 
  className = "", 
  variant = "navbar",
  onSearch,
  onSearchComplete
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = getSearchSuggestions(query)
      setSuggestions(filtered)
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery)
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
      setIsOpen(false)
      setQuery("")
      // Call onSearchComplete to close the search section
      if (onSearchComplete) {
        onSearchComplete()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
  }

  if (variant === "hero") {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-6 py-4 text-lg bg-white border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent shadow-sm"
            />
            <Button
              type="submit"
              size="lg"
              className="px-8 py-4 bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white"
            >
              <Search className="w-6 h-6" />
            </Button>
          </form>

          {/* Search Suggestions */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-lightGray rounded-2xl shadow-lg z-50">
              <div className="p-4">
                <p className="text-sm text-primary-dodgerBlue mb-2">Search Suggestions:</p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-sm text-neutral-bodyText hover:bg-neutral-offWhiteBlue rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Navbar variant
  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="bg-white w-64 px-4 py-2 text-sm border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent shadow-sm"
        />
        <Button
          type="submit"
          size="sm"
          className="ml-2 px-3 py-2 bg-primary-deepBlue hover:bg-primary-deepBlue/90"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      {/* Search Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-lightGray rounded-2xl shadow-lg z-50">
          <div className="p-3">
            <p className="text-xs text-primary-dodgerBlue mb-2">Search Suggestions:</p>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left px-2 py-1 text-xs text-neutral-bodyText hover:bg-neutral-offWhiteBlue rounded transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 