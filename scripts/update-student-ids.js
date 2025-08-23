const mongoose = require('mongoose')

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aadu-website'

// Student Schema (simplified version for the script)
const studentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    unique: true,
    index: true
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  gender: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  degreePackage: String,
  major: String,
  yearOfGraduation: Date,
  parentGuardian: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  documents: {
    passport: String,
    drivingLicense: String,
    workExperience: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in-review'],
    default: 'pending'
  },
  adminNotes: String
}, {
  timestamps: true
})

const Student = mongoose.model('Student', studentSchema)

async function updateStudentIds() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Get all students
    const allStudents = await Student.find({})
    console.log(`Found ${allStudents.length} total students`)

    // Filter students without studentId
    const studentsWithoutId = allStudents.filter(student => !student.studentId)
    console.log(`Found ${studentsWithoutId.length} students without studentId`)

    if (studentsWithoutId.length === 0) {
      console.log('All students already have studentId')
      return
    }

    // Get the highest existing studentId
    const studentsWithId = allStudents.filter(student => student.studentId)
    const highestId = studentsWithId.length > 0 
      ? Math.max(...studentsWithId.map(s => s.studentId))
      : 1000000
    
    let nextId = highestId + 1

    // Update each student with a studentId
    for (const student of studentsWithoutId) {
      await Student.findByIdAndUpdate(student._id, { studentId: nextId })
      console.log(`Updated student ${student.firstName} ${student.lastName} with studentId: ${nextId}`)
      nextId++
    }

    console.log('Successfully updated all students with studentId')

  } catch (error) {
    console.error('Error updating student IDs:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

updateStudentIds() 