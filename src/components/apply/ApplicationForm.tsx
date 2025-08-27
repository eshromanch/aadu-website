"use client"

import { useState } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, X } from "lucide-react"
import { degreePrograms } from "@/data/degreeProgramsData"
import { faculties } from "@/data/majorsData"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  
  // Address Information
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  // Academic Information
  degreePackage: string
  major: string
  yearOfGraduation: string
  
  // Parent/Guardian Information
  parentGuardian: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  
  // Documents
  documents: {
    passport?: string
    drivingLicense?: string
    workExperience?: string
  }
}

export function ApplicationForm() {
  const degreeProgramsList = degreePrograms.map((program) => program.title)
  const allMajors = faculties.flatMap((faculty) => faculty.majors.map((major) => major.name))

  const getFilteredMajors = (selectedDegree: string) => {
    const degreeMajorMapping: { [key: string]: string[] } = {
      "Bachelor's Degree": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Master's Degree": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Doctorate Degree": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Associate's Degree": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Certificate Program": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"]
    }
    
    return degreeMajorMapping[selectedDegree] || allMajors
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: 'male',
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    degreePackage: "",
    major: "",
    yearOfGraduation: "",
    parentGuardian: {
      name: "",
      relationship: "",
      phone: "",
      email: ""
    },
    documents: {}
  })

  const [uploadedFiles, setUploadedFiles] = useState<{
    passport?: File
    drivingLicense?: File
    workExperience?: File
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field: keyof FormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleParentGuardianChange = (field: keyof FormData['parentGuardian'], value: string) => {
    setFormData(prev => ({
      ...prev,
      parentGuardian: {
        ...prev.parentGuardian,
        [field]: value
      }
    }))
  }

  const handleFileUpload = (field: 'passport' | 'drivingLicense' | 'workExperience', file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }))
    
    // For now, we'll store the filename as a string
    // In a real implementation, you'd upload to a file storage service
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file.name
      }
    }))
  }

  const removeFile = (field: 'passport' | 'drivingLicense' | 'workExperience') => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[field]
      return newFiles
    })
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: undefined
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('dateOfBirth', formData.dateOfBirth)
      formDataToSend.append('gender', formData.gender)
      
      // Address fields
      formDataToSend.append('address.street', formData.address.street)
      formDataToSend.append('address.city', formData.address.city)
      formDataToSend.append('address.state', formData.address.state)
      formDataToSend.append('address.zipCode', formData.address.zipCode)
      formDataToSend.append('address.country', formData.address.country)
      
      // Academic fields
      formDataToSend.append('degreePackage', formData.degreePackage)
      formDataToSend.append('major', formData.major)
      formDataToSend.append('yearOfGraduation', formData.yearOfGraduation)
      
      // Parent/Guardian fields
      formDataToSend.append('parentGuardian.name', formData.parentGuardian.name)
      formDataToSend.append('parentGuardian.relationship', formData.parentGuardian.relationship)
      formDataToSend.append('parentGuardian.phone', formData.parentGuardian.phone)
      formDataToSend.append('parentGuardian.email', formData.parentGuardian.email)
      
      // Add files if they exist
      if (uploadedFiles.passport) {
        formDataToSend.append('passport', uploadedFiles.passport)
      }
      if (uploadedFiles.drivingLicense) {
        formDataToSend.append('drivingLicense', uploadedFiles.drivingLicense)
      }
      if (uploadedFiles.workExperience) {
        formDataToSend.append('workExperience', uploadedFiles.workExperience)
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formDataToSend // Send as FormData instead of JSON
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("Application submitted successfully! We'll review your application and get back to you soon.")
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: 'male',
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
          },
          degreePackage: "",
          major: "",
          yearOfGraduation: "",
          parentGuardian: {
            name: "",
            relationship: "",
            phone: "",
            email: ""
          },
          documents: {}
        })
        setUploadedFiles({})
      } else {
        setSubmitMessage(result.message || "Failed to submit application. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableMajors = getFilteredMajors(formData.degreePackage)

  return (
    <SectionContainer className="py-8 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[25px] p-8 lg:p-12 shadow-lg">
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-2xl ${
              submitMessage.includes('successfully') 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Degree Selection Section */}
            <div className="space-y-6">
              <H2 className="text-primary-deepBlue">Degree Selection</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Your Selected Degree Package
                  </label>
                  <select
                    value={formData.degreePackage}
                    onChange={(e) => handleInputChange('degreePackage', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  >
                    <option value="">Select degree package</option>
                    {degreeProgramsList.map((program: string, index: number) => (
                      <option key={index} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Your Selected Major
                  </label>
                  <select
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    disabled={!formData.degreePackage}
                    required
                  >
                    <option value="">
                      {formData.degreePackage ? "Select major" : "Select degree package first"}
                    </option>
                    {availableMajors.map((major: string, index: number) => (
                      <option key={index} value={major}>{major}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Year of Graduation
                  </label>
                  <input
                    type="date"
                    value={formData.yearOfGraduation}
                    onChange={(e) => handleInputChange('yearOfGraduation', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female' | 'other')}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-6">
              <H2 className="text-primary-deepBlue">Personal Information</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-6">
              <H2 className="text-primary-deepBlue">Address Information</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information Section */}
            <div className="space-y-6">
              <H2 className="text-primary-deepBlue">Parent/Guardian Information</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentGuardian.name}
                    onChange={(e) => handleParentGuardianChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={formData.parentGuardian.relationship}
                    onChange={(e) => handleParentGuardianChange('relationship', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    placeholder="e.g., Father, Mother, Guardian"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.parentGuardian.phone}
                    onChange={(e) => handleParentGuardianChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.parentGuardian.email}
                    onChange={(e) => handleParentGuardianChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-6">
              <H2 className="text-primary-deepBlue">Document Upload</H2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Passport/ID
                  </label>
                  <div className="border-2 border-dashed border-neutral-lightGray rounded-2xl p-4">
                    {uploadedFiles.passport ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-bodyText">{uploadedFiles.passport.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('passport')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-neutral-bodyText mx-auto mb-2" />
                        <input
                          type="file"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('passport', e.target.files[0])}
                          className="hidden"
                          id="passport-upload"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="passport-upload" className="cursor-pointer text-sm text-primary-dodgerBlue hover:text-primary-deepBlue">
                          Click to upload
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Driving License
                  </label>
                  <div className="border-2 border-dashed border-neutral-lightGray rounded-2xl p-4">
                    {uploadedFiles.drivingLicense ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-bodyText">{uploadedFiles.drivingLicense.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('drivingLicense')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-neutral-bodyText mx-auto mb-2" />
                        <input
                          type="file"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('drivingLicense', e.target.files[0])}
                          className="hidden"
                          id="driving-license-upload"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="driving-license-upload" className="cursor-pointer text-sm text-primary-dodgerBlue hover:text-primary-deepBlue">
                          Click to upload
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Work Experience
                  </label>
                  <div className="border-2 border-dashed border-neutral-lightGray rounded-2xl p-4">
                    {uploadedFiles.workExperience ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-bodyText">{uploadedFiles.workExperience.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('workExperience')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-neutral-bodyText mx-auto mb-2" />
                        <input
                          type="file"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('workExperience', e.target.files[0])}
                          className="hidden"
                          id="work-experience-upload"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="work-experience-upload" className="cursor-pointer text-sm text-primary-dodgerBlue hover:text-primary-deepBlue">
                          Click to upload
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="px-8 py-4 text-lg bg-primary-deepBlue hover:bg-primary-deepBlue/90"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Submit Application
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  )
} 