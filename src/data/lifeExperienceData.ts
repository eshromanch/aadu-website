export interface LifeExperienceItem {
  id: string;
  text: string;
}

export interface KeyBenefit {
  id: string;
  title: string;
}

export interface ContactInfo {
  country: string;
  address: string;
  phone: string;
  email: string;
}

export interface Certification {
  id: string;
  name: string;
  count: string;
  icon: string;
}

// What Are Life Experience Degrees Section
export const whatAreLifeExperienceDegrees = {
  title: "What Are Life Experience Degrees?",
  paragraphs: [
    "Many people gain valuable knowledge outside the classroom—through work, business, travel, or personal learning. Life experience degrees recognize this expertise by awarding accredited academic qualifications without traditional study.",
    "These degrees validate practical skills, allowing adults to earn recognized credentials without classes or exams. They bridge real-world experience and formal education, offering a credible alternative path.",
    "Life experience degrees help professionals advance careers, gain recognition, and unlock new opportunities by valuing their knowledge and skills."
  ],
  image: "/images/About Asian American Digital University (AADU) - Card - Homepagge.png",
  imageAlt: "Construction workers in safety gear"
};

// What Counts as Life Experience Section
export const whatCountsAsLifeExperience: LifeExperienceItem[] = [
  { id: "1", text: "Previous job experience in any field" },
  { id: "2", text: "Previous educational achievements" },
  { id: "3", text: "Employer-sponsored training & workshops" },
  { id: "4", text: "Participation in professional/nonprofessional organizations" },
  { id: "5", text: "Personal goals, hobbies, lifestyle, travel" },
  { id: "6", text: "Volunteer work & community service" },
  { id: "7", text: "Independent reading, viewing, listening, or writing" }
];

// About AADU Life Experience Degrees Section
export const aboutAADULifeExperienceDegrees = {
  title: "About AADU Life Experience Degrees",
  paragraphs: [
    "Asian American Digital University (AADU), accredited by Education Accreditation Council of America (EACOA), awards degrees based on rigorous evaluation of your professional experience across 180+ disciplines.",
    "Importantly, your official degree does not mention 'online' or 'Work experience,' making it identical in appearance and credibility to traditional university qualifications.",
    "No classes or exams are required, and you can receive your degree within weeks. Our internationally recognized credentials help advance your career globally with degrees as - Associate, Bachelor's, Master's, Doctorate degrees, and Diploma Degrees.",
    "We ensure transparent, fair evaluation - if you don't meet criteria, your application is declined with no hidden fees and full refund."
  ]
};

// List of Certifications Section
export const certifications: Certification[] = [
  { id: "1", name: "Original Accredited Degree", count: "1", icon: "/icons/graduation-cap 1.svg" },
  { id: "2", name: "Original Transcripts", count: "2", icon: "/icons/transcript (1) 1.svg" },
  { id: "3", name: "Award of Excellence", count: "1", icon: "/icons/Badge.svg" },
  { id: "4", name: "Certificate of Distinction", count: "1", icon: "/icons/crown.svg" },
  { id: "5", name: "Certificate of Membership", count: "1", icon: "/icons/certificate 1.svg" },
  { id: "6", name: "Education Verification Letters", count: "4", icon: "/icons/Verifications.svg" }
];

// Key Benefits Section
export const keyBenefits: KeyBenefit[] = [
  { id: "1", title: "No admission exams" },
  { id: "2", title: "No classes" },
  { id: "3", title: "No course books" },
  { id: "4", title: "No high fees" },
  { id: "5", title: "Delivered in 20 days" }
];

// Contact Information Section
export const contactInfo: ContactInfo[] = [
  {
    country: "Bangladesh Branch",
    address: "ABC North Ridge, plot-51, Road-15, Sector-3, Uttara, Dhaka-1230",
    phone: "+8801822806311",
    email: "aauedu68@gmail.com"
  },
  {
    country: "Thailand Branch",
    address: "17th, 2nd Floor, Soi Ramkham Haeng 2 Suangluang Bangkok, 10250",
    phone: "+660827296334",
    email: "aauedu68@gmail.com"
  }
]; 