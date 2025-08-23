
import { PageHero } from "@/components/common/PageHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body20, Body16, Body16Medium } from "@/components/common/Typography"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { 
  whatAreLifeExperienceDegrees, 
  whatCountsAsLifeExperience, 
  aboutAADULifeExperienceDegrees, 
  certifications, 
  keyBenefits, 
  contactInfo 
} from "@/data/lifeExperienceData"
import Image from "next/image"
import { TalkWithUs } from "@/components/about/TalkWithUs"

export default function LifeExperiencePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      <SectionContainer className="py-8 lg:py-16">
        
        <PageHero
          title="Life Experience Degrees"
          subtitle="Turn your work experience into an accredited qualification"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </SectionContainer>
  

      {/* What Are Life Experience Degrees Section */}
      <SectionContainer className="py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Content */}
          <div className="space-y-8">
            <H2 className="text-primary-deepBlue">
              <span className="text-neutral-bodyText">What Are </span>
              Life Experience Degrees?
            </H2>
            <div className="space-y-6">
              {whatAreLifeExperienceDegrees.paragraphs.map((paragraph, index) => (
                <Body20 key={index} className="text-neutral-bodyText leading-relaxed">
                  {paragraph}
                </Body20>
              ))}
            </div>
          </div>
          
          {/* Right - Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-[20px] overflow-hidden">
            <Image
              src={whatAreLifeExperienceDegrees.image}
              alt={whatAreLifeExperienceDegrees.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionContainer>

      {/* What Counts as Life Experience Section */}
      <SectionContainer className="py-8 lg:py-16">
        <div className="">
          <H2 className="text-primary-deepBlue mb-12 ">
            <span className="text-neutral-bodyText">What Counts as </span>
            Life Experience?
          </H2>
          
          <div className="relative rounded-[25px] p-8 lg:p-12 shadow-lg ">
            <Image className="absolute top-0 left-0 w-full h-full object-cover" src={'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt={''} fill />
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-babyBlueTint opacity-80 backdrop-blur-lg"></div>
            <div className="relative flex flex-col gap-4 z-10">
              {whatCountsAsLifeExperience.map((item) => (
                <div key={item.id} className="p-4  border-b-1 border-neutral-lightGray">
                  <Body16Medium className="text-center text-primary-deepBlue font-medium ">
                    {item.text}
                  </Body16Medium>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* About AADU Life Experience Degrees Section */}
      <SectionContainer className="py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Content */}
          <div className="space-y-8">
            <H2 className="text-primary-deepBlue">
              <span className="text-neutral-bodyText">About </span>
              AADU Life Experience Degrees
            </H2>
            <div className="space-y-6">
              {aboutAADULifeExperienceDegrees.paragraphs.map((paragraph, index) => (
                <Body20 key={index} className="text-neutral-bodyText leading-relaxed">
                  {paragraph}
                </Body20>
              ))}
            </div>
          </div>
          
          {/* Right - List of Certifications */}
          <div className="bg-neutral-offWhiteBlue rounded-[25px] p-8 lg:p-12 shadow-lg border border-neutral-lightGray">
            <div className="text-center space-y-8">
              <H3 className="text-neutral-bodyText">
                List of Certifications
              </H3>
              <div className="text-[20px] font-dm-sans font-semibold text-primary-deepBlue">
                (Bachelor's Degree)
              </div>
              
              <div className="space-y-4 text-left">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-4">
                    <Image 
                      src={cert.icon} 
                      alt={cert.name} 
                      width={24} 
                      height={24}
                      className="flex-shrink-0"
                    />
                    <Body16 className="text-neutral-bodyText">
                      {cert.count} {cert.name}
                    </Body16>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-neutral-lightGray">
                <Body20 className="text-neutral-bodyText font-semibold">
                  Total Number of Certificates - 10
                </Body20>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Key Benefits Section */}
      <SectionContainer className="py-16 lg:py-24 ">
        <div className="">
          <H2 className=" mb-12 ">
            Key Benefits
          </H2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
            {keyBenefits.map((benefit) => (
              <div key={benefit.id} className="bg-primary-deepBlue  p-6 text-center">
                <Body16 className="text-white font-semibold">
                  {benefit.title}
                </Body16>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

        <TalkWithUs/>

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
} 