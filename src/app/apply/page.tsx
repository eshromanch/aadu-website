import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { PageHero } from "@/components/common/PageHero"
import { ApplicationForm } from "@/components/apply/ApplicationForm"
import { applyHeroData } from "@/data/applyData"
import { Suspense } from "react"

export default function ApplyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title={applyHeroData.title}
        backgroundImage={applyHeroData.backgroundImage}
        className="container mx-auto py-16 lg:py-24"
      />

      {/* Application Form Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationForm />
      </Suspense>

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
} 