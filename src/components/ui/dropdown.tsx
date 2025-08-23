"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavItem } from "@/data/navData"

interface DropdownProps {
  item: NavItem
  className?: string
}

export function Dropdown({ item, className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // 150ms delay to allow moving cursor to dropdown
  }

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Parent Link - Clickable to navigate to parent page */}
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-2 text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors",
          className
        )}
      >
        {item.label}
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </Link>
      
      {/* Dropdown Menu - Shows on hover */}
      {isOpen && item.children && (
        <div 
          className="absolute top-full left-0 mt-2 w-72 bg-white border border-neutral-lightGray rounded-2xl shadow-lg z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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