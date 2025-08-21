export interface Major {
  id: string;
  name: string;
}

export interface Faculty {
  id: string;
  name: string;
  majors: Major[];
}

export const faculties: Faculty[] = [
  {
    id: "science",
    name: "Faculty of Science",
    majors: [
      { id: "accounting", name: "Accounting" },
      { id: "administration-justice", name: "Administration of Justice" },
      { id: "advertising", name: "Advertising" },
      { id: "aeronautical-engineering", name: "Aeronautical Engineering" },
      { id: "aerospace-engineering", name: "Aerospace Engineering" },
      { id: "aerospace-management", name: "Aerospace Management" },
      { id: "american-studies", name: "American Studies" },
      { id: "animal-behavior", name: "Animal Behavior" },
      { id: "anthropology", name: "Anthropology" },
      { id: "applied-mathematics", name: "Applied Mathematics" },
      { id: "architecture", name: "Architecture" },
      { id: "art-history", name: "Art History" },
      { id: "astronomy", name: "Astronomy" },
      { id: "biochemistry", name: "Biochemistry" },
      { id: "biology", name: "Biology" },
      { id: "biomedical-engineering", name: "Biomedical Engineering" },
      { id: "biotechnology", name: "Biotechnology" },
      { id: "business-administration", name: "Business Administration" },
      { id: "chemical-engineering", name: "Chemical Engineering" },
      { id: "chemistry", name: "Chemistry" },
      { id: "civil-engineering", name: "Civil Engineering" },
      { id: "communications", name: "Communications" },
      { id: "computer-engineering", name: "Computer Engineering" },
      { id: "computer-science", name: "Computer Science" },
      { id: "criminal-justice", name: "Criminal Justice" },
      { id: "data-science", name: "Data Science" },
      { id: "economics", name: "Economics" },
      { id: "electrical-engineering", name: "Electrical Engineering" },
      { id: "environmental-science", name: "Environmental Science" },
      { id: "finance", name: "Finance" },
      { id: "geology", name: "Geology" },
      { id: "health-sciences", name: "Health Sciences" },
      { id: "history", name: "History" },
      { id: "human-resources", name: "Human Resources" },
      { id: "information-technology", name: "Information Technology" },
      { id: "international-relations", name: "International Relations" },
      { id: "journalism", name: "Journalism" },
      { id: "linguistics", name: "Linguistics" },
      { id: "marketing", name: "Marketing" },
      { id: "mathematics", name: "Mathematics" },
      { id: "mechanical-engineering", name: "Mechanical Engineering" },
      { id: "microbiology", name: "Microbiology" },
      { id: "nursing", name: "Nursing" },
      { id: "philosophy", name: "Philosophy" },
      { id: "physics", name: "Physics" },
      { id: "political-science", name: "Political Science" },
      { id: "psychology", name: "Psychology" },
      { id: "public-health", name: "Public Health" },
      { id: "social-work", name: "Social Work" },
      { id: "sociology", name: "Sociology" },
      { id: "statistics", name: "Statistics" },
      { id: "sustainable-development", name: "Sustainable Development" },
      { id: "urban-planning", name: "Urban Planning" },
      { id: "zoology", name: "Zoology" }
    ]
  },
  {
    id: "engineering",
    name: "Faculty of Engineering",
    majors: [
      { id: "aerospace-eng", name: "Aerospace Engineering" },
      { id: "biomedical-eng", name: "Biomedical Engineering" },
      { id: "chemical-eng", name: "Chemical Engineering" },
      { id: "civil-eng", name: "Civil Engineering" },
      { id: "computer-eng", name: "Computer Engineering" },
      { id: "electrical-eng", name: "Electrical Engineering" },
      { id: "environmental-eng", name: "Environmental Engineering" },
      { id: "industrial-eng", name: "Industrial Engineering" },
      { id: "materials-eng", name: "Materials Engineering" },
      { id: "mechanical-eng", name: "Mechanical Engineering" },
      { id: "nuclear-eng", name: "Nuclear Engineering" },
      { id: "petroleum-eng", name: "Petroleum Engineering" },
      { id: "robotics-eng", name: "Robotics Engineering" },
      { id: "software-eng", name: "Software Engineering" },
      { id: "systems-eng", name: "Systems Engineering" }
    ]
  },
  {
    id: "law",
    name: "Faculty of LAW",
    majors: [
      { id: "constitutional-law", name: "Constitutional Law" },
      { id: "criminal-law", name: "Criminal Law" },
      { id: "environmental-law", name: "Environmental Law" },
      { id: "family-law", name: "Family Law" },
      { id: "health-law", name: "Health Law" },
      { id: "immigration-law", name: "Immigration Law" },
      { id: "intellectual-property", name: "Intellectual Property Law" },
      { id: "international-law", name: "International Law" },
      { id: "labor-law", name: "Labor Law" },
      { id: "tax-law", name: "Tax Law" },
      { id: "corporate-law", name: "Corporate Law" },
      { id: "civil-litigation", name: "Civil Litigation" },
      { id: "human-rights-law", name: "Human Rights Law" },
      { id: "real-estate-law", name: "Real Estate Law" },
      { id: "cyber-law", name: "Cyber Law" }
    ]
  },
  {
    id: "business",
    name: "Faculty of Business Administration",
    majors: [
      { id: "accounting-bus", name: "Accounting" },
      { id: "business-analytics", name: "Business Analytics" },
      { id: "entrepreneurship", name: "Entrepreneurship" },
      { id: "finance-bus", name: "Finance" },
      { id: "healthcare-management", name: "Healthcare Management" },
      { id: "human-resources-bus", name: "Human Resources Management" },
      { id: "international-business", name: "International Business" },
      { id: "logistics", name: "Logistics & Supply Chain Management" },
      { id: "management", name: "Management" },
      { id: "marketing-bus", name: "Marketing" },
      { id: "operations-management", name: "Operations Management" },
      { id: "project-management", name: "Project Management" },
      { id: "public-administration", name: "Public Administration" },
      { id: "real-estate", name: "Real Estate Management" },
      { id: "risk-management", name: "Risk Management" },
      { id: "strategic-management", name: "Strategic Management" },
      { id: "sustainability-business", name: "Sustainability Management" },
      { id: "technology-management", name: "Technology Management" },
      { id: "tourism-management", name: "Tourism Management" }
    ]
  },
  {
    id: "medicine",
    name: "Faculty of Business Medicine",
    majors: [
      { id: "biomedical-sciences", name: "Biomedical Sciences" },
      { id: "clinical-research", name: "Clinical Research" },
      { id: "healthcare-administration", name: "Healthcare Administration" },
      { id: "healthcare-informatics", name: "Healthcare Informatics" },
      { id: "medical-technology", name: "Medical Technology" },
      { id: "nursing-administration", name: "Nursing Administration" },
      { id: "pharmaceutical-sciences", name: "Pharmaceutical Sciences" },
      { id: "public-health-med", name: "Public Health" },
      { id: "healthcare-policy", name: "Healthcare Policy" },
      { id: "medical-ethics", name: "Medical Ethics" },
      { id: "healthcare-finance", name: "Healthcare Finance" },
      { id: "healthcare-marketing", name: "Healthcare Marketing" },
      { id: "healthcare-quality", name: "Healthcare Quality Management" },
      { id: "healthcare-technology", name: "Healthcare Technology Management" },
      { id: "medical-device-management", name: "Medical Device Management" }
    ]
  }
]; 