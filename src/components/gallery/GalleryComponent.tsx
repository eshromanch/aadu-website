"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { galleryImages } from "@/data/galleryData"
import Image from "next/image"
import { Body20, H2 } from "../common/Typography"

export function GalleryComponent() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <SectionContainer className="py-8 lg:py-16">
        <div className="text-center mb-12">
            <H2 className="text-primary-deepBlue mb-4">Gallery</H2>
            <Body20 className="text-neutral-bodyText max-w-3xl mx-auto">
                Explore our university through images showcasing our programs, facilities, and achievements.
            </Body20>
        </div>
      <div className="max-w-7xl mx-auto">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute  bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Image Preview */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6">
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={galleryImages.find(img => img.id === selectedImage)?.src || ""}
                    alt={galleryImages.find(img => img.id === selectedImage)?.alt || ""}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-primary-deepBlue">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  )
}
