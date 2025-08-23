export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  category: SearchCategory
  tags: string[]
  content?: string
  image?: string
}

export type SearchCategory = 
  | "degree-programs"
  | "majors"
  | "pages"
  | "services"
  | "about"

// Comprehensive search data for the entire website
export const searchableContent: SearchResult[] = [
  // Degree Programs
  {
    id: "bachelors-degree",
    title: "Bachelor's Degree Program",
    description: "Complete your bachelor's degree with flexible learning options and recognized accreditation.",
    url: "/degree-programs/bachelors",
    category: "degree-programs",
    tags: ["bachelor", "undergraduate", "degree", "program"],
    content: "Our Bachelor's Degree Program offers comprehensive education in various fields including Business Administration, Computer Science, Engineering, Psychology, and more. Accredited and recognized worldwide."
  },
  {
    id: "masters-degree",
    title: "Master's Degree Program",
    description: "Advance your career with our master's degree programs designed for working professionals.",
    url: "/degree-programs/masters",
    category: "degree-programs",
    tags: ["master", "graduate", "degree", "program", "advanced"],
    content: "Master's Degree Program provides advanced education in Business Administration, Computer Science, Engineering, Psychology, Education, and other specialized fields."
  },
  {
    id: "doctorate-degree",
    title: "Doctorate Degree Program",
    description: "Achieve the highest level of academic achievement with our doctorate programs.",
    url: "/degree-programs/doctorate",
    category: "degree-programs",
    tags: ["doctorate", "phd", "degree", "program", "highest"],
    content: "Doctorate Degree Program offers the highest level of academic achievement in various disciplines including Business Administration, Computer Science, Engineering, and more."
  },
  {
    id: "associate-degree",
    title: "Associate Degree Program",
    description: "Start your educational journey with our associate degree programs.",
    url: "/degree-programs/associate",
    category: "degree-programs",
    tags: ["associate", "degree", "program", "foundation"],
    content: "Associate Degree Program provides foundational education in various fields, perfect for starting your academic journey."
  },
  {
    id: "high-school-diploma",
    title: "High School Diploma Program",
    description: "Complete your high school education with our flexible diploma program.",
    url: "/degree-programs/high-school",
    category: "degree-programs",
    tags: ["high school", "diploma", "program", "secondary"],
    content: "High School Diploma Program offers comprehensive secondary education with flexible learning options."
  },

  // Majors
  {
    id: "business-administration",
    title: "Business Administration",
    description: "Learn essential business skills and management principles.",
    url: "/majors",
    category: "majors",
    tags: ["business", "administration", "management", "commerce"],
    content: "Business Administration major covers management, marketing, finance, and organizational leadership."
  },
  {
    id: "computer-science",
    title: "Computer Science",
    description: "Develop programming skills and computer system knowledge.",
    url: "/majors",
    category: "majors",
    tags: ["computer", "science", "programming", "technology", "software"],
    content: "Computer Science major focuses on programming, algorithms, data structures, and software development."
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Study various engineering disciplines and technical problem-solving.",
    url: "/majors",
    category: "majors",
    tags: ["engineering", "technical", "problem-solving", "design"],
    content: "Engineering major covers various disciplines including mechanical, electrical, and civil engineering."
  },
  {
    id: "psychology",
    title: "Psychology",
    description: "Understand human behavior and mental processes.",
    url: "/majors",
    category: "majors",
    tags: ["psychology", "behavior", "mental", "human", "mind"],
    content: "Psychology major explores human behavior, mental processes, and psychological research methods."
  },
  {
    id: "education",
    title: "Education",
    description: "Prepare for a career in teaching and educational leadership.",
    url: "/majors",
    category: "majors",
    tags: ["education", "teaching", "learning", "pedagogy"],
    content: "Education major prepares students for careers in teaching, educational administration, and curriculum development."
  },

  // Pages
  {
    id: "about",
    title: "About AADU",
    description: "Learn about Asian American Digital University's mission, vision, and values.",
    url: "/about",
    category: "pages",
    tags: ["about", "university", "mission", "vision", "values"],
    content: "Asian American Digital University is committed to providing quality education and empowering students worldwide."
  },
  {
    id: "academics",
    title: "Academics",
    description: "Explore our academic programs and educational offerings.",
    url: "/academics",
    category: "pages",
    tags: ["academics", "programs", "education", "courses"],
    content: "Our academic programs include various degree levels and majors designed to meet diverse educational needs."
  },
  {
    id: "life-experience",
    title: "Life Experience Degrees",
    description: "Convert your work experience into academic credit and earn your degree faster.",
    url: "/life-experience",
    category: "pages",
    tags: ["life experience", "work experience", "credit", "faster degree"],
    content: "Life Experience Degrees allow you to convert your professional experience into academic credit, accelerating your degree completion."
  },
  {
    id: "partnership-programs",
    title: "Partnership Programs",
    description: "Corporate and community college partnership opportunities.",
    url: "/partnership-programs",
    category: "pages",
    tags: ["partnership", "corporate", "community college", "collaboration"],
    content: "Partnership Programs include corporate partnerships and community college collaborations to enhance educational opportunities."
  },
  {
    id: "apply",
    title: "Apply for Your Degree",
    description: "Start your application process for any of our degree programs.",
    url: "/apply",
    category: "pages",
    tags: ["apply", "application", "enrollment", "admission"],
    content: "Apply for your degree through our comprehensive application process. Submit your documents and start your educational journey."
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with our team for support and inquiries.",
    url: "/contact",
    category: "pages",
    tags: ["contact", "support", "inquiry", "help"],
    content: "Contact our team for support, inquiries, or assistance with your educational journey."
  },
  {
    id: "verification",
    title: "Education Verification Service",
    description: "Verify academic credentials and certificates.",
    url: "/verification",
    category: "pages",
    tags: ["verification", "credentials", "certificates", "academic"],
    content: "Education Verification Service provides credential verification for employers and institutions."
  },

  // Services
  {
    id: "verification-service",
    title: "Verification Services",
    description: "Professional verification of academic credentials and certificates.",
    url: "/verification",
    category: "services",
    tags: ["verification", "credentials", "certificates", "academic", "service"],
    content: "Our verification services include academic credential verification, certificate authentication, and employer verification support."
  },
  {
    id: "corporate-partnership",
    title: "Corporate Partnership Program",
    description: "Partner with AADU to enhance your organization's educational benefits.",
    url: "/partnership-programs/corporate",
    category: "services",
    tags: ["corporate", "partnership", "business", "organization"],
    content: "Corporate Partnership Program offers customized educational solutions for organizations and their employees."
  },
  {
    id: "community-college-partnership",
    title: "Community College Partnership",
    description: "Collaborate with community colleges to expand educational opportunities.",
    url: "/partnership-programs",
    category: "services",
    tags: ["community college", "partnership", "collaboration", "education"],
    content: "Community College Partnership program facilitates collaboration between AADU and community colleges."
  }
]

// Search function
export function searchContent(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase().trim()
  
  if (!searchTerm) return []

  return searchableContent.filter(item => {
    const searchableText = [
      item.title.toLowerCase(),
      item.description.toLowerCase(),
      item.content?.toLowerCase() || "",
      ...item.tags.map(tag => tag.toLowerCase())
    ].join(" ")

    return searchableText.includes(searchTerm)
  }).sort((a, b) => {
    // Prioritize exact title matches
    const aTitleMatch = a.title.toLowerCase().includes(searchTerm)
    const bTitleMatch = b.title.toLowerCase().includes(searchTerm)
    
    if (aTitleMatch && !bTitleMatch) return -1
    if (!aTitleMatch && bTitleMatch) return 1
    
    // Then prioritize by category relevance
    const categoryPriority = ["degree-programs", "majors", "pages", "services", "about"]
    const aPriority = categoryPriority.indexOf(a.category)
    const bPriority = categoryPriority.indexOf(b.category)
    
    return aPriority - bPriority
  })
}

// Get search suggestions
export function getSearchSuggestions(query: string): string[] {
  const searchTerm = query.toLowerCase().trim()
  
  if (!searchTerm) return []

  const suggestions = new Set<string>()
  
  searchableContent.forEach(item => {
    if (item.title.toLowerCase().includes(searchTerm)) {
      suggestions.add(item.title)
    }
    if (item.description.toLowerCase().includes(searchTerm)) {
      suggestions.add(item.description)
    }
    item.tags.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        suggestions.add(tag)
      }
    })
  })

  return Array.from(suggestions).slice(0, 5)
} 