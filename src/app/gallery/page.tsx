import { GalleryComponent } from "@/components/gallery/GalleryComponent"
import { PageHero } from "@/components/common/PageHero"
import { SectionContainer } from "@/components/common/SectionContainer"

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionContainer className="py-8 lg:py-16">
        <PageHero
          title="Gallery"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </SectionContainer>

      {/* Gallery Component */}
      <GalleryComponent />
    </div>
  )
}
