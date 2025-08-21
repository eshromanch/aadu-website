"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { ContentCard } from "@/components/ui/content-card"

interface CardWithImageProps {
  title: string
  description: string
  buttonText: string
  variant: "dark" | "light"
  image: string
  imageAlt: string
  className?: string
}

export function CardWithImage({
  title,
  description,
  buttonText,
  variant,
  image,
  imageAlt,
  className
}: CardWithImageProps) {
  return (
    <SectionContainer className="py-16 ">
      <ContentCard
        title={title}
        description={description}
        buttonText={buttonText}
        variant={variant}
        image={image}
        imageAlt={imageAlt}
        className={className}
      />
    </SectionContainer>
  )
} 