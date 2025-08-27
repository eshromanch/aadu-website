import nodemailer from 'nodemailer'

// Email configuration for AADU global mail server
const transporter = nodemailer.createTransport({
  host: '194.195.90.237',
  port: 587,
  secure: false,
  auth: {
    user: 'info@aadu.online',
    pass: process.env.AADU_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Verify transporter configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log('✅ Email server connection verified')
    return true
  } catch (error) {
    console.error('❌ Email server connection failed:', error)
    return false
  }
}

// Send contact form email
export async function sendContactEmail(formData: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  const { name, email, phone, subject, message } = formData
  
  try {
    // Send to admin
    await transporter.sendMail({
      from: 'info@aadu.online',
      to: 'info@aadu.online',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    // Send confirmation to contact
    await transporter.sendMail({
      from: 'info@aadu.online',
      to: email,
      subject: 'Thank you for contacting AADU',
      html: `
        <h3>Thank you for contacting AADU</h3>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you soon.</p>
        <p>Best regards,<br>The AADU Team</p>
      `
    })
    
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Send application notification email
export async function sendApplicationNotification(applicationData: {
  firstName: string
  lastName: string
  email: string
  degreePackage: string
  major: string
}) {
  const { firstName, lastName, email, degreePackage, major } = applicationData
  
  try {
    // Send notification to admin
    await transporter.sendMail({
      from: 'info@aadu.online',
      to: 'info@aadu.online',
      subject: `New Application: ${firstName} ${lastName} - ${degreePackage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Degree Application Received
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Degree Package:</strong> ${degreePackage}</p>
            <p><strong>Major:</strong> ${major}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #1e40af; border-radius: 4px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              Review the complete application in the admin panel.
            </p>
          </div>
        </div>
      `
    })

    // Send confirmation to applicant
    await transporter.sendMail({
      from: 'info@aadu.online',
      to: email,
      subject: 'AADU - Your Degree Application Has Been Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Application Received Successfully
          </h2>
          
          <p>Dear ${firstName} ${lastName},</p>
          
          <p>Thank you for submitting your degree application to AADU. We have received your application and our team will review it shortly.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Application Details</h3>
            <p><strong>Degree Package:</strong> ${degreePackage}</p>
            <p><strong>Major:</strong> ${major}</p>
            <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>We will review your application and contact you within 3-5 business days with next steps.</p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f0f9ff; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
            <ol style="padding-left: 20px;">
              <li>Our team reviews your application and documents</li>
              <li>We verify your information and requirements</li>
              <li>We contact you with approval or additional requirements</li>
              <li>Upon approval, we process your degree package</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              Best regards,<br>
              The AADU Team<br>
              <a href="https://aadu.online">aadu.online</a>
            </p>
          </div>
        </div>
      `
    })
    
    return { success: true }
  } catch (error) {
    console.error('Application email error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
