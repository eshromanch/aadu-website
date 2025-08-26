export interface HeroData {
  title: string;
  backgroundImage: string;
}

export interface TestimonialData {
  quote: string;
  author: string;
  position: string;
  image: string;
}

export interface LifeExperienceData {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export interface DegreeProgramData {
  title: string;
  image: string;
  bgColor: string;
  textColor: string;
  hasShadow?: boolean;
  link: string;
}

export interface DegreeProgramsSectionData {
  title: string;
  buttonText: string;
  programs: DegreeProgramData[];
}

export interface AboutData {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CallToActionData {
  title: string;
  buttonText: string;
}

// Hero Section Data
export const heroData: HeroData = {
  title: "Turn Your Work Experience Into an Accredited Degree",
  backgroundImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Testimonial Section Data
export const testimonialData: TestimonialData = {
  quote: "Whether you are seeking advancement in your current position, or preparing for a career change, American's accredited and recognized life experience degree programs can greatly enhance your chances.",
  author: "Md. Jolilur Rahman",
  position: "Director, AADU",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Life Experience Section Data
export const lifeExperienceData: LifeExperienceData = {
  title: "What Are Life Experience Degrees?",
  description: "Many people gain valuable knowledge outside the classroom—through years of work, business, travel, or personal learning. Life experience degrees formally recognize this real-world expertise and award accredited degrees based on it.",
  image: "/images/What Are Life Experience Degrees - Card- Home Page.png",
  buttonText: "Learn More"
};

// Degree Programs Section Data
export const degreeProgramsData: DegreeProgramsSectionData = {
  title: "Find a degree that fits your life",
  buttonText: "Learn More",
  programs: [
    {
      title: "Bachelor's Degree",
      image: "/images/Community College Program Card.png",
      bgColor: "bg-primary-deepBlue",
      textColor: "text-neutral-offWhiteBlue",
      link: "/degree-programs/bachelors"
    },
    {
      title: "Master's Degree",
      image: "/images/Community College Program Card.png",
      bgColor: "bg-neutral-offWhiteBlue",
      textColor: "text-primary-deepBlue",
      hasShadow: true,
      link: "/degree-programs/masters"
    },
    {
      title: "Associate Degree",
      image: "/images/Community College Program Card.png",
      bgColor: "bg-primary-deepBlue",
      textColor: "text-neutral-offWhiteBlue",
      link: "/degree-programs/associate"
    }
  ]
};

// About Section Data
export const aboutData: AboutData = {
  title: "About Asian American Digital University (AADU)",
  description: "Asian American Digital University (AADU), accredited by the Education Accreditation Council of America (EACOA) since 1991, validates the real-world knowledge and experience of professionals by awarding Associate, Bachelor's, Master's, Doctorate degrees, and High School Diplomas across 180+ disciplines - based on rigorous faculty-led evaluation.",
  image: "/images/About Asian American Digital University (AADU) - Card - Homepagge.png",
  buttonText: "Learn More"
};

// FAQ Section Data
export const faqData: FAQItem[] = [
  {
    question: "What are life experience degrees?",
    answer: "Life experience degrees are accredited academic qualifications awarded based on your professional work experience, skills, and knowledge gained outside traditional classroom settings. They recognize real-world expertise and allow you to earn a degree without attending classes or taking exams."
  },
  {
    question: "How long does it take to receive my degree?",
    answer: "You can receive your accredited degree within 20-45 days after your application is approved. We use FedEx/DHL for fast and secure delivery to ensure you get your degree quickly and safely."
  },
  {
    question: "Are these degrees recognized internationally?",
    answer: "Yes, our degrees are internationally recognized. AADU is accredited by the Education Accreditation Council of America (EACOA) since 1991, ensuring your degree is credible and accepted worldwide for career advancement and professional purposes."
  },
  {
    question: "What types of degrees are available?",
    answer: "We offer Associate, Bachelor's, Master's, Doctorate degrees, and High School Diplomas across 180+ disciplines. You can choose from various fields including Business, Engineering, Science, Arts, and many more based on your experience."
  },
  {
    question: "Do I need to take classes or exams?",
    answer: "No, there are no classes, exams, or course books required. Your degree is awarded based on the evaluation of your professional experience, work history, and skills by our expert faculty members."
  },
  {
    question: "What documents will I receive?",
    answer: "You'll receive 10 official documents including 1 Original Accredited Degree, 2 Original Transcripts, 1 Award of Excellence, 1 Certificate of Distinction, 1 Certificate of Membership, and 4 Education Verification Letters."
  }
];

// Call to Action Section Data
export const callToActionData: CallToActionData = {
  title: "Looking to advance your professional career with an academic degree?",
  buttonText: "View Our Degree Programs"
}; 