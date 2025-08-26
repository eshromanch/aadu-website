export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: "BookOpen" | "Truck" | "Globe" | "GraduationCap";
  link?: string;
}

export interface PartnerAdvantage {
  title: string;
  description: string;
}

export interface CorporatePartnershipData {
  aboutProgram: string[];
  aboutProgramImage: string;
  features: Feature[];
  partnerAdvantages: {
    intro: string;
    advantages: PartnerAdvantage[];
  };
  partnerAdvantagesImage: string;
}

export const corporatePartnershipData: CorporatePartnershipData = {
  aboutProgram: [
    "AADU partners with corporations to invest in their employees' career growth, boosting productivity and organizational success. Our corporate partnership program is designed to recognize and validate the real-world experience of your workforce.",
    "We stay updated with industry trends and allow employees to choose from tailored majors that align with their professional expertise and career goals."
  ],
  aboutProgramImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  
  features: [
    {
      id: "no-classes",
      title: "No Classes, No Exams",
      description: "Earn your bachelor's degree based on work/life experience without admission exams, classes, or course books.",
      icon: "BookOpen"
    },
    {
      id: "fast-evaluation",
      title: "Fast and Professional Evaluation",
      description: "Applications are reviewed by expert faculty and degrees are delivered via FedEx/DHL in just 20 days.",
      icon: "Truck"
    },
    {
      id: "globally-recognized",
      title: "Globally Recognized Accreditation",
      description: "American University is accredited by EACOA, ensuring your bachelor's degree is recognized and trusted worldwide.",
      icon: "Globe"
    },
    {
      id: "majors",
      title: "Major in over 180+ subjects",
      description: "Choose from over 180 available majors for your Bachelor's degree.",
      icon: "GraduationCap",
      link: "View list of all available majors"
    }
  ],
  
  partnerAdvantages: {
    intro: "Our corporate partnership program offers significant benefits for both employees and organizations, creating a win-win situation for career development and business growth.",
    advantages: [
      {
        title: "Cost Savings",
        description: "Enjoy significant discounts on degree programs, streamlined application processes, and elimination of travel costs associated with traditional education."
      },
      {
        title: "Customized Life Degree Programs",
        description: "Receive subject-wise scores on transcripts instead of just 'Pass,' providing detailed recognition of specific skills and knowledge areas."
      }
    ]
  },
  
  partnerAdvantagesImage: "/images/Partner Advantages.jpg"
}; 