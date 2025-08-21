"use client"

import { useState } from "react"
import { BigHero } from "@/components/common/BigHero"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2, H3, Body20, Body16 } from "@/components/common/Typography"
import { CallToActionBanner } from "@/components/common/CallToActionBanner"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, X } from "lucide-react"
import { PageHero } from "@/components/common/PageHero"
import { degreePrograms } from "@/data/degreeProgramsData"
import { faculties } from "@/data/majorsData"

interface FormData {
  // Degree Selection
  degreePackage: string
  major: string
  gpa: string
  graduationYear: string
  
  // Personal Information
  fullName: string
  dateOfBirth: string
  email: string
  telephone: string
  phone: string
  bestCallTime: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Parent/Guardian Information
  relation: string
  guardianFirstName: string
  guardianLastName: string
  guardianEmail: string
  guardianPhone: string
  guardianAddress: string
  
  // Documents
  passport: File | null
  drivingLicense: File | null
  workExperience: File | null
}

export default function ApplyPage() {
  // Get all degree programs and majors from data
  const degreeProgramsList = degreePrograms.map((program) => program.title)
  const allMajors = faculties.flatMap((faculty) => faculty.majors.map((major) => major.name))

  // Filter majors based on selected degree program
  const getFilteredMajors = (selectedDegree: string) => {
    if (!selectedDegree) return []
    
    // Define which majors are available for each degree level
    const degreeMajorMapping: { [key: string]: string[] } = {
      "Bachelor's Degree Program": [
        "Business Administration", "Computer Science", "Engineering", "Psychology", 
        "Education", "Healthcare Management", "Marketing", "Finance", "Accounting",
        "Communications", "Economics", "History", "Political Science", "Sociology",
        "Biology", "Chemistry", "Mathematics", "Physics", "Environmental Science",
        "Criminal Justice", "Social Work", "Nursing", "Public Health"
      ],
      "Master's Degree Program": [
        "Business Administration", "Computer Science", "Engineering", "Psychology", 
        "Education", "Healthcare Management", "Marketing", "Finance", "Accounting",
        "Data Science", "Information Technology", "Human Resources", "International Relations",
        "Public Health", "Social Work", "Criminal Justice", "Environmental Science"
      ],
      "Doctorate Degree Program": [
        "Business Administration", "Computer Science", "Engineering", "Psychology", 
        "Education", "Healthcare Management", "Data Science", "Public Health",
        "Environmental Science", "Political Science", "Sociology"
      ],
      "Associate Degree Program": [
        "Business Administration", "Computer Science", "Engineering", "Psychology", 
        "Education", "Healthcare Management", "Marketing", "Finance", "Accounting",
        "Communications", "Criminal Justice", "Nursing"
      ],
      "High School Diploma Program": [
        "General Studies", "Business Studies", "Computer Studies", "Science Studies",
        "Arts and Humanities", "Social Studies"
      ]
    }
    
    return degreeMajorMapping[selectedDegree] || []
  }

  const [formData, setFormData] = useState<FormData>({
    degreePackage: "",
    major: "",
    gpa: "",
    graduationYear: "",
    fullName: "",
    dateOfBirth: "",
    email: "",
    telephone: "",
    phone: "",
    bestCallTime: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    relation: "Father",
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "Example@gmail.com",
    guardianPhone: "",
    guardianAddress: "",
    passport: null,
    drivingLicense: null,
    workExperience: null
  })

  const [uploadedFiles, setUploadedFiles] = useState<{
    passport?: { name: string; size: string }
    drivingLicense?: { name: string; size: string }
    workExperience?: { name: string; size: string }
  }>({
    drivingLicense: { name: "File Name.pdf", size: "1.5 mb" }
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Reset major when degree program changes
    if (field === 'degreePackage') {
      setFormData(prev => ({ ...prev, major: "" }))
    }
  }

  const handleFileUpload = (field: keyof Pick<FormData, 'passport' | 'drivingLicense' | 'workExperience'>, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }))
    setUploadedFiles(prev => ({
      ...prev,
      [field]: { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} mb` }
    }))
  }

  const removeFile = (field: keyof Pick<FormData, 'passport' | 'drivingLicense' | 'workExperience'>) => {
    setFormData(prev => ({ ...prev, [field]: null }))
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[field]
      return newFiles
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  // Get filtered majors based on selected degree
  const availableMajors = getFilteredMajors(formData.degreePackage)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionContainer className="py-16 lg:py-24">
        <PageHero
          title="Apply for Your Degree"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </SectionContainer>

      {/* Application Form */}
      <SectionContainer className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[25px] p-8 lg:p-12 shadow-lg">
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
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      disabled={!formData.degreePackage}
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
                      Your Selected GPA
                    </label>
                    <select
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    >
                      <option value="">Select GPA</option>
                      <option value="4.0">4.0</option>
                      <option value="3.9">3.9</option>
                      <option value="3.8">3.8</option>
                      <option value="3.7">3.7</option>
                      <option value="3.6">3.6</option>
                      <option value="3.5">3.5</option>
                      <option value="3.4">3.4</option>
                      <option value="3.3">3.3</option>
                      <option value="3.2">3.2</option>
                      <option value="3.1">3.1</option>
                      <option value="3.0">3.0</option>
                      <option value="2.9">2.9</option>
                      <option value="2.8">2.8</option>
                      <option value="2.7">2.7</option>
                      <option value="2.6">2.6</option>
                      <option value="2.5">2.5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Your Selected Year of Graduation
                    </label>
                    <input
                      type="date"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-6">
                <H2 className="text-primary-deepBlue">Personal Information</H2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter full name"
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
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      E-mail Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter telephone"
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
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Best Call Time
                    </label>
                    <input
                      type="text"
                      value={formData.bestCallTime}
                      onChange={(e) => handleInputChange('bestCallTime', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter best time"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Zip/Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter zip code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information Section */}
              <div className="space-y-6">
                <H2 className="text-primary-deepBlue">*Parent/Guardian</H2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Choose Relation
                    </label>
                    <select
                      value={formData.relation}
                      onChange={(e) => handleInputChange('relation', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Guardian's First Name
                    </label>
                    <input
                      type="text"
                      value={formData.guardianFirstName}
                      onChange={(e) => handleInputChange('guardianFirstName', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Guardian's Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.guardianLastName}
                      onChange={(e) => handleInputChange('guardianLastName', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.guardianEmail}
                      onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      placeholder="Enter phone"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Residential Address of the Parent/Guardian
                  </label>
                  <textarea
                    value={formData.guardianAddress}
                    onChange={(e) => handleInputChange('guardianAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-lg focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent h-32 resize-none"
                    placeholder="Please type your address here..."
                  />
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="space-y-6">
                <H2 className="text-primary-deepBlue">Upload your documents</H2>
                <div className="space-y-4">
                  {/* Passport Upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Upload Passport
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('passport', e.target.files[0])}
                        className="hidden"
                        id="passport-upload"
                      />
                      <label htmlFor="passport-upload">
                        <Button type="button" variant="outline" className="bg-neutral-babyBlueTint border-primary-dodgerBlue text-primary-dodgerBlue hover:bg-primary-dodgerBlue hover:text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload PDF/Doc
                        </Button>
                      </label>
                      {uploadedFiles.passport && (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                          <span className="text-sm">{uploadedFiles.passport.name} ({uploadedFiles.passport.size})</span>
                          <button
                            type="button"
                            onClick={() => removeFile('passport')}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Driving License Upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Upload Driving Licence
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('drivingLicense', e.target.files[0])}
                        className="hidden"
                        id="license-upload"
                      />
                      <label htmlFor="license-upload">
                        <Button type="button" variant="outline" className="bg-neutral-babyBlueTint border-primary-dodgerBlue text-primary-dodgerBlue hover:bg-primary-dodgerBlue hover:text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload PDF/Doc
                        </Button>
                      </label>
                      {uploadedFiles.drivingLicense && (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                          <span className="text-sm">{uploadedFiles.drivingLicense.name} ({uploadedFiles.drivingLicense.size})</span>
                          <button
                            type="button"
                            onClick={() => removeFile('drivingLicense')}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Work Experience Upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Work Experience Certificate
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('workExperience', e.target.files[0])}
                        className="hidden"
                        id="experience-upload"
                      />
                      <label htmlFor="experience-upload">
                        <Button type="button" variant="outline" className="bg-neutral-babyBlueTint border-primary-dodgerBlue text-primary-dodgerBlue hover:bg-primary-dodgerBlue hover:text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload PDF/Doc
                        </Button>
                      </label>
                      {uploadedFiles.workExperience && (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                          <span className="text-sm">{uploadedFiles.workExperience.name} ({uploadedFiles.workExperience.size})</span>
                          <button
                            type="button"
                            onClick={() => removeFile('workExperience')}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <Button type="submit" size="lg" className="px-8 py-4 text-lg">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SectionContainer>

      {/* Call to Action Banner */}
      <CallToActionBanner
        title="Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
      />
    </div>
  )
} 