import mongoose from 'mongoose'

export interface IContact extends mongoose.Document {
  // Contact Information
  name: string
  email: string
  phone: string
  subject: string
  message: string
  
  // Status
  status: 'new' | 'read' | 'replied' | 'closed'
  adminNotes?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const contactSchema = new mongoose.Schema<IContact>({
  // Contact Information
  name: {
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
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
contactSchema.index({ status: 1 })
contactSchema.index({ createdAt: -1 })
contactSchema.index({ email: 1 })

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema) 