import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
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
    
    await dbConnect()
    
    // Get admin details
    const admin = await Admin.findById(payload.adminId).select('-password').lean()
    
    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { success: false, message: 'Admin not found or inactive' },
        { status: 401 }
      )
    }
    
    return NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    })
    
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 