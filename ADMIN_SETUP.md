# Admin Panel Setup Guide

## 🚀 Quick Start

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/aadu-website

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Environment
NODE_ENV=development
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up MongoDB
- Install MongoDB locally or use MongoDB Atlas
- Update the `MONGODB_URI` in your `.env.local` file

### 4. Create Admin User
```bash
node scripts/create-admin.js
```

This will create an admin user with:
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@aadu.edu`

⚠️ **IMPORTANT**: Change the password after first login!

### 5. Start the Development Server
```bash
npm run dev
```

### 6. Access Admin Panel
Visit: `http://localhost:3000/admin`

## 🔧 Features

### Admin Panel Features:
- ✅ **Secure Authentication** with JWT tokens
- ✅ **Student Application Management**
- ✅ **Create Students Manually** - Add new students directly from admin panel
- ✅ **Status Updates** (Pending, In Review, Approved, Rejected)
- ✅ **Search & Filter** students by name, email, major, status
- ✅ **Pagination** for large datasets
- ✅ **Dashboard Statistics** showing application counts
- ✅ **Responsive Design** for mobile and desktop

### Student Application Features:
- ✅ **Comprehensive Form** with all required fields
- ✅ **File Upload** for documents (passport, license, work experience)
- ✅ **Dynamic Major Selection** based on degree program
- ✅ **Form Validation** and error handling
- ✅ **Success/Error Messages**
- ✅ **Auto-save to MongoDB**

## 📊 Database Schema

### Admin Collection:
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'super-admin',
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Student Collection:
```javascript
{
  // Personal Information
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  gender: 'male' | 'female' | 'other',
  
  // Address Information
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Academic Information
  degreePackage: String,
  major: String,
  yearOfGraduation: Date,
  
  // Parent/Guardian Information
  parentGuardian: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  
  // Documents
  documents: {
    passport: String (filename),
    drivingLicense: String (filename),
    workExperience: String (filename)
  },
  
  // Application Status
  status: 'pending' | 'approved' | 'rejected' | 'in-review',
  adminNotes: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: Using bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for production use

## 🚀 Production Deployment

### For Contabo VPS:

1. **Set up MongoDB**:
   ```bash
   # Install MongoDB
   sudo apt update
   sudo apt install mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

2. **Environment Variables** (production):
   ```env
   MONGODB_URI=mongodb://localhost:27017/aadu-website
   JWT_SECRET=your-very-long-random-secret-key-here
   NODE_ENV=production
   ```

3. **Build and Deploy**:
   ```bash
   npm run build
   npm start
   ```

4. **Set up PM2** (recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "aadu-website" -- start
   pm2 startup
   pm2 save
   ```

5. **Set up Nginx** (reverse proxy):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 API Endpoints

### Authentication:
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Check authentication status

### Student Management:
- `GET /api/admin/students` - List students (with pagination & filters)
- `POST /api/admin/students` - Create new student (from application form or admin panel)
- `GET /api/admin/students/[id]` - Get single student
- `PATCH /api/admin/students/[id]` - Update student status

## 🎯 Next Steps

1. **File Upload**: Implement proper file storage (AWS S3, Cloudinary, etc.)
2. **Email Notifications**: Send confirmation emails to applicants
3. **Admin User Management**: Add ability to create/edit admin users
4. **Export Features**: Export student data to CSV/Excel
5. **Advanced Filtering**: More sophisticated search and filter options
6. **Audit Logs**: Track admin actions for security

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Check if MongoDB is running
   - Verify connection string in `.env.local`
   - Ensure database exists

2. **JWT Token Issues**:
   - Check JWT_SECRET is set
   - Clear browser cookies
   - Restart development server

3. **Admin Login Fails**:
   - Run the create-admin script again
   - Check MongoDB connection
   - Verify admin user exists in database

### Debug Commands:
```bash
# Check MongoDB status
sudo systemctl status mongodb

# View MongoDB logs
sudo journalctl -u mongodb

# Check if admin user exists
mongo aadu-website --eval "db.admins.find()"
```

## 🎉 Admin Panel Features Summary

### **Create Student Feature:**
- **Create Button**: Located in the top-right header next to logout
- **Comprehensive Form**: Includes all student information fields
- **Status Selection**: Can set initial status (Pending, In Review, Approved, Rejected)
- **Admin Notes**: Add notes during creation
- **Form Validation**: Required fields and proper validation
- **Auto-refresh**: Student list updates automatically after creation

### **Student Management:**
- **View All Students**: Paginated table with search and filters
- **Status Updates**: One-click status changes
- **Student Details**: Modal with full student information
- **Search & Filter**: By name, email, major, and status
- **Dashboard Stats**: Real-time application counts

The admin panel now provides complete student management capabilities, allowing admins to both view applications submitted through the website and manually create new student records as needed. 