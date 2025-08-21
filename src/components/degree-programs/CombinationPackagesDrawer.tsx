"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { H2, H3, Body16 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { combinationPackages } from "@/data/combinationPackagesData"

interface CombinationPackagesDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CombinationPackagesDrawer({ isOpen, onClose }: CombinationPackagesDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full lg:w-5/6 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-lightGray">
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-lightGray rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-neutral-bodyText" />
            </button>
            <H2 className="text-primary-deepBlue">
              Combination Packages
            </H2>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="bg-primary-deepBlue text-white p-4 rounded-t-lg">
                <div className="grid grid-cols-5 gap-4 font-semibold">
                  <div>Degree Packages</div>
                  <div>Price</div>
                  <div>Discount Price</div>
                  <div>Documents</div>
                  <div>Action</div>
                </div>
              </div>
              
              <div className="border border-neutral-lightGray rounded-b-lg overflow-hidden">
                {combinationPackages.map((pkg, index) => (
                  <div 
                    key={pkg.id} 
                    className={`grid grid-cols-5 gap-4 p-4 items-center ${
                      index % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhiteBlue'
                    }`}
                  >
                    <div className="font-medium text-primary-deepBlue">
                      {pkg.title}
                    </div>
                    <div className="text-neutral-bodyText">
                      {pkg.totalPrice}
                    </div>
                    <div className="font-bold text-primary-deepBlue">
                      {pkg.discountedPrice}
                    </div>
                    <div className="text-neutral-bodyText">
                      {pkg.totalDocuments}
                    </div>
                    <div>
                      <Button 
                        variant="default"
                        size="sm"
                        className="bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {combinationPackages.map((pkg) => (
                <div key={pkg.id} className="bg-neutral-offWhiteBlue rounded-[20px] p-6 space-y-4">
                  {/* Package Title */}
                  <H3 className="text-primary-deepBlue font-bold">
                    {pkg.title}
                  </H3>
                  
                  {/* Components */}
                  <div className="space-y-2">
                    {pkg.components.map((component, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-lightGray/30">
                        <Body16 className="text-neutral-bodyText">
                          {component.name}
                        </Body16>
                        <Body16 className="text-neutral-bodyText font-medium">
                          {component.price}
                        </Body16>
                      </div>
                    ))}
                  </div>
                  
                  {/* Summary */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray/30">
                      <Body16 className="text-neutral-bodyText">
                        Total Price
                      </Body16>
                      <Body16 className="text-neutral-bodyText font-medium">
                        {pkg.totalPrice}
                      </Body16>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray/30">
                      <Body16 className="text-neutral-bodyText">
                        Total Documents
                      </Body16>
                      <Body16 className="text-neutral-bodyText font-medium">
                        {pkg.totalDocuments}
                      </Body16>
                    </div>
                  </div>
                  
                  {/* Discounted Price */}
                  <div className="flex justify-between items-center py-3 rounded-lg ">
                    <H3 className="text-primary-deepBlue font-bold">
                      Discounted Price
                    </H3>
                    <H3 className="text-primary-deepBlue font-bold">
                      {pkg.discountedPrice}
                    </H3>
                  </div>
                  
                  {/* Apply Now Button */}
                  <Button 
                    variant="default"
                    className="w-full bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white py-3 rounded-lg font-semibold"
                  >
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 