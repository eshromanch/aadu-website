"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { H2, H3, Body16 } from "@/components/common/Typography"
import { MessageSquare, Search, Eye, CheckCircle, XCircle, Clock, Mail } from "lucide-react"

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  createdAt: string
  adminNotes?: string
}

interface ContactStats {
  total: number
  new: number
  read: number
  replied: number
  closed: number
}

interface ContactManagementProps {
  onBack: () => void
}

export function ContactManagement({ onBack }: ContactManagementProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<ContactStats>({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    closed: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const fetchContacts = useCallback(async () => {
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

      const response = await fetch(`/api/admin/contacts?${params}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setContacts(data.data)
        setTotalPages(data.pagination.pages)
        
        // Calculate stats from the data
        const total = data.pagination.total
        const statusCounts = data.data.reduce((acc: Record<string, number>, contact: Contact) => {
          acc[contact.status] = (acc[contact.status] || 0) + 1
          return acc
        }, {})
        
        setStats({
          total,
          new: statusCounts.new || 0,
          read: statusCounts.read || 0,
          replied: statusCounts.replied || 0,
          closed: statusCounts.closed || 0
        })
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, statusFilter, searchTerm])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const handleStatusUpdate = async (contactId: string, newStatus: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus, adminNotes: notes })
      })

      if (response.ok) {
        fetchContacts() // Refresh the list
        setSelectedContact(null)
      }
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-50'
      case 'read': return 'text-yellow-600 bg-yellow-50'
      case 'replied': return 'text-green-600 bg-green-50'
      case 'closed': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <MessageSquare className="w-4 h-4" />
      case 'read': return <Eye className="w-4 h-4" />
      case 'replied': return <Mail className="w-4 h-4" />
      case 'closed': return <CheckCircle className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-neutral-offWhiteBlue">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-lightGray">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex items-center space-x-2"
              >
                ← Back to Dashboard
              </Button>
              <div>
                <H2 className="text-primary-deepBlue">Contact Management</H2>
                <Body16 className="text-neutral-bodyText">Manage contact form submissions</Body16>
              </div>
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
                <p className="text-sm text-neutral-bodyText">Total Messages</p>
                <p className="text-2xl font-bold text-primary-deepBlue">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary-dodgerBlue" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Read</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.read}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Replied</p>
                <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-bodyText">Closed</p>
                <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-600" />
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
                  placeholder="Search by name, email, or subject..."
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
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-offWhiteBlue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Received
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-bodyText uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-lightGray">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-deepBlue mx-auto"></div>
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-neutral-bodyText">
                      No contacts found
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-neutral-offWhiteBlue">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-primary-deepBlue">
                            {contact.name}
                          </div>
                          <div className="text-sm text-neutral-bodyText">
                            {contact.email}
                          </div>
                          <div className="text-sm text-neutral-bodyText">
                            {contact.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-primary-deepBlue">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-neutral-bodyText truncate max-w-xs">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {getStatusIcon(contact.status)}
                          <span className="ml-1 capitalize">{contact.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-bodyText">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => setSelectedContact(contact)}
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

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <H3 className="text-primary-deepBlue">
                  Contact Details
                </H3>
                <Button
                  onClick={() => setSelectedContact(null)}
                  size="sm"
                  variant="outline"
                >
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-neutral-bodyText">Name</label>
                      <p className="font-medium">{selectedContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Email</label>
                      <p className="font-medium">{selectedContact.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Phone</label>
                      <p className="font-medium">{selectedContact.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                        {getStatusIcon(selectedContact.status)}
                        <span className="ml-1 capitalize">{selectedContact.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message Details */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Message Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-neutral-bodyText">Subject</label>
                      <p className="font-medium">{selectedContact.subject}</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Message</label>
                      <div className="mt-2 p-4 bg-neutral-offWhiteBlue rounded-2xl">
                        <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-bodyText">Received</label>
                      <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-3">Update Status</h4>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleStatusUpdate(selectedContact._id, 'read')}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Mark as Read
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(selectedContact._id, 'replied')}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark as Replied
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(selectedContact._id, 'closed')}
                        size="sm"
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        Close
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