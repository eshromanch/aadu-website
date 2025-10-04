"use client"

import { SectionContainer } from "@/components/common/SectionContainer"
import { H2 } from "@/components/common/Typography"
import { CheckCircle, CreditCard, Mail, Award } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  bankDetails?: {
    accountNumber: string
    accountName: string
    bankName: string
  }[]
}

const steps: Step[] = [
  {
    id: 1,
    title: "Step 1: Submit Application",
    description: "Fill out our comprehensive application form with your personal information, academic details, and required documents. Our streamlined process makes it easy to get started on your educational journey.",
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Step 2: Complete Payment",
    description: "Make your payment to secure your degree program. We accept various payment methods for your convenience with multiple banking options.",
    bankDetails: [
      {
        accountNumber: "0170139706031",
        accountName: "Asian American University Foundation",
        bankName: "IFIC Bank"
      },
      {
        accountNumber: "0317125755",
        accountName: "Mahbubur Rahman",
        bankName: "Bank of Bangkok, Thailand"
      },
      
    ],
    icon: <CreditCard className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Step 3: Wait for Approval",
    description: "Our academic team will review your application and documents. You'll receive an approval notification via email within 2-3 business days. We'll keep you updated throughout the process.",
    icon: <Mail className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Step 4: Get Your Certificate",
    description: "Once approved, your degree certificate will be processed and delivered to your address via FedEx with FREE shipping. You'll receive tracking information to monitor your delivery.",
    icon: <Award className="w-8 h-8" />
  }
]

export function StepsComponent() {
  return (
    <SectionContainer className="py-8 lg:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <H2 className="text-primary-deepBlue mb-4">How It Works</H2>
          <p className="text-lg text-neutral-bodyText max-w-3xl mx-auto">
            Getting your degree is simple and straightforward. Follow these four easy steps to start your educational journey with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-dodgerBlue/20 transform translate-x-4 z-0" />
              )}
              
              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Step number and icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary-dodgerBlue rounded-full text-white mx-auto mb-4">
                  {step.icon}
                </div>
                
                {/* Step content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary-deepBlue mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-bodyText leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Bank Details for Step 2 */}
                  {step.bankDetails && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-primary-deepBlue mb-3 text-center">
                        Available Banking Options
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {step.bankDetails.map((bank, bankIndex) => (
                          <div key={bankIndex} className="text-xs bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-neutral-bodyText font-medium">Bank:</span>
                              <span className="text-primary-deepBlue font-semibold text-right">{bank.bankName}</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-neutral-bodyText font-medium">A/C No:</span>
                              <span className="text-primary-deepBlue font-semibold">{bank.accountNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-neutral-bodyText font-medium">A/C Name:</span>
                              <span className="text-primary-deepBlue font-semibold text-right">{bank.accountName}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-neutral-bodyText text-center mt-3">
                        Choose any of the above banking options for payment
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile connection lines */}
        <div className="lg:hidden mt-8">
          <div className="flex justify-center">
            <div className="flex flex-col space-y-4">
              {steps.slice(0, -1).map((_, index) => (
                <div key={index} className="w-0.5 h-8 bg-primary-dodgerBlue/20 mx-auto" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}