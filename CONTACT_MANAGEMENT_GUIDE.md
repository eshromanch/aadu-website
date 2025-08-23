# Contact Management System Guide

## 🎯 **Overview**

The AADU Contact Management System allows admins to view, manage, and respond to contact form submissions from the website. This system provides a complete workflow for handling customer inquiries and support requests.

## 📋 **Features**

### **1. Contact Form Submission**
- **Public Form**: Available at `/contact` page
- **Real-time Storage**: Submissions stored in MongoDB
- **Validation**: Required field validation
- **Success Feedback**: User confirmation messages

### **2. Admin Management**
- **Dashboard Integration**: Accessible from admin panel
- **Status Tracking**: New, Read, Replied, Closed
- **Search & Filter**: Find specific contacts quickly
- **Bulk Management**: Handle multiple submissions efficiently

## 🔧 **Technical Implementation**

### **Database Schema**
```javascript
{
  name: String,           // Contact's full name
  email: String,          // Contact's email address
  phone: String,          // Contact's phone number
  subject: String,        // Inquiry subject
  message: String,        // Detailed message
  status: String,         // 'new', 'read', 'replied', 'closed'
  adminNotes: String,     // Admin notes/response
  createdAt: Date,        // Submission timestamp
  updatedAt: Date         // Last update timestamp
}
```

### **API Endpoints**

#### **Public Contact Submission**
- **URL**: `/api/contact`
- **Method**: `POST`
- **Access**: Public
- **Purpose**: Submit contact form data

#### **Admin Contact Management**
- **URL**: `/api/admin/contacts`
- **Method**: `GET`
- **Access**: Admin only (authenticated)
- **Purpose**: List all contacts with pagination and filters

#### **Individual Contact Management**
- **URL**: `/api/admin/contacts/[id]`
- **Method**: `GET`, `PATCH`
- **Access**: Admin only (authenticated)
- **Purpose**: View and update individual contacts

## 🚀 **How to Use**

### **1. Contact Form Submission (Public)**

#### **Form Fields**
- **Full Name** (required): Contact's full name
- **Phone Number** (required): Contact's phone number
- **Email Address** (required): Contact's email address
- **Inquiry Subject** (required): Dropdown with options:
  - General Inquiry
  - Degree Programs
  - Application Process
  - Verification Services
  - Partnership Programs
  - Technical Support
  - Other
- **Message** (required): Detailed inquiry or message

#### **Submission Process**
1. User fills out contact form
2. Form validates required fields
3. Data sent to `/api/contact` endpoint
4. Contact stored in database with 'new' status
5. User receives success confirmation

### **2. Admin Contact Management**

#### **Accessing Contact Management**
1. Login to admin panel (`/admin`)
2. Click "Contact Management" button in header
3. View all contact submissions

#### **Dashboard Features**

##### **Statistics Cards**
- **Total Messages**: All contact submissions
- **New**: Unread messages
- **Read**: Messages marked as read
- **Replied**: Messages marked as replied
- **Closed**: Resolved messages

##### **Search & Filter**
- **Search**: By name, email, subject, or message content
- **Status Filter**: Filter by message status
- **Pagination**: Navigate through multiple pages

##### **Contact Table**
- **Contact Info**: Name, email, phone
- **Subject**: Inquiry subject
- **Status**: Current status with color coding
- **Received**: Submission date and time
- **Actions**: View details button

#### **Contact Details Modal**

##### **Contact Information**
- Full name, email, phone number
- Current status with visual indicator

##### **Message Details**
- Inquiry subject
- Full message content
- Submission timestamp

##### **Status Management**
- **Mark as Read**: Change status to 'read'
- **Mark as Replied**: Change status to 'replied'
- **Close**: Mark as resolved

## 📊 **Status Workflow**

### **Status Types**
1. **New** (Blue): Just received, needs attention
2. **Read** (Yellow): Admin has reviewed the message
3. **Replied** (Green): Admin has responded to the contact
4. **Closed** (Gray): Issue resolved, no further action needed

### **Recommended Workflow**
1. **New** → **Read**: Review the message
2. **Read** → **Replied**: Respond to the contact
3. **Replied** → **Closed**: Mark as resolved after follow-up

## 🔍 **Search & Filter Options**

### **Search Criteria**
- **Name**: Full or partial name search
- **Email**: Full or partial email search
- **Subject**: Inquiry subject search
- **Message**: Content within the message

### **Status Filters**
- **All**: Show all contacts
- **New**: Only unread messages
- **Read**: Only reviewed messages
- **Replied**: Only responded messages
- **Closed**: Only resolved messages

## 📱 **User Interface Features**

### **Responsive Design**
- **Desktop**: Full table view with all details
- **Mobile**: Optimized for smaller screens
- **Tablet**: Adaptive layout

### **Visual Indicators**
- **Status Badges**: Color-coded status indicators
- **Icons**: Visual status icons
- **Loading States**: Progress indicators
- **Success/Error Messages**: User feedback

### **Accessibility**
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Color Contrast**: High contrast for readability

## 🔒 **Security Features**

### **Authentication**
- **Admin Only**: Contact management requires admin login
- **Session Management**: Secure session handling
- **Token Validation**: JWT token verification

### **Data Protection**
- **Input Validation**: Server-side validation
- **XSS Prevention**: Sanitized input handling
- **Rate Limiting**: Prevent abuse (future enhancement)

## 📈 **Analytics & Reporting**

### **Current Metrics**
- **Total Submissions**: Overall contact volume
- **Status Distribution**: Breakdown by status
- **Response Times**: Time to first response (future)

### **Future Enhancements**
- **Response Time Tracking**: Average time to reply
- **Contact Volume Trends**: Monthly/weekly patterns
- **Subject Analysis**: Most common inquiry types
- **Export Functionality**: Download contact reports

## 🛠 **Troubleshooting**

### **Common Issues**

#### **Contact Form Not Submitting**
- **Check Network**: Ensure internet connection
- **Validate Fields**: All required fields must be filled
- **Browser Console**: Check for JavaScript errors

#### **Admin Can't Access Contacts**
- **Login Status**: Ensure admin is logged in
- **Permissions**: Verify admin role
- **Session Expiry**: Re-login if session expired

#### **Search Not Working**
- **Check Spelling**: Verify search terms
- **Clear Filters**: Reset status filters
- **Refresh Page**: Reload the page

### **Error Messages**
- **"Message sent successfully"**: Form submitted correctly
- **"Failed to send message"**: Server error, try again
- **"Network error"**: Connection issue
- **"Authentication required"**: Admin login needed

## 🎯 **Best Practices**

### **For Admins**
1. **Regular Review**: Check new messages daily
2. **Quick Response**: Respond within 24 hours
3. **Status Updates**: Keep status current
4. **Professional Tone**: Maintain professional communication
5. **Follow-up**: Ensure issues are resolved

### **For Users**
1. **Clear Subject**: Choose appropriate inquiry type
2. **Detailed Message**: Provide sufficient information
3. **Contact Info**: Ensure accurate contact details
4. **Patience**: Allow time for response

## 📞 **Support**

### **Technical Support**
- **Email**: support@aadu.edu
- **Documentation**: This guide
- **Admin Panel**: Built-in help features

### **Contact Management Support**
- **Training**: Admin training sessions
- **Guidelines**: Response templates and guidelines
- **Escalation**: Process for complex inquiries

The contact management system provides a comprehensive solution for handling customer inquiries and maintaining professional communication standards. 