import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { studentId, email, lastName } = await request.json()
    
    if (!studentId && !email && !lastName) {
      return NextResponse.json(
        { success: false, message: 'Please provide at least one search criteria' },
        { status: 400 }
      )
    }
    
    const query: Record<string, unknown> = {}
    
    if (studentId) {
      query.studentId = { $regex: studentId, $options: 'i' }
    }
    
    if (email) {
      query.email = { $regex: email, $options: 'i' }
    }
    
    if (lastName) {
      query.lastName = { $regex: lastName, $options: 'i' }
    }
    
    const students = await Student.find(query)
      .select('studentId firstName lastName email degreeProgram major status yearOfGraduation createdAt')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
    
    if (students.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No students found with the provided criteria' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: students
    })
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 