"use client"

import { useState, useEffect } from "react"
import { SectionContainer } from "@/components/common/SectionContainer"
import { H2 } from "@/components/common/Typography"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, X, Plus, Minus } from "lucide-react"
import { degreePrograms, individualDegreePrograms } from "@/data/degreeProgramsData"
import { combinationPackages } from "@/data/combinationPackagesData"
import { faculties } from "@/data/majorsData"
import { useSearchParams } from "next/navigation"

interface SingleDegreeData {
  degreeType: string
  major: string
}

interface MultipleDegreeData {
  combinationPackage: string
  degrees: Array<{
    degreeType: string
    major: string
  }>
}

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
  degreePackageType: 'single' | 'multiple'
  singleDegree?: SingleDegreeData
  multipleDegree?: MultipleDegreeData
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
    workExperience?: string[]
  }
}

interface ApplicationFormProps {
  isAdmin?: boolean
  onSuccess?: (data: unknown) => void
  onCancel?: () => void
}

export function ApplicationForm({ isAdmin = false, onSuccess, onCancel }: ApplicationFormProps) {
  const searchParams = useSearchParams()
  const degreeProgramsList = degreePrograms.map((program) => program.title)
  const allMajors = faculties.flatMap((faculty) => faculty.majors.map((major) => major.name))

  // Auto-fill form when package is selected from URL params
  useEffect(() => {
    const packageId = searchParams.get('package')
    if (packageId) {
      autoFillFromPackage(packageId)
    }
  }, [searchParams])

  const getFilteredMajors = (selectedDegree: string) => {
    const degreeMajorMapping: { [key: string]: string[] } = {
      "Bachelor's Degree Program": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Master's Degree Program": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Doctorate Degree Program": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Associate Degree Program": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"],
      "Diploma Degree Program": ["General Studies", "Business", "Technology", "Arts", "Sciences"],
      "Certificate Program": ["Business Administration", "Computer Science", "Engineering", "Psychology", "Education"]
    }
    
    return degreeMajorMapping[selectedDegree] || allMajors
  }

  const getSelectedCombinationPackage = () => {
    if (formData.degreePackageType === 'multiple' && formData.multipleDegree?.combinationPackage) {
      return combinationPackages.find(pkg => pkg.id === formData.multipleDegree?.combinationPackage)
    }
    return null
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
    degreePackageType: 'single',
    singleDegree: {
      degreeType: "",
      major: ""
    },
    multipleDegree: {
      combinationPackage: "",
      degrees: []
    },
    yearOfGraduation: "",
    parentGuardian: {
      name: "",
      relationship: "",
      phone: "",
      email: ""
    },
    documents: {
      workExperience: []
    }
  })

  const [uploadedFiles, setUploadedFiles] = useState<{
    passport?: File
    drivingLicense?: File
    workExperience: File[]
  }>({
    workExperience: []
  })

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

  const handleSingleDegreeChange = (field: keyof SingleDegreeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      singleDegree: {
        ...prev.singleDegree!,
        [field]: value
      }
    }))
  }

  const handleMultipleDegreeChange = (field: 'combinationPackage', value: string) => {
    // Auto-populate degrees based on selected package
    const selectedPackage = combinationPackages.find(pkg => pkg.id === value)
    if (selectedPackage) {
      // Map component names to degree program titles
      const componentToDegreeMapping: { [key: string]: string } = {
        "Diploma Degree": "Diploma Degree Program",
        "Associate Degree": "Associate Degree Program", 
        "Bachelor's Degree": "Bachelor's Degree Program",
        "Master's Degree": "Master's Degree Program",
        "Doctorate Degree": "Doctorate Degree Program"
      }
      
      const autoDegrees: Array<{ degreeType: string; major: string }> = selectedPackage.components.map(component => ({
        degreeType: componentToDegreeMapping[component.name] || component.name,
        major: ""
      }))
      
      setFormData(prev => ({
        ...prev,
        multipleDegree: {
          combinationPackage: value,
          degrees: autoDegrees
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        multipleDegree: {
          combinationPackage: value,
          degrees: []
        }
      }))
    }
  }

  // Function to auto-fill form when a package is selected from CombinationPackagesDrawer
  const autoFillFromPackage = (packageId: string) => {
    const selectedPackage = combinationPackages.find(pkg => pkg.id === packageId)
    if (selectedPackage) {
      // Map component names to degree program titles
      const componentToDegreeMapping: { [key: string]: string } = {
        "Diploma Degree": "Diploma Degree Program",
        "Associate Degree": "Associate Degree Program", 
        "Bachelor's Degree": "Bachelor's Degree Program",
        "Bachelor's Degree Program": "Bachelor's Degree Program",
        "Master's Degree": "Master's Degree Program",
        "Doctorate Degree": "Doctorate Degree Program"
      }
      
      const autoDegrees: Array<{ degreeType: string; major: string }> = selectedPackage.components.map(component => ({
        degreeType: componentToDegreeMapping[component.name] || component.name,
        major: ""
      }))
      
      setFormData(prev => ({
        ...prev,
        degreePackageType: 'multiple',
        multipleDegree: {
          combinationPackage: packageId,
          degrees: autoDegrees
        }
      }))
    }
  }

  // Function to add additional degree fields based on combination package
  const addAdditionalDegree = () => {
    const selectedPackage = getSelectedCombinationPackage()
    if (selectedPackage && formData.multipleDegree) {
      // Add a new degree field with empty degree type (user will select)
      const newDegree = {
        degreeType: "",
        major: ""
      }
      
      setFormData(prev => ({
        ...prev,
        multipleDegree: {
          ...prev.multipleDegree!,
          degrees: [...prev.multipleDegree!.degrees, newDegree]
        }
      }))
    }
  }

  // Function to remove additional degree fields
  const removeAdditionalDegree = (index: number) => {
    const selectedPackage = getSelectedCombinationPackage()
    if (selectedPackage && formData.multipleDegree) {
      // Only allow removal of additional degrees (beyond the package components)
      if (index >= selectedPackage.components.length) {
        setFormData(prev => ({
          ...prev,
          multipleDegree: {
            ...prev.multipleDegree!,
            degrees: prev.multipleDegree!.degrees.filter((_, i) => i !== index)
          }
        }))
      }
    }
  }

  const handleDegreeChange = (index: number, field: 'degreeType' | 'major', value: string) => {
    setFormData(prev => ({
      ...prev,
      multipleDegree: {
        ...prev.multipleDegree!,
        degrees: prev.multipleDegree!.degrees.map((degree, i) => 
          i === index ? { ...degree, [field]: value } : degree
        )
      }
    }))
  }



  const handleFileUpload = (field: 'passport' | 'drivingLicense', file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }))
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file.name
      }
    }))
  }

  const handleWorkExperienceUpload = (file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, file]
    }))
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        workExperience: [...(prev.documents.workExperience || []), file.name]
      }
    }))
  }

  const removeFile = (field: 'passport' | 'drivingLicense') => {
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

  const removeWorkExperienceFile = (index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }))
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        workExperience: prev.documents.workExperience?.filter((_, i) => i !== index) || []
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
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
      formDataToSend.append('degreePackageType', formData.degreePackageType)
      
      if (formData.degreePackageType === 'single' && formData.singleDegree) {
        formDataToSend.append('singleDegree.degreeType', formData.singleDegree.degreeType)
        formDataToSend.append('singleDegree.major', formData.singleDegree.major)
      }
      
      if (formData.degreePackageType === 'multiple' && formData.multipleDegree) {
        formDataToSend.append('multipleDegree.combinationPackage', formData.multipleDegree.combinationPackage)
        formData.multipleDegree.degrees.forEach((degree, index) => {
          formDataToSend.append(`multipleDegree.degrees[${index}].degreeType`, degree.degreeType)
          formDataToSend.append(`multipleDegree.degrees[${index}].major`, degree.major)
        })
      }
      
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
      uploadedFiles.workExperience.forEach((file, index) => {
        formDataToSend.append(`workExperience[${index}]`, file)
      })

      const response = await fetch(isAdmin ? '/api/admin/students' : '/api/apply', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (response.ok) {
        if (isAdmin) {
          setSubmitMessage("Student created successfully!")
          if (onSuccess) {
            onSuccess(result.data)
          }
        } else {
          setSubmitMessage("Application submitted successfully! We'll review your application and get back to you soon.")
        }
        
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
          degreePackageType: 'single',
          singleDegree: {
            degreeType: "",
            major: ""
          },
          multipleDegree: {
            combinationPackage: "",
            degrees: []
          },
          yearOfGraduation: "",
          parentGuardian: {
            name: "",
            relationship: "",
            phone: "",
            email: ""
          },
          documents: {
            workExperience: []
          }
        })
        setUploadedFiles({
          workExperience: []
        })
      } else {
        setSubmitMessage(result.message || "Failed to submit application. Please try again.")
      }
    } catch {
      setSubmitMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedPackage = getSelectedCombinationPackage()

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
              
              {/* Degree Package Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                    Degree Package Type
                  </label>
                  <select
                    value={formData.degreePackageType}
                    onChange={(e) => handleInputChange('degreePackageType', e.target.value as 'single' | 'multiple')}
                    className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                    required
                  >
                    <option value="single">Single Degree</option>
                    <option value="multiple">Multiple Degree Package</option>
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
              </div>

              {/* Single Degree Flow */}
              {formData.degreePackageType === 'single' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Degree Type
                    </label>
                    <select
                      value={formData.singleDegree?.degreeType || ""}
                      onChange={(e) => handleSingleDegreeChange('degreeType', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      required
                    >
                      <option value="">Select degree type</option>
                      {degreeProgramsList.map((program: string, index: number) => (
                        <option key={index} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Major
                    </label>
                    <select
                      value={formData.singleDegree?.major || ""}
                      onChange={(e) => handleSingleDegreeChange('major', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      disabled={!formData.singleDegree?.degreeType}
                      required
                    >
                      <option value="">
                        {formData.singleDegree?.degreeType ? "Select major" : "Select degree type first"}
                      </option>
                      {formData.singleDegree?.degreeType && 
                        getFilteredMajors(formData.singleDegree.degreeType).map((major: string, index: number) => (
                          <option key={index} value={major}>{major}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )}

              {/* Multiple Degree Package Flow */}
              {formData.degreePackageType === 'multiple' && (
                <div className="space-y-6">
                  {/* Combination Package Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Combination Package
                    </label>
                    <select
                      value={formData.multipleDegree?.combinationPackage || ""}
                      onChange={(e) => handleMultipleDegreeChange('combinationPackage', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                      required
                    >
                      <option value="">Select combination package</option>
                      {combinationPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Package Info */}
                  {selectedPackage && (
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <h4 className="font-medium text-primary-deepBlue mb-2">{selectedPackage.title}</h4>
                      <div className="text-sm text-neutral-bodyText">
                        <p>Components: {selectedPackage.components.map(c => c.name).join(' + ')}</p>
                        <p>Total Price: {selectedPackage.discountedPrice}</p>
                        <p>Total Documents: {selectedPackage.totalDocuments}</p>
                      </div>
                    </div>
                  )}

                  {/* Degree Selections for Each Component */}
                  {selectedPackage && (
                    <div className="space-y-4">
                      {/* <div className="flex items-center justify-between">
                        <h4 className="font-medium text-primary-deepBlue">Degree Selections</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addAdditionalDegree}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Degree
                        </Button>
                      </div> */}
                      
                      {formData.multipleDegree?.degrees.map((degree, index) => (
                        <div key={index} className="border border-neutral-lightGray rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium text-neutral-bodyText">Degree {index + 1}</h5>
                            {selectedPackage && index >= selectedPackage.components.length && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeAdditionalDegree(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                                Degree Type
                              </label>
                              <select
                                value={degree.degreeType}
                                onChange={(e) => handleDegreeChange(index, 'degreeType', e.target.value)}
                                className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                                disabled={selectedPackage ? index < selectedPackage.components.length : false}
                                required
                              >
                                <option value="">Select degree type</option>
                                {degreeProgramsList.map((program: string, idx: number) => (
                                  <option key={idx} value={program}>{program}</option>
                                ))}
                              </select>
                              {selectedPackage && index < selectedPackage.components.length && (
                                <p className="text-xs text-neutral-bodyText mt-1">
                                  Auto-selected from package
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                                Major
                              </label>
                              <select
                                value={degree.major}
                                onChange={(e) => handleDegreeChange(index, 'major', e.target.value)}
                                className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                                disabled={!degree.degreeType}
                                required
                              >
                                <option value="">
                                  {degree.degreeType ? "Select major" : "Select degree type first"}
                                </option>
                                {degree.degreeType && 
                                  getFilteredMajors(degree.degreeType).map((major: string, idx: number) => (
                                    <option key={idx} value={major}>{major}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              {/* Work Experience Files */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-neutral-bodyText">
                    Work Experience Documents
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = '.pdf,.jpg,.jpeg,.png'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) handleWorkExperienceUpload(file)
                      }
                      input.click()
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Document
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {uploadedFiles.workExperience.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-neutral-lightGray rounded-2xl">
                      <span className="text-sm text-neutral-bodyText">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeWorkExperienceFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {uploadedFiles.workExperience.length === 0 && (
                    <div className="border-2 border-dashed border-neutral-lightGray rounded-2xl p-8 text-center">
                      <Upload className="w-8 h-8 text-neutral-bodyText mx-auto mb-2" />
                      <p className="text-sm text-neutral-bodyText">No work experience documents uploaded</p>
                      <p className="text-xs text-neutral-bodyText mt-1">Click &quot;Add Document&quot; to upload work experience files</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6 space-x-4">
              {isAdmin && onCancel && (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={onCancel}
                  className="px-8 py-4 text-lg"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="px-8 py-4 text-lg bg-primary-deepBlue hover:bg-primary-deepBlue/90"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isAdmin ? 'Creating...' : 'Submitting...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {isAdmin ? 'Create Student' : 'Submit Application'}
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