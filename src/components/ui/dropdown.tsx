"use client"

import * as React from "react"
import { ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavItem } from "@/data/navData"

interface DropdownProps {
  item: NavItem
  className?: string
}

export function Dropdown({ item, className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className={cn(
          "flex items-center gap-2 text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && item.children && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-neutral-lightGray rounded-lg shadow-lg z-50">
          <div className="py-3">
            {item.children.map((child, index) => (
              <Link
                key={index}
                href={child.href}
                className="block px-6 py-3 text-body-16-regular text-neutral-bodyText hover:bg-neutral-offWhiteBlue hover:text-primary-deepBlue transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 