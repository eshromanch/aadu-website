import { NextRequest } from 'next/server'
import { clearAuthResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  return clearAuthResponse()
} 