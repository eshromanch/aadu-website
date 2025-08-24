import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

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
  } catch {
    return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 401 })
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) return authResult

  await dbConnect()
  
  const resolvedParams = await params
  const student = await Student.findById(resolvedParams.id).lean()
  
  if (!student) {
    return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 })
  }
  
  return NextResponse.json({ success: true, data: student })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) return authResult

  await dbConnect()
  
  try {
    const updateData = await request.json()
    
    const allowedUpdates: Record<string, unknown> = {}
    
    // Only allow updating specific fields
    const allowedFields = ['status', 'adminNotes', 'yearOfGraduation']
    
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        allowedUpdates[field] = updateData[field]
      }
    }
    
    const resolvedParams = await params
    const student = await Student.findByIdAndUpdate(
      resolvedParams.id,
      allowedUpdates,
      { new: true }
    ).lean()
    
    if (!student) {
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, message: 'Student updated successfully', data: student })
    
  } catch (error) {
    console.error('Update student error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) return authResult

  await dbConnect()
  
  try {
    const resolvedParams = await params
    const student = await Student.findByIdAndDelete(resolvedParams.id)
    
    if (!student) {
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, message: 'Student deleted successfully' })
    
  } catch (error) {
    console.error('Delete student error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
} 