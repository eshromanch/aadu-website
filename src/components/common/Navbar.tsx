"use client"

import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { navigationData, topNavData } from "@/data/navData"
import { Dropdown } from "@/components/ui/dropdown"
import { Drawer } from "@/components/ui/drawer"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <header className="bg-neutral-offWhiteBlue shadow-sm">
        {/* Mobile Navigation Bar */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full border-2 border-primary-deepBlue flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="text-body-12 font-dm-sans font-semibold text-primary-deepBlue leading-tight">
                      ASIAN AMERICAN<br />
                      DIGITAL<br />
                      UNIVERSITY
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Icons */}
              <div className="flex items-center space-x-4">
                <button className="text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors">
                  <Image
                    src="/icons/search-alt_svgrepo.com.svg"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </button>
                <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="hidden lg:block">
          {/* Top Navigation Bar */}
          <div className="border-b border-neutral-lightGray">
            <div className="container mx-auto px-8">
              <div className="flex justify-end items-center h-12">
                <nav className="flex items-center space-x-8">
                  {topNavData.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-body-16 font-poppins text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Navigation Bar */}
          <div className="container mx-auto px-8">
            <div className="flex items-center justify-between h-24">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full border-2 border-primary-deepBlue flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="text-body-16 font-dm-sans font-semibold text-primary-deepBlue leading-tight">
                      ASIAN AMERICAN<br />
                      DIGITAL<br />
                      UNIVERSITY
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Navigation */}
              <nav className="w-full flex  justify-end space-x-12 mr-12">
                {navigationData.map((item, index) => (
                  <div key={index}>
                    {item.children ? (
                      <Dropdown item={item} className="text-body-20 font-poppins" />
                    ) : (
                      <Link
                        href={item.href}
                        className="text-body-20-semibold font-poppins text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Search Icon */}
              <button className="text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors">
                <Image
                  src="/icons/search-alt_svgrepo.com.svg"
                  alt="Search"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  )
} 