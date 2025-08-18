"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H3, Body16, Body14 } from "@/components/common/Typography"
import { footerData } from "@/data/footerData"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-neutral-offWhiteBlue border-t border-neutral-lightGray">
      <SectionContainer className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full border-2 border-primary-deepBlue flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-body-12 font-dm-sans font-semibold text-primary-deepBlue leading-tight">
                  ASIAN AMERICAN<br />
                  DIGITAL<br />
                  UNIVERSITY
                </div>
              </div>
            </div>
            <Body14 className="text-neutral-bodyText">
              {footerData.description}
            </Body14>
          </div>

          {/* Footer Sections */}
          {footerData.sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <H3 className="text-primary-deepBlue">{section.title}</H3>
              <div className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex}
                    href={link.href} 
                    className="block Body14 text-neutral-bodyText hover:text-primary-deepBlue transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </footer>
  )
} 