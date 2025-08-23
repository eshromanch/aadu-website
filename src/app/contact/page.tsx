import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { PageHero } from "@/components/common/PageHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { ContactForm } from "@/components/contact/ContactForm"
import { ContactInfo } from "@/components/contact/ContactInfo"
import { contactHeroData } from "@/data/contactData"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
     <SectionContainer className="py-8 lg:py-16">
     <PageHero
        title={contactHeroData.title}
        backgroundImage={contactHeroData.backgroundImage}
      />

     </SectionContainer>
     <SectionContainer className="py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
       {/* Contact Form Section */}
       <ContactForm />

{/* Contact Info Section */}
<ContactInfo />
     </SectionContainer>

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
} 