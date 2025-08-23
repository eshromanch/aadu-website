import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Middleware to check authentication
async function authenticateRequest(req: NextRequest) {
  const token = getTokenFromRequest(req)
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Authentication required' },
      { status: 401 }
    )
  }
  
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    )
  }
  
  return payload
}

// GET - List all students with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit
    
    // Build query
    const query: any = {}
    
    if (status && status !== 'all') {
      query.status = status
    }
    
    if (search) {
      query.$or = [
        { studentId: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { degreePackage: { $regex: search, $options: 'i' } },
        { major: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Get students with pagination
    const students = await Student.find(query)
      .select('studentId firstName lastName email phone major degreePackage status createdAt yearOfGraduation')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    // Get total count
    const total = await Student.countDocuments(query)
    
    return NextResponse.json({
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Get students error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new student (from application form)
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    // Check if this is a multipart form data request (file upload)
    const contentType = request.headers.get('content-type') || ''
    
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData()
      
      // Extract student data
      const studentData: any = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: new Date(formData.get('dateOfBirth') as string),
        gender: formData.get('gender'),
        address: {
          street: formData.get('address.street'),
          city: formData.get('address.city'),
          state: formData.get('address.state'),
          zipCode: formData.get('address.zipCode'),
          country: formData.get('address.country')
        },
        degreePackage: formData.get('degreePackage'),
        major: formData.get('major'),
        yearOfGraduation: new Date(formData.get('yearOfGraduation') as string),
        parentGuardian: {
          name: formData.get('parentGuardian.name'),
          relationship: formData.get('parentGuardian.relationship'),
          phone: formData.get('parentGuardian.phone'),
          email: formData.get('parentGuardian.email')
        },
        documents: {}
      }
      
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      await mkdir(uploadsDir, { recursive: true })
      
      // Handle file uploads
      const files = ['passport', 'drivingLicense', 'workExperience']
      
      for (const fileField of files) {
        const file = formData.get(fileField) as File | null
        
        if (file && file.size > 0) {
          // Generate unique filename
          const timestamp = Date.now()
          const originalName = file.name
          const extension = path.extname(originalName)
          const filename = `${fileField}_${timestamp}${extension}`
          const filepath = path.join(uploadsDir, filename)
          
          // Convert file to buffer and save
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          await writeFile(filepath, buffer)
          
          // Store file path in database
          studentData.documents[fileField] = `/uploads/${filename}`
        }
      }
      
      // Create new student
      const student = new Student(studentData)
      await student.save()
      
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully',
        data: student
      }, { status: 201 })
      
    } else {
      // Handle JSON request (from admin panel)
      const studentData = await request.json()
      
      // Create new student
      const student = new Student(studentData)
      await student.save()
      
      return NextResponse.json({
        success: true,
        message: 'Student created successfully',
        data: student
      }, { status: 201 })
    }
    
  } catch (error) {
    console.error('Create student error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 