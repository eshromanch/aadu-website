import { SectionContainer } from "@/components/common/SectionContainer"
import { H3 } from "@/components/common/Typography"
import Image from "next/image"
import { type StudentInfo } from "@/data/verificationData"
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react"

interface CertificationSummaryProps {
  studentInfo: StudentInfo
}

export function CertificationSummary({ studentInfo }: CertificationSummaryProps) {
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
      default: return <FileText className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'N/A'
    }
  }

  return (
    <div className="bg-white rounded-[25px] shadow-lg overflow-hidden border border-neutral-lightGray">
      {/* Header */}
      <div className="bg-primary-deepBlue px-8 py-6">
        <div className="flex items-center justify-between">
          <H3 className="text-white">Certification Summary</H3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(studentInfo.status)}`}>
            {getStatusIcon(studentInfo.status)}
            <span className="ml-1 capitalize">{studentInfo.status.replace('-', ' ')}</span>
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Profile Picture */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-neutral-lightGray border-2 border-neutral-lightGray">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Student Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Center - Student Information */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Student Name:</span>
                  <span className="text-sm font-semibold text-primary-deepBlue">{studentInfo.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Registration No:</span>
                  <span className="text-sm font-semibold">{studentInfo.registrationNo}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Email Address:</span>
                  <span className="text-sm font-semibold">{studentInfo.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Phone Number:</span>
                  <span className="text-sm font-semibold">{studentInfo.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Session:</span>
                  <span className="text-sm font-semibold">{studentInfo.session}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Major Subject:</span>
                  <span className="text-sm font-semibold text-primary-deepBlue">{studentInfo.majorSubject}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Degree Package:</span>
                  <span className="text-sm font-semibold">{studentInfo.degreePackage}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Institute:</span>
                  <span className="text-sm font-semibold">{studentInfo.institute}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Certificate No:</span>
                  <span className="text-sm font-semibold">{studentInfo.certificateNo}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-lightGray">
                  <span className="text-sm text-neutral-bodyText font-medium">Applied Date:</span>
                  <span className="text-sm font-semibold">{formatDate(studentInfo.appliedDate)}</span>
                </div>
              </div>
            </div>
            
            {/* Status Information */}
            <div className="mt-6 p-4 bg-neutral-offWhiteBlue rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-primary-deepBlue mb-1">Application Status</h4>
                  <p className="text-sm text-neutral-bodyText">
                    {studentInfo.status === 'approved' && 'This student has been approved and their degree is valid.'}
                    {studentInfo.status === 'rejected' && 'This application has been rejected.'}
                    {studentInfo.status === 'in-review' && 'This application is currently under review.'}
                    {studentInfo.status === 'pending' && 'This application is pending review.'}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(studentInfo.status)}`}>
                    {getStatusIcon(studentInfo.status)}
                    <span className="ml-1 capitalize">{studentInfo.status.replace('-', ' ')}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 