import { BigHero } from "@/components/common/BigHero"
import { CardWithImage } from "@/components/common/CardWithImage"
import { EvaluationBodySection } from "@/components/academics/EvaluationBodySection"
import { academicsHeroData } from "@/data/heroData"
import { degreeProgramData, availableMajorsData } from "@/data/academicsData"

export default function AcademicsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BigHero
        title={academicsHeroData.title}
        backgroundImage={academicsHeroData.backgroundImage}
      />
      
      {/* Degree Program Section */}
      <CardWithImage
        title={degreeProgramData.title}
        description={degreeProgramData.description}
        buttonText={degreeProgramData.buttonText}
        variant="dark"
        image={degreeProgramData.image}
        imageAlt={degreeProgramData.imageAlt}
      />
      
      {/* Available Majors Section */}
      <CardWithImage
        title={availableMajorsData.title}
        description={availableMajorsData.description}
        buttonText={availableMajorsData.buttonText}
        variant="light"
        image={availableMajorsData.image}
        imageAlt={availableMajorsData.imageAlt}
      />
      
      {/* Evaluation Body Section */}
      <EvaluationBodySection />
    </div>
  )
} 