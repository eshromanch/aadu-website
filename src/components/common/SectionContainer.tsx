import { cn } from "@/lib/utils"
import { ElementType } from "react"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: ElementType
}

export function SectionContainer({ 
  children, 
  className, 
  as: Component = "section" 
}: SectionContainerProps) {
  return (
    <Component className={cn("container mx-auto px-4 lg:px-8", className)}>
      {children}
    </Component>
  )
} 