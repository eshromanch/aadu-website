import * as React from "react"
import { cn } from "@/lib/utils"

interface ContactItem {
  label: string
  value: string
  icon?: string
}

interface ContactInfoProps {
  title: string
  items: ContactItem[]
  className?: string
}

export function ContactInfo({ title, items, className }: ContactInfoProps) {
  return (
    <div className={cn("bg-white p-6 rounded-lg", className)}>
      <h3 className="text-primary-deepBlue font-semibold mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-primary-deepBlue rounded-full mt-1 flex-shrink-0" />
            <div>
              <span className="text-sm text-neutral-bodyText">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 