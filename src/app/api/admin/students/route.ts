import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// Middleware to check authentication
async function authenticateRequest(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('auth-token')?.value
    const token = cookieToken || getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }
    
    return null // Authentication successful
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 401 })
  }
}

// GET - List all students with pagination and filters
export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) return authResult

  await dbConnect()
  
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = searchParams.get('status')
  const search = searchParams.get('search')
  
  const skip = (page - 1) * limit
  
  const query: Record<string, unknown> = {}
  
  if (status && status !== 'all') {
    query.status = status
  }
  
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { studentId: { $regex: search, $options: 'i' } }
    ]
  }
  
  const students = await Student.find(query)
    .select('firstName lastName email phone studentId status degreeProgram major createdAt')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
  
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
}

// POST - Create new student (from application form)
export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) return authResult

  await dbConnect()
  
  try {
    const studentData = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'degreeProgram', 'major']
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
    
    const student = new Student({
      ...studentData,
      studentId,
      status: 'pending',
      createdAt: new Date()
    })
    
    await student.save()
    
    return NextResponse.json(
      { success: true, message: 'Student created successfully', data: student },
      { status: 201 }
    )
    
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 