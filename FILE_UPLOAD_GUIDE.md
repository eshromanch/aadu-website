# File Upload System Guide

## 📁 **Where Are Uploaded Documents Stored?**

### **Local Storage (Current Implementation)**
- **Location**: `public/uploads/` directory in your project
- **File Structure**: 
  ```
  public/
  └── uploads/
      ├── passport_1234567890.pdf
      ├── drivingLicense_1234567891.jpg
      └── workExperience_1234567892.png
  ```

### **Database Storage**
- **What's Stored**: File paths (e.g., `/uploads/passport_1234567890.pdf`)
- **Collection**: `students` collection in MongoDB
- **Field**: `documents` object containing file paths

## 🔧 **How It Works**

### **1. File Upload Process**
1. User selects files in the application form
2. Files are temporarily stored in browser memory
3. On form submission, files are sent via FormData
4. Server receives files and saves them to `public/uploads/`
5. File paths are stored in the database

### **2. File Naming Convention**
- **Format**: `{documentType}_{timestamp}{extension}`
- **Example**: `passport_1703123456789.pdf`
- **Benefits**: 
  - Unique filenames prevent conflicts
  - Timestamp ensures uniqueness
  - Original extension preserved

### **3. File Access**
- **Admin Panel**: Download buttons in student details modal
- **URL Format**: `/api/uploads/{filename}`
- **Security**: Basic path traversal protection

## 📋 **Supported File Types**
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`
- **Documents**: `.pdf`
- **Size Limit**: No explicit limit (limited by server configuration)

## 🔒 **Security Features**

### **Path Traversal Protection**
- Files can only be accessed from `public/uploads/` directory
- Prevents accessing system files outside upload directory

### **Content Type Detection**
- Automatic MIME type detection based on file extension
- Proper headers for file downloads

### **Git Ignore**
- Upload directory is excluded from version control
- Prevents sensitive files from being committed

## 🚀 **Production Considerations**

### **Current Limitations**
- **Local Storage**: Files are stored on the same server
- **No Backup**: Files are not automatically backed up
- **Server Space**: Limited by server disk space

### **Recommended Improvements**

#### **Option 1: Cloud Storage (Recommended)**
```javascript
// Example with AWS S3
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

// Upload to S3
const uploadResult = await s3.upload({
  Bucket: 'your-bucket-name',
  Key: `uploads/${filename}`,
  Body: fileBuffer,
  ContentType: contentType
}).promise()

// Store S3 URL in database
studentData.documents[fileField] = uploadResult.Location
```

#### **Option 2: Cloudinary**
```javascript
// Example with Cloudinary
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload to Cloudinary
const uploadResult = await cloudinary.uploader.upload(filepath, {
  folder: 'aadu-documents',
  public_id: filename
})

// Store Cloudinary URL in database
studentData.documents[fileField] = uploadResult.secure_url
```

## 📊 **Database Schema**

### **Student Document Fields**
```javascript
{
  documents: {
    passport: String,        // File path or URL
    drivingLicense: String,  // File path or URL
    workExperience: String   // File path or URL
  }
}
```

## 🛠 **Admin Panel Features**

### **Document Management**
- **View**: See uploaded documents in student details
- **Download**: Click download buttons to access files
- **Status**: Shows which documents are uploaded
- **Missing**: Indicates when no documents are uploaded

### **File Access**
- **Direct Download**: Files open in new tab
- **Content Type**: Proper MIME types for viewing
- **Security**: Protected access through API

## 🔍 **Troubleshooting**

### **Common Issues**

1. **Files Not Uploading**
   - Check server disk space
   - Verify upload directory permissions
   - Check file size limits

2. **Files Not Accessible**
   - Verify file paths in database
   - Check upload directory exists
   - Ensure proper file permissions

3. **Upload Directory Missing**
   ```bash
   # Create uploads directory
   mkdir -p public/uploads
   chmod 755 public/uploads
   ```

### **Debug Commands**
```bash
# Check uploads directory
ls -la public/uploads/

# Check disk space
df -h

# Check file permissions
stat public/uploads/

# View uploaded files
find public/uploads/ -type f -exec ls -la {} \;
```

## 📝 **Environment Variables**

### **For Local Development**
```env
# No additional variables needed for local storage
```

### **For Cloud Storage (Future)**
```env
# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎯 **Next Steps**

1. **Implement Cloud Storage** for production
2. **Add File Validation** (size, type, content)
3. **Implement File Compression** for images
4. **Add File Cleanup** for rejected applications
5. **Implement File Backup** strategy
6. **Add Virus Scanning** for uploaded files

The current implementation provides a solid foundation for file uploads with basic security and admin access. For production use, consider migrating to cloud storage for better scalability and reliability. 