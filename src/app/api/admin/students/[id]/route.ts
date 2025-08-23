import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

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

// GET - Get single student by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    
    await dbConnect()
    
    const student = await Student.findById(params.id).lean()
    
    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: student
    })
    
  } catch (error) {
    console.error('Get student error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update student status and notes
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    
    await dbConnect()
    
    const { status, adminNotes } = await request.json()
    
    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'in-review']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      )
    }
    
    const updateData: any = {}
    if (status) updateData.status = status
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes
    
    const student = await Student.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    })
    
  } catch (error) {
    console.error('Update student error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 