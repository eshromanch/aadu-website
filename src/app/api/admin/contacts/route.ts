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
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } }
    ]
  }
  
  const contacts = await Contact.find(query)
    .select('name email phone subject message status createdAt adminNotes')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
  
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
} 