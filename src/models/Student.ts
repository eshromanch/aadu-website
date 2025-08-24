import mongoose from 'mongoose'

export interface IStudent extends mongoose.Document {
  // Student ID (unique number)
  studentId: number
  
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  
  // Address Information
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  // Academic Information
  degreePackage: string
  major: string
  yearOfGraduation: Date
  
  // Parent/Guardian Information
  parentGuardian: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  
  // Documents
  documents: {
    passport?: string
    drivingLicense?: string
    workExperience?: string
  }
  
  // Application Status
  status: 'pending' | 'approved' | 'rejected' | 'in-review'
  adminNotes?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const studentSchema = new mongoose.Schema<IStudent>({
  // Student ID (unique number)
  studentId: {
    type: Number,
    required: true,
    unique: true
  },
  
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  
  // Address Information
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    }
  },
  
  // Academic Information
  degreePackage: {
    type: String,
    required: true,
    trim: true
  },
  major: {
    type: String,
    required: true,
    trim: true
  },
  yearOfGraduation: {
    type: Date,
    required: true
  },
  
  // Parent/Guardian Information
  parentGuardian: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    relationship: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  },
  
  // Documents
  documents: {
    passport: {
      type: String,
      trim: true
    },
    drivingLicense: {
      type: String,
      trim: true
    },
    workExperience: {
      type: String,
      trim: true
    }
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in-review'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
studentSchema.index({ studentId: 1 })
studentSchema.index({ email: 1 })
studentSchema.index({ status: 1 })
studentSchema.index({ createdAt: -1 })
studentSchema.index({ degreePackage: 1 })

// Pre-save middleware to generate student ID if not provided
studentSchema.pre('save', async function(next) {
  if (!this.studentId) {
    // Find the highest student ID and increment by 1
    const lastStudent = await mongoose.model('Student').findOne({}, {}, { sort: { 'studentId': -1 } })
    this.studentId = lastStudent ? lastStudent.studentId + 1 : 1000001 // Start from 1000001
  }
  next()
})

export default mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema) 