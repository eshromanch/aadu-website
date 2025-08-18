import { PageHero } from "@/components/common/PageHero"
import { academicsHeroData } from "@/data/heroData"

export default function AcademicsPage() {
  return (
    <div className="min-h-screen">
      <div className="py-16 lg:py-24">
        <PageHero
          title={academicsHeroData.title}
          subtitle={academicsHeroData.subtitle}
          backgroundImage={academicsHeroData.backgroundImage}
          className="container mx-auto px-8"
        />
      </div>
      
      {/* Add other academics page content here */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold text-primary-deepBlue mb-8">
          Our Academic Programs
        </h2>
        <p className="text-neutral-bodyText">
          Content for academics page will go here...
        </p>
      </div>
    </div>
  )
} 