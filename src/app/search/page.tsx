import { Suspense } from "react"
import { SearchPageContent } from "@/components/search/SearchPageContent"

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-offWhiteBlue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-deepBlue mx-auto mb-4"></div>
          <p className="text-neutral-bodyText">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
} 