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

// GET - List all contacts with pagination and filters
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
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .select('name email phone subject message status createdAt adminNotes')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    // Get total count
    const total = await Contact.countDocuments(query)
    
    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 