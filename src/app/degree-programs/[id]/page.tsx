import { notFound } from "next/navigation"
import { PageHero } from "@/components/common/PageHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body20, Body16, Body16Medium, Body20Semibold, Body24 } from "@/components/common/Typography"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { HowItWorksSection } from "@/components/degree-programs/HowItWorksSection"
import { FeaturesSection } from "@/components/degree-programs/FeaturesSection"
import { FinalCTASection } from "@/components/common/FinalCTASection"
import { individualDegreePrograms, callToActionData } from "@/data/degreeProgramsData"
import Image from "next/image"

interface PageProps {
  params: {
    id: string
  }
}

export default function IndividualDegreeProgramPage({ params }: PageProps) {
  const degreeProgram = individualDegreePrograms.find(program => program.id === params.id)
  
  if (!degreeProgram) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Changed to PageHero (card-style) */}
      <div className="py-16 lg:py-24">
        <PageHero
          title={degreeProgram.title}
          subtitle={degreeProgram.subtitle}
          backgroundImage={degreeProgram.heroImage}
          className="container mx-auto px-8"
        />
      </div>
      
      {/* About the Degree Section */}
      <SectionContainer className="py-16 lg:py-24">
        {/* Left - Content */}
        <div className="space-y-8">
          <H2 className="text-primary-deepBlue">
            About the Degree
          </H2>
          <div className="space-y-6">
            <Body20 className="text-neutral-bodyText leading-relaxed">
              {degreeProgram.aboutTheDegree.paragraph1}
            </Body20>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              {degreeProgram.aboutTheDegree.paragraph2}
            </Body20>
          </div>
        </div>
      </SectionContainer>
      
      {/* Eligibility Criteria Section */}
      <SectionContainer className="py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Image */}
          <div className="relative w-full h-full rounded-[20px] overflow-hidden flex items-center justify-center">
            <Image
              src={degreeProgram.eligibilityImage}
              alt={degreeProgram.eligibilityImageAlt}
              fill
              className="object-cover w-[300px] lg:h-[500px]"
            />
          </div>
          
          {/* Right - Content */}
          <div className="space-y-8">
            <H2 className="text-primary-deepBlue">
              Eligibility Criteria
            </H2>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              {degreeProgram.eligibilityCriteria.intro}
            </Body20>
            <ul className="space-y-4">
              {degreeProgram.eligibilityCriteria.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary-deepBlue rounded-full mt-2 flex-shrink-0" />
                  <Body20 className="text-neutral-bodyText leading-relaxed">
                    {requirement}
                  </Body20>
                </li>
              ))}
            </ul>
            <Body20 className="text-neutral-bodyText leading-relaxed">
              {degreeProgram.eligibilityCriteria.conclusion}
            </Body20>
          </div>
        </div>
      </SectionContainer>
      
      {/* List of Certifications Section - Fixed styling */}
      <SectionContainer className="py-16 lg:py-24">
        {/* How It Works Section */}
        <HowItWorksSection />
      </SectionContainer>

      {/* Two-column layout: Certifications Card + FedEx CTA */}
      <div className="bg-primary-deepBlue">
        <SectionContainer className="py-16 lg:py-24">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Certifications Card */}
          <div className="bg-white rounded-[25px] p-8 lg:p-12 shadow-lg">
            <div className="text-center space-y-8">
              <H3 className="text-neutral-bodyText">
                List of Certifications
              </H3>
              <Body20Semibold className="text-neutral-bodyText">
                ({degreeProgram.title})
              </Body20Semibold>
              
              {/* Certificates List with Icons */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4">
                  <Image src="/icons/graduation-cap 1.svg" alt="Degree" width={24} height={24} />
                  <Body16 className="text-neutral-bodyText">1 Original Accredited Degree</Body16>
                </div>
                <div className="flex items-center gap-4">
                  <Image src="/icons/transcript (1) 1.svg" alt="Transcript" width={24} height={24} />
                  <Body16 className="text-neutral-bodyText">2 Original Transcripts</Body16>
                </div>
                <div className="flex items-center gap-4">
                  <Image src="/icons/Badge.svg" alt="Award" width={24} height={24} />
                  <Body16 className="text-neutral-bodyText">1 Award of Excellence</Body16>
                </div>
                <div className="flex items-center gap-4">
                  <Image src="/icons/certificate 1.svg" alt="Certificate" width={24} height={24} />
                  <Body16 className="text-neutral-bodyText">1 Certificate of Distinction</Body16>
                </div>
                <div className="flex items-center gap-4">
                  <Image src="/icons/crown.svg" alt="Membership" width={24} height={24} />
                  <Body16 className="text-neutral-bodyText">1 Certificate of Membership</Body16>
                </div>
                <div className="flex items-center gap-4">
                  <Image src="/icons/Verifications.svg" alt="Verification" width={24} height={24} />
                  <Body16 className="text-neutral-bodyText">4 Education Verification Letters</Body16>
                </div>
              </div>
              
              {/* Total and Price */}
              <div className="space-y-4 pt-6 border-t border-neutral-lightGray">
                <Body20Semibold className="text-neutral-bodyText">
                  Total Number of Certificates - 10
                </Body20Semibold>
                <div className="bg-primary-deepBlue text-white text-[20px] lg:text-[24px] font-dm-sans font-bold py-4 px-8 rounded-[15px] inline-block">
                  Price - {degreeProgram.price}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - FedEx CTA Text */}
          <div className="text-white space-y-4">

            <H3 className="text-white font-bold">
            Get your desired
            degree delivered in just
              45 days, with FREE
              shipping via
            </H3>

            <div className="text-[32px] lg:text-[40px] font-dm-sans font-bold">
              <span className="text-[#4d148c]">Fed</span>
              <span className="text-[#ff6600]">Ex</span>
            </div>
          </div>
        </div>
        </SectionContainer>
      </div>
        <SectionContainer className="py-16 lg:py-24">
        <FeaturesSection />
        </SectionContainer>
        <FinalCTASection />
    </div>
  )
} 