import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'
import { sendApplicationNotification } from '@/lib/email'

// POST - Submit application form (public)
export async function POST(request: NextRequest) {
  await dbConnect()
  
  try {
    const formData = await request.formData()
    
    // Extract form data
    const studentData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      gender: formData.get('gender') as string,
      address: {
        street: formData.get('address.street') as string,
        city: formData.get('address.city') as string,
        state: formData.get('address.state') as string,
        zipCode: formData.get('address.zipCode') as string,
        country: formData.get('address.country') as string
      },
      degreePackage: formData.get('degreePackage') as string,
      major: formData.get('major') as string,
      yearOfGraduation: formData.get('yearOfGraduation') as string,
      parentGuardian: {
        name: formData.get('parentGuardian.name') as string,
        relationship: formData.get('parentGuardian.relationship') as string,
        phone: formData.get('parentGuardian.phone') as string,
        email: formData.get('parentGuardian.email') as string
      }
    }
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'degreePackage', 'major']
    for (const field of requiredFields) {
      if (!studentData[field] || studentData[field].trim() === '') {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Generate student ID
    const studentId = `AADU${Date.now()}${Math.floor(Math.random() * 1000)}`
    
    // Create student record
    const student = new Student({
      ...studentData,
      studentId,
      status: 'pending',
      createdAt: new Date()
    })
    
    await student.save()
    
    // Send email notification
    const emailResult = await sendApplicationNotification({
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      degreePackage: studentData.degreePackage,
      major: studentData.major
    })
    
    if (!emailResult.success) {
      console.error('Application email sending failed:', emailResult.error)
      // Still return success for the application submission, but log the email error
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully! We will review your application and get back to you soon.',
        data: { studentId: student.studentId }
      },
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
