import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { username, email, password } = body
    
    if (!password || (!username && !email)) {
      return NextResponse.json(
        { success: false, message: 'Username/email and password are required' },
        { status: 400 }
      )
    }
    
    // Build query to find admin by username or email
    const query = username ? { username } : { email }
    const admin = await Admin.findOne(query).select('+password')
    
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    const isPasswordValid = await admin.comparePassword(password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    const token = generateToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: 'admin'
    })
    
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    })
    
    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 