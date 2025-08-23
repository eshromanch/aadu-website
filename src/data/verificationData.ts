export interface StudentInfo {
  name: string
  registrationNo: string
  email: string
  session: string
  majorSubject: string
  gender: string
  institute: string
  dateOfBirth: string
  certificateNo: string
  status: 'pending' | 'approved' | 'rejected' | 'in-review'
  degreePackage: string
  phone: string
  appliedDate: string
}

// Mock student data - in real app this would come from API
export const mockStudentData: StudentInfo = {
  name: "Safikur Rahman",
  registrationNo: "14568423446",
  email: "safikurrahman@gmail.com",
  session: "2025",
  majorSubject: "Administration of justice",
  gender: "Male",
  institute: "AADU",
  dateOfBirth: "25/4/1998",
  certificateNo: "18564985421",
  status: "approved",
  degreePackage: "Bachelor's Degree",
  phone: "+1234567890",
  appliedDate: "2024-01-15T10:30:00.000Z"
}

// Hero data for verification page
export const verificationHeroData = {
  title: "AADU's Education Verification Service",
  backgroundImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
} 