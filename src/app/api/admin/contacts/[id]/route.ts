import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'
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
  const contact = await Contact.findById(resolvedParams.id).lean()
  
  if (!contact) {
    return NextResponse.json({ success: false, message: 'Contact not found' }, { status: 404 })
  }
  
  return NextResponse.json({ success: true, data: contact })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) return authResult

  await dbConnect()
  
  const updateData = await request.json()
  
  const allowedUpdates: Record<string, unknown> = {}
  
  if (updateData.status) {
    allowedUpdates.status = updateData.status
  }
  
  if (updateData.adminNotes !== undefined) {
    allowedUpdates.adminNotes = updateData.adminNotes
  }
  
  const resolvedParams = await params
  const contact = await Contact.findByIdAndUpdate(
    resolvedParams.id,
    allowedUpdates,
    { new: true }
  ).lean()
  
  if (!contact) {
    return NextResponse.json({ success: false, message: 'Contact not found' }, { status: 404 })
  }
  
  return NextResponse.json({ success: true, message: 'Contact updated successfully', data: contact })
} 
