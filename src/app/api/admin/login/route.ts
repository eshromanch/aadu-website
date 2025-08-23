import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { generateToken, createAuthResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { username, password } = await request.json()
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      )
    }
    
    // Find admin by username
    const admin = await Admin.findOne({ username, isActive: true })
    
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValidPassword = await admin.comparePassword(password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Update last login
    admin.lastLogin = new Date()
    await admin.save()
    
    // Generate JWT token
    const token = generateToken({
      adminId: admin._id.toString(),
      username: admin.username,
      role: admin.role
    })
    
    // Create response with cookie
    return createAuthResponse(token, {
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 