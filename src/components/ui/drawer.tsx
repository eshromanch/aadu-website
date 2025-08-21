"use client"

import * as React from "react"
import { X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { navigationData, topNavData } from "@/data/navData"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-lightGray">
          <div className="w-12 h-12 rounded-full border-2 border-primary-deepBlue flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="text-body-12 font-dm-sans font-semibold text-primary-deepBlue leading-tight">
                ASIAN AMERICAN<br />
                DIGITAL<br />
                UNIVERSITY
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <nav className="space-y-6">
            {/* Main Navigation */}
            <div className="space-y-4">
              {navigationData.map((item, index) => (
                <div key={index}>
                  {item.children ? (
                    <div className="space-y-2">
                      {/* Parent Link - Clickable to navigate to parent page */}
                      <Link
                        href={item.href}
                        className="block text-body-20-semibold font-poppins text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                      {/* Child Links */}
                      <div className="ml-4 space-y-2">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block text-body-16 font-poppins text-neutral-bodyText hover:text-primary-deepBlue transition-colors"
                            onClick={onClose}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-body-20-semibold font-poppins text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-lightGray pt-4">
              <div className="space-y-2">
                {topNavData.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-body-16 font-poppins text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
} 