import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface JWTPayload {
  adminId: string
  username: string
  role: string
  iat: number
  exp: number
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Also check cookies
  const token = req.cookies.get('admin-token')?.value
  return token || null
}

export function createAuthResponse(token: string, data: any = {}) {
  const response = NextResponse.json({
    success: true,
    message: 'Authentication successful',
    ...data
  })
  
  // Set HTTP-only cookie
  response.cookies.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24 hours
  })
  
  return response
}

export function clearAuthResponse() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  })
  
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  })
  
  return response
} 