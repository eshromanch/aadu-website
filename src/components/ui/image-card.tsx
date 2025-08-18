import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  aspectRatio?: "square" | "video" | "wide"
  className?: string
  imageClassName?: string
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ src, alt, aspectRatio = "square", className, imageClassName, ...props }, ref) => {
    const aspectRatioClasses = {
      square: "aspect-square",
      video: "aspect-video",
      wide: "aspect-[16/9]"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg",
          aspectRatioClasses[aspectRatio],
          className
        )}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", imageClassName)}
        />
      </div>
    )
  }
)
ImageCard.displayName = "ImageCard"

export { ImageCard } 