import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const contactData = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message']
    for (const field of requiredFields) {
      if (!contactData[field] || contactData[field].trim() === '') {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Create new contact submission
    const contact = new Contact({
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone.trim(),
      subject: contactData.subject.trim(),
      message: contactData.message.trim()
    })
    
    await contact.save()
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      data: contact
    }, { status: 201 })
    
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 