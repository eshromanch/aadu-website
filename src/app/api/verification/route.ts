import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Student from '@/models/Student'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    
    if (!query.trim()) {
      return NextResponse.json(
        { success: false, message: 'Search query is required' },
        { status: 400 }
      )
    }
    
    // Check if query is a number (student ID)
    const isStudentId = !isNaN(Number(query))
    
    let searchQuery: any
    
    if (isStudentId) {
      // If it's a number, search by student ID first
      searchQuery = { studentId: Number(query) }
    } else {
      // If it's not a number, search by other criteria
      searchQuery = {
        $or: [
          { email: { $regex: query, $options: 'i' } },
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { phone: { $regex: query, $options: 'i' } },
          { major: { $regex: query, $options: 'i' } },
          { degreePackage: { $regex: query, $options: 'i' } }
        ]
      }
    }
    
    const students = await Student.find(searchQuery)
      .select('studentId firstName lastName email phone major degreePackage status createdAt yearOfGraduation')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
    
    // Format the results for the verification page
    const formattedResults = students.map(student => ({
      name: `${student.firstName} ${student.lastName}`,
      registrationNo: student.studentId.toString(), // Use studentId as registration number
      email: student.email,
      session: student.yearOfGraduation ? new Date(student.yearOfGraduation).getFullYear().toString() : 'N/A',
      majorSubject: student.major,
      gender: 'N/A', // Not stored in current schema
      institute: 'AADU',
      dateOfBirth: 'N/A', // Not stored in current schema
      certificateNo: student.studentId.toString(), // Use studentId as certificate number
      status: student.status,
      degreePackage: student.degreePackage,
      phone: student.phone,
      appliedDate: student.createdAt
    }))
    
    return NextResponse.json({
      success: true,
      data: formattedResults,
      count: formattedResults.length
    })
    
  } catch (error) {
    console.error('Verification search error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 