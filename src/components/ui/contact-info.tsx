import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
    <div className={cn("", className)}>
      <h3 className="text-primary-deepBlue font-semibold mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-dodgerBlue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Image
                src={item.icon || ""}
                alt={item.label}
                width={12}
                height={12}
                className="filter brightness-0 invert"
              />
            </div>
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