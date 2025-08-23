"use client"

import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { navigationData, topNavData } from "@/data/navData"
import { Dropdown } from "@/components/ui/dropdown"
import { Drawer } from "@/components/ui/drawer"
import { SearchHero } from "@/components/common/SearchHero"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="bg-neutral-offWhiteBlue shadow-sm">
        {/* Mobile Navigation Bar */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
             <Image className="w-12 h-12" src="/AADU LOGO.png" alt="Logo" width={100} height={100} />
              
              {/* Mobile Icons */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleSearch}
                  className="text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
                >
                  <Search className="w-5 h-5" />
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
            <div className="flex justify-between h-24">
              {/* Logo */}
             <Link href="/">
             <Image className="w-24 h-24" src="/AADU LOGO.png" alt="Logo" width={100} height={100} /></Link>
              
              {/* Main Navigation */}
              <nav className="flex items-center space-x-12">
                {navigationData.map((item, index) => (
                  <div key={index}>
                    {item.children ? (
                      <Dropdown item={item} className="text-body-20-semibold font-poppins" />
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
                  {/* Search Icon */}
              <button 
                onClick={toggleSearch}
                className="text-primary-deepBlue hover:text-primary-dodgerBlue transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
              </nav>
              
            
            </div>
          </div>
        </div>
      </header>

      {/* Search Section - Toggleable */}
      {isSearchOpen && (
        <div className=" bg-neutral-offWhiteBlue rounded-b-lg">
          <div className="container mx-auto px-8 py-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-deepBlue mb-8">
                What are you looking for?
              </h1>
              <SearchHero onSearch={closeSearch} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  )
} 