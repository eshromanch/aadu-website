import * as React from "react"
import { cn } from "@/lib/utils"

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary"
  padding?: "sm" | "md" | "lg"
  className?: string
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  ({ variant = "default", padding = "md", className, ...props }, ref) => {
    const variantClasses = {
      default: "bg-white border border-neutral-lightGray",
      primary: "bg-primary-deepBlue text-white",
      secondary: "bg-neutral-babyBlueTint"
    }

    const paddingClasses = {
      sm: "p-4",
      md: "p-6 lg:p-8",
      lg: "p-8 lg:p-12"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg shadow-sm",
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      />
    )
  }
)
ContentCard.displayName = "ContentCard"

export { ContentCard } 