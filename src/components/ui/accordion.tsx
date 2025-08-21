"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  children: React.ReactNode
  className?: string
  defaultOpen?: string
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  isOpen?: boolean
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, className, defaultOpen, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  )
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border border-neutral-lightGray rounded-lg", className)} {...props}>
      {children}
    </div>
  )
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, onClick, isOpen, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between p-6 text-left font-semibold transition-all hover:bg-neutral-offWhiteBlue",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, isOpen, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
      {...props}
    >
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } 