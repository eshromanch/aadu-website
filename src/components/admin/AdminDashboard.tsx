"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { H2, H3, Body16 } from "@/components/common/Typography"
import { LogOut, Users, FileText, CheckCircle, XCircle, Clock, Search, Plus, MessageSquare } from "lucide-react"
import { ContactManagement } from "./ContactManagement"

interface AdminDashboardProps {
  onLogout: () => void
}

interface Student {
  _id: string
  studentId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  degreePackage: string
  major: string
  status: 'pending' | 'approved' | 'rejected' | 'in-review'
  createdAt: string
  adminNotes?: string
  documents?: {
    passport?: string
    drivingLicense?: string
    workExperience?: string
  }
}

interface DashboardStats {
  total: number
  pending: number
  approved: number
  rejected: number
  inReview: number
}

interface CreateStudentForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  degreePackage: string
  major: string
  yearOfGraduation: string
  parentGuardian: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  status: 'pending' | 'approved' | 'rejected' | 'in-review'
  adminNotes: string
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    inReview: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [showContactManagement, setShowContactManagement] = useState(false)

  const [createForm, setCreateForm] = useState<CreateStudentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: 'male',
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    degreePackage: "",
    major: "",
    yearOfGraduation: "",
    parentGuardian: {
      name: "",
      relationship: "",
      phone: "",
      email: ""
    },
    status: 'pending',
    adminNotes: ""
  })

  // If showing contact management, render that component
  if (showContactManagement) {
    return <ContactManagement onBack={() => setShowContactManagement(false)} />
  }

  const fetchStudents = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/students?${params}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data.data)
        setTotalPages(data.pagination.pages)
        
        // Calculate stats from the data
        const total = data.pagination.total
        const statusCounts = data.data.reduce((acc: any, student: Student) => {
          acc[student.status] = (acc[student.status] || 0) + 1
          return acc
        }, {})
        
        setStats({
          total,
          pending: statusCounts.pending || 0,
          approved: statusCounts.approved || 0,
          rejected: statusCounts.rejected || 0,
          inReview: statusCounts['in-review'] || 0
        })
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [currentPage, statusFilter, searchTerm])

  const handleStatusUpdate = async (studentId: string, newStatus: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/students/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus, adminNotes: notes })
      })

      if (response.ok) {
        fetchStudents() // Refresh the list
        setSelectedStudent(null)
      }
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const submissionData = {
        ...createForm,
        dateOfBirth: new Date(createForm.dateOfBirth),
        yearOfGraduation: new Date(createForm.yearOfGraduation)
      }

      const response = await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        setShowCreateModal(false)
        setCreateForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: 'male',
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
          },
          degreePackage: "",
          major: "",
          yearOfGraduation: "",
          parentGuardian: {
            name: "",
            relationship: "",
            phone: "",
            email: ""
          },
          status: 'pending',
          adminNotes: ""
        })
        fetchStudents() // Refresh the list
      } else {
        const result = await response.json()
        alert(result.message || 'Failed to create student')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateFormChange = (field: keyof CreateStudentForm, value: any) => {
    setCreateForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field: keyof CreateStudentForm['address'], value: string) => {
    setCreateForm(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleParentGuardianChange = (field: keyof CreateStudentForm['parentGuardian'], value: string) => {
    setCreateForm(prev => ({
      ...prev,
      parentGuardian: {
        ...prev.parentGuardian,
        [field]: value
      }
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50'
      case 'rejected': return 'text-red-600 bg-red-50'
      case 'in-review': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      case 'in-review': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-offWhiteBlue">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-lightGray">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-primary-deepBlue flex items-center justify-center bg-white">
                <div className="text-center">
                  <div className="text-body-12 font-dm-sans font-semibold text-primary-deepBlue leading-tight">
                    AADU<br />
                    ADMIN
                  </div>
                </div>
              </div>
              <div>
                <H2 className="text-primary-deepBlue">Admin Dashboard</H2>
                <Body16 className="text-neutral-bodyText">Manage student applications</Body16>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowContactManagement(true)}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Management</span>
              </Button>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Student</span>
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Total Applications</p>
                <p className="text-2xl font-bold text-primary-deepBlue">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-primary-dodgerBlue" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">In Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inReview}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-bodyText w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or major..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-offWhiteBlue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-lightGray">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-deepBlue mx-auto"></div>
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-neutral-bodyText">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id} className="hover:bg-neutral-offWhiteBlue">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-primary-deepBlue">
                          {student.studentId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-primary-deepBlue">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-neutral-bodyText">
                            {student.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-primary-deepBlue">
                            {student.degreePackage}
                          </div>
                          <div className="text-sm text-neutral-bodyText">
                            {student.major}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1 capitalize">{student.status.replace('-', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-bodyText">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => setSelectedStudent(student)}
                          size="sm"
                          variant="outline"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-neutral-lightGray">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-bodyText">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    size="sm"
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    size="sm"
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Student Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <H3 className="text-primary-deepBlue">
                  Create New Student
                </H3>
                <Button
                  onClick={() => setShowCreateModal(false)}
                  size="sm"
                  variant="outline"
                >
                  Close
                </Button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={createForm.firstName}
                        onChange={(e) => handleCreateFormChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={createForm.lastName}
                        onChange={(e) => handleCreateFormChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={createForm.email}
                        onChange={(e) => handleCreateFormChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={createForm.phone}
                        onChange={(e) => handleCreateFormChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={createForm.dateOfBirth}
                        onChange={(e) => handleCreateFormChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Gender *
                      </label>
                      <select
                        value={createForm.gender}
                        onChange={(e) => handleCreateFormChange('gender', e.target.value as 'male' | 'female' | 'other')}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Address Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={createForm.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={createForm.address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        value={createForm.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        value={createForm.address.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        value={createForm.address.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Academic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Degree Package *
                      </label>
                      <input
                        type="text"
                        value={createForm.degreePackage}
                        onChange={(e) => handleCreateFormChange('degreePackage', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        placeholder="e.g., Bachelor's Degree"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Major *
                      </label>
                      <input
                        type="text"
                        value={createForm.major}
                        onChange={(e) => handleCreateFormChange('major', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        placeholder="e.g., Computer Science"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Year of Graduation *
                      </label>
                      <input
                        type="date"
                        value={createForm.yearOfGraduation}
                        onChange={(e) => handleCreateFormChange('yearOfGraduation', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Status *
                      </label>
                      <select
                        value={createForm.status}
                        onChange={(e) => handleCreateFormChange('status', e.target.value as 'pending' | 'approved' | 'rejected' | 'in-review')}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      >
                        <option value="pending">Pending</option>
                        <option value="in-review">In Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Parent/Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={createForm.parentGuardian.name}
                        onChange={(e) => handleParentGuardianChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Relationship *
                      </label>
                      <input
                        type="text"
                        value={createForm.parentGuardian.relationship}
                        onChange={(e) => handleParentGuardianChange('relationship', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        placeholder="e.g., Father, Mother, Guardian"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={createForm.parentGuardian.phone}
                        onChange={(e) => handleParentGuardianChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={createForm.parentGuardian.email}
                        onChange={(e) => handleParentGuardianChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Admin Notes</h4>
                  <div>
                    <label className="block text-sm font-medium text-neutral-bodyText mb-2">
                      Notes
                    </label>
                    <textarea
                      value={createForm.adminNotes}
                      onChange={(e) => handleCreateFormChange('adminNotes', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent h-24 resize-none"
                      placeholder="Add any notes about this student..."
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white"
                  >
                    {isCreating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      'Create Student'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <H3 className="text-primary-deepBlue">
                  Student Details
                </H3>
                <Button
                  onClick={() => setSelectedStudent(null)}
                  size="sm"
                  variant="outline"
                >
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-neutral-bodyText">Student ID</label>
                      <p className="font-medium text-primary-deepBlue">{selectedStudent.studentId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Name</label>
                      <p className="font-medium">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Email</label>
                      <p className="font-medium">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Phone</label>
                      <p className="font-medium">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status)}`}>
                        {getStatusIcon(selectedStudent.status)}
                        <span className="ml-1 capitalize">{selectedStudent.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Academic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-neutral-bodyText">Degree Package</label>
                      <p className="font-medium">{selectedStudent.degreePackage}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Major</label>
                      <p className="font-medium">{selectedStudent.major}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Documents</h4>
                  <div className="space-y-3">
                    {selectedStudent.documents?.passport && (
                      <div className="flex items-center justify-between p-3 bg-neutral-offWhiteBlue rounded-2xl">
                        <div>
                          <p className="text-sm font-medium text-primary-deepBlue">Passport/ID</p>
                          <p className="text-xs text-neutral-bodyText">{selectedStudent.documents.passport}</p>
                        </div>
                        <Button
                          onClick={() => window.open(`/api/uploads${selectedStudent.documents?.passport}`, '_blank')}
                          size="sm"
                          variant="outline"
                        >
                          Download
                        </Button>
                      </div>
                    )}
                    {selectedStudent.documents?.drivingLicense && (
                      <div className="flex items-center justify-between p-3 bg-neutral-offWhiteBlue rounded-2xl">
                        <div>
                          <p className="text-sm font-medium text-primary-deepBlue">Driving License</p>
                          <p className="text-xs text-neutral-bodyText">{selectedStudent.documents.drivingLicense}</p>
                        </div>
                        <Button
                          onClick={() => window.open(`/api/uploads${selectedStudent.documents?.drivingLicense}`, '_blank')}
                          size="sm"
                          variant="outline"
                        >
                          Download
                        </Button>
                      </div>
                    )}
                    {selectedStudent.documents?.workExperience && (
                      <div className="flex items-center justify-between p-3 bg-neutral-offWhiteBlue rounded-2xl">
                        <div>
                          <p className="text-sm font-medium text-primary-deepBlue">Work Experience</p>
                          <p className="text-xs text-neutral-bodyText">{selectedStudent.documents.workExperience}</p>
                        </div>
                        <Button
                          onClick={() => window.open(`/api/uploads${selectedStudent.documents?.workExperience}`, '_blank')}
                          size="sm"
                          variant="outline"
                        >
                          Download
                        </Button>
                      </div>
                    )}
                    {(!selectedStudent.documents?.passport && !selectedStudent.documents?.drivingLicense && !selectedStudent.documents?.workExperience) && (
                      <p className="text-sm text-neutral-bodyText">No documents uploaded</p>
                    )}
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Update Status</h4>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleStatusUpdate(selectedStudent._id, 'approved')}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(selectedStudent._id, 'rejected')}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(selectedStudent._id, 'in-review')}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Mark for Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 