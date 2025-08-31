import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  await dbConnect()
  
  try {
    const formData = await request.formData()
    
    // Convert FormData to a regular object for easier handling
    const formDataObj: Record<string, unknown> = {}
    for (const [key, value] of formData.entries()) {
      formDataObj[key] = value
    }
    
    // Extract form data
    const firstName = formDataObj['firstName'] as string
    const lastName = formDataObj['lastName'] as string
    const email = formDataObj['email'] as string
    const phone = formDataObj['phone'] as string
    const dateOfBirth = formDataObj['dateOfBirth'] as string
    const gender = formDataObj['gender'] as 'male' | 'female' | 'other'
    
    // Address fields
    const address = {
      street: formDataObj['address.street'] as string,
      city: formDataObj['address.city'] as string,
      state: formDataObj['address.state'] as string,
      zipCode: formDataObj['address.zipCode'] as string,
      country: formDataObj['address.country'] as string
    }
    
    // Academic fields
    const degreePackageType = formDataObj['degreePackageType'] as 'single' | 'multiple'
    const yearOfGraduation = formDataObj['yearOfGraduation'] as string
    
    // Parent/Guardian fields
    const parentGuardian = {
      name: formDataObj['parentGuardian.name'] as string,
      relationship: formDataObj['parentGuardian.relationship'] as string,
      phone: formDataObj['parentGuardian.phone'] as string,
      email: formDataObj['parentGuardian.email'] as string
    }
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'degreePackageType', 'yearOfGraduation']
    for (const field of requiredFields) {
      if (!formDataObj[field] || formDataObj[field]?.toString().trim() === '') {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Validate address fields
    const addressFields = ['street', 'city', 'state', 'zipCode', 'country']
    for (const field of addressFields) {
      if (!address[field as keyof typeof address] || address[field as keyof typeof address].trim() === '') {
        return NextResponse.json(
          { success: false, message: `Address ${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Validate parent/guardian fields
    const parentFields = ['name', 'relationship', 'phone', 'email']
    for (const field of parentFields) {
      if (!parentGuardian[field as keyof typeof parentGuardian] || parentGuardian[field as keyof typeof parentGuardian].trim() === '') {
        return NextResponse.json(
          { success: false, message: `Parent/Guardian ${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Handle degree package data
    let singleDegree, multipleDegree
    
    if (degreePackageType === 'single') {
      const degreeType = formDataObj['singleDegree.degreeType'] as string
      const major = formDataObj['singleDegree.major'] as string
      
      if (!degreeType || !major) {
        return NextResponse.json(
          { success: false, message: 'Single degree type and major are required' },
          { status: 400 }
        )
      }
      
      singleDegree = { degreeType, major }
    } else if (degreePackageType === 'multiple') {
      const combinationPackage = formDataObj['multipleDegree.combinationPackage'] as string
      
      if (!combinationPackage) {
        return NextResponse.json(
          { success: false, message: 'Combination package is required' },
          { status: 400 }
        )
      }
      
      // Extract degrees array
      const degrees: Array<{ degreeType: string; major: string }> = []
      let index = 0
      while (formDataObj[`multipleDegree.degrees[${index}].degreeType`]) {
        const degreeType = formDataObj[`multipleDegree.degrees[${index}].degreeType`] as string
        const major = formDataObj[`multipleDegree.degrees[${index}].major`] as string
        degrees.push({ degreeType, major })
        index++
      }
      
      if (degrees.length === 0) {
        return NextResponse.json(
          { success: false, message: 'At least one degree is required' },
          { status: 400 }
        )
      }
      
      multipleDegree = { combinationPackage, degrees }
    }
    
    // Handle file uploads
    const documents: { passport?: string; drivingLicense?: string; workExperience?: string[] } = {}
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      console.error('Error creating uploads directory:', error)
    }
    
    const passport = formDataObj['passport'] as File
    if (passport) {
      // Save passport file
      const passportFileName = `passport_${Date.now()}_${passport.name}`
      const passportPath = path.join(uploadsDir, passportFileName)
      
      try {
        const passportBuffer = Buffer.from(await passport.arrayBuffer())
        await writeFile(passportPath, passportBuffer)
        documents.passport = passportFileName
      } catch (error) {
        console.error('Error saving passport file:', error)
      }
    }
    
    const drivingLicense = formDataObj['drivingLicense'] as File
    if (drivingLicense) {
      // Save driving license file
      const drivingLicenseFileName = `driving_license_${Date.now()}_${drivingLicense.name}`
      const drivingLicensePath = path.join(uploadsDir, drivingLicenseFileName)
      
      try {
        const drivingLicenseBuffer = Buffer.from(await drivingLicense.arrayBuffer())
        await writeFile(drivingLicensePath, drivingLicenseBuffer)
        documents.drivingLicense = drivingLicenseFileName
      } catch (error) {
        console.error('Error saving driving license file:', error)
      }
    }
    
    // Handle work experience files
    const workExperienceFiles: string[] = []
    let workExpIndex = 0
    while (formDataObj[`workExperience[${workExpIndex}]`]) {
      const file = formDataObj[`workExperience[${workExpIndex}]`] as File
      const fileName = `work_experience_${Date.now()}_${workExpIndex}_${file.name}`
      const filePath = path.join(uploadsDir, fileName)
      
      try {
        const fileBuffer = Buffer.from(await file.arrayBuffer())
        await writeFile(filePath, fileBuffer)
        workExperienceFiles.push(fileName)
      } catch (error) {
        console.error(`Error saving work experience file ${workExpIndex}:`, error)
      }
      workExpIndex++
    }
    
    if (workExperienceFiles.length > 0) {
      documents.workExperience = workExperienceFiles
    }
    
    // Create student record
    const studentData = {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      address,
      degreePackageType,
      singleDegree,
      multipleDegree,
      yearOfGraduation: new Date(yearOfGraduation),
      parentGuardian,
      documents,
      status: 'pending' as const
    }
    
    const student = new Student(studentData)
    await student.save()
    
    return NextResponse.json(
      { success: true, message: 'Application submitted successfully', data: student },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
