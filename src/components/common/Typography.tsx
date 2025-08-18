import { cn } from "@/lib/utils"
import { ElementType, HTMLAttributes } from "react"

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: ElementType
}

// Mobile-first responsive typography components using Tailwind utilities
export function H1({ children, className, as: Component = "h1", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[35px] lg:text-[85px] font-dm-sans font-normal leading-[100%]", className)} {...props}>
      {children}
    </Component>
  )
}

export function H2({ children, className, as: Component = "h2", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[28px] lg:text-[50px] font-dm-sans font-normal leading-[100%]", className)} {...props}>
      {children}
    </Component>
  )
}

export function H2Semibold({ children, className, as: Component = "h2", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[28px] lg:text-[50px] font-dm-sans font-semibold leading-[100%]", className)} {...props}>
      {children}
    </Component>
  )
}

export function H3({ children, className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[24px] lg:text-[40px] font-dm-sans font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function H3Medium({ children, className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[24px] lg:text-[40px] font-dm-sans font-medium", className)} {...props}>
      {children}
    </Component>
  )
}

export function H3Semibold({ children, className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[24px] lg:text-[40px] font-dm-sans font-semibold", className)} {...props}>
      {children}
    </Component>
  )
}

export function H4Semibold({ children, className, as: Component = "h4", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[20px] lg:text-[30px] font-dm-sans font-semibold", className)} {...props}>
      {children}
    </Component>
  )
}

// Body Text Components (consistent across all screen sizes)
export function Body28({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[28px] font-poppins font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body24({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[24px] font-poppins font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body24Semibold({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[24px] font-poppins font-semibold", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body20({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[20px] font-poppins font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body20Semibold({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[20px] font-dm-sans font-semibold", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body16({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[16px] font-poppins font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body16Medium({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[16px] font-poppins font-medium", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body14({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[14px] font-poppins font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body14Medium({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[14px] font-poppins font-medium", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body12({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[12px] font-poppins font-normal", className)} {...props}>
      {children}
    </Component>
  )
}

export function Body12Medium({ children, className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component className={cn("text-[12px] font-poppins font-medium", className)} {...props}>
      {children}
    </Component>
  )
}

// Alternative: Text component with variant prop (more flexible approach)
type TextVariant = 
  | "h1" | "h2" | "h2-semibold" | "h3" | "h3-medium" | "h3-semibold" | "h4-semibold"
  | "body-28" | "body-24" | "body-24-semibold" | "body-20" | "body-20-semibold"
  | "body-16" | "body-16-medium" | "body-14" | "body-14-medium" 
  | "body-12" | "body-12-medium"

interface TextProps extends TypographyProps {
  variant: TextVariant
}

export function Text({ children, className, variant, as, ...props }: TextProps) {
  const defaultElement = variant.startsWith("h") ? variant.split("-")[0] as ElementType : "p"
  const Component = as || defaultElement
  
  return (
    <Component className={cn(`text-${variant}`, className)} {...props}>
      {children}
    </Component>
  )
}