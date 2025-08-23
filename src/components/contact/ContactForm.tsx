"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ContactFormData {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("Message sent successfully! We'll get back to you soon.")
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: ""
        })
      } else {
        setSubmitMessage(result.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-neutral-offWhiteBlue rounded-[25px] p-8 lg:p-12 shadow-lg">
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-2xl ${
          submitMessage.includes('successfully') 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-bodyText mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-bodyText mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-bodyText mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-bodyText mb-2">
            Inquiry Subject *
          </label>
          <select
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
            required
          >
            <option value="">Select inquiry subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Degree Programs">Degree Programs</option>
            <option value="Application Process">Application Process</option>
            <option value="Verification Services">Verification Services</option>
            <option value="Partnership Programs">Partnership Programs</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-bodyText mb-2">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent h-32 resize-none"
            placeholder="Please describe your inquiry or interest..."
            required
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            type="submit" 
            size="lg" 
            className="px-8 py-4 text-lg bg-primary-deepBlue hover:bg-primary-deepBlue/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center">
                Send Message
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
} 