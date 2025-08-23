const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aadu-website'

// Admin Schema (simplified version for the script)
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
})

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

const Admin = mongoose.model('Admin', adminSchema)

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Create new admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@aadu.edu',
      password: 'admin123', // This will be hashed automatically
      role: 'super-admin',
      isActive: true
    })

    await admin.save()
    console.log('Admin user created successfully!')
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('Email: admin@aadu.edu')
    console.log('\n⚠️  IMPORTANT: Change the password after first login!')

  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

createAdmin() 