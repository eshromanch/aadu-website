import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ContentCardProps {
  title: string
  description: string
  buttonText: string
  variant: "dark" | "light"
  image: string
  imageAlt: string
  className?: string
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  ({ title, description, buttonText, variant, image, imageAlt, className, ...props }, ref) => {
    const variantClasses = {
      dark: "bg-primary-deepBlue",
      light: "bg-neutral-offWhiteBlue"
    }

    const textClasses = {
      dark: "text-white",
      light: "text-primary-deepBlue"
    }

    const descriptionClasses = {
      dark: "text-neutral-lightGray",
      light: "text-neutral-bodyText"
    }

    const buttonClasses = {
      dark: "secondary", // White background, dark text
      light: "default" // Dark background, white text
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-[534px] lg:h-[330px] rounded-[25px] overflow-hidden relative",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Image on the left */}
        <div className="absolute left-0 top-0 w-full lg:w-[446px] h-[254px] lg:h-full lg:top-0 lg:bottom-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
          />
          {/* Dark overlay on image */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* Content on the right */}
        <div className="absolute left-0 lg:left-[446px] top-[280px] lg:top-0 w-full lg:w-[calc(100%-446px)] h-[254px] lg:h-full p-6 lg:p-12 flex flex-col justify-between">
          <div className="space-y-4 lg:space-y-6">
            <h3 className={cn(
              "text-[28px] lg:text-[40px] font-dm-sans font-medium leading-[100%] lg:leading-[52px]",
              textClasses[variant]
            )}>
              {title}
            </h3>
            <p className={cn(
              "text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-justify",
              descriptionClasses[variant]
            )}>
              {description}
            </p>
          </div>
          
          {/* Button positioned at bottom right */}
          <div className="flex justify-end">
            <Button 
              variant={buttonClasses[variant] as "default" | "secondary"} 
              size="sm"
              className={cn(
                "w-[137px] lg:w-[190px] h-[40px] lg:h-[64px] text-[14px] lg:text-[18px] font-medium",
                variant === "dark" && "bg-neutral-offWhiteBlue hover:bg-neutral-lightGray"
              )}
            >
              {buttonText}
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={20}
                height={20}
                className="lg:w-6 lg:h-6"
              />
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
ContentCard.displayName = "ContentCard"

export { ContentCard } 