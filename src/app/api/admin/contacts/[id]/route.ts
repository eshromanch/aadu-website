import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'
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

// GET - Get single contact
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    
    await dbConnect()
    
    const contact = await Contact.findById(params.id).lean()
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: contact
    })
    
  } catch (error) {
    console.error('Get contact error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update contact status and notes
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    
    await dbConnect()
    
    const updateData = await request.json()
    
    // Only allow updating status and adminNotes
    const allowedUpdates: any = {}
    if (updateData.status) {
      allowedUpdates.status = updateData.status
    }
    if (updateData.adminNotes !== undefined) {
      allowedUpdates.adminNotes = updateData.adminNotes
    }
    
    const contact = await Contact.findByIdAndUpdate(
      params.id,
      allowedUpdates,
      { new: true }
    ).lean()
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    })
    
  } catch (error) {
    console.error('Update contact error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 