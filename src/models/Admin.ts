import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAdmin extends mongoose.Document {
  username: string
  email: string
  password: string
  role: 'admin' | 'super-admin'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const adminSchema = new mongoose.Schema<IAdmin>({
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
    next(error as Error)
  }
})

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema) 