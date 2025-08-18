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
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  buttonText: "Learn More"
};

// Degree Programs Section Data
export const degreeProgramsData: DegreeProgramsSectionData = {
  title: "Find a degree that fits your life",
  buttonText: "Learn More",
  programs: [
    {
      title: "Bachelor's Degree",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: "bg-primary-deepBlue",
      textColor: "text-neutral-offWhiteBlue"
    },
    {
      title: "Master's Degree",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: "bg-neutral-offWhiteBlue",
      textColor: "text-primary-deepBlue",
      hasShadow: true
    },
    {
      title: "Associate Degree",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: "bg-primary-deepBlue",
      textColor: "text-neutral-offWhiteBlue"
    }
  ]
};

// About Section Data
export const aboutData: AboutData = {
  title: "About Asian American Digital University (AADU)",
  description: "Asian American Digital University (AADU), accredited by the Education Accreditation Council of America (EACOA) since 1991, validates the real-world knowledge and experience of professionals by awarding Associate, Bachelor's, Master's, Doctorate degrees, and High School Diplomas across 180+ disciplines - based on rigorous faculty-led evaluation.",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  buttonText: "Learn More"
};

// FAQ Section Data
export const faqData: FAQItem[] = [
  {
    question: "Faculty of Science",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Faculty of Engineering",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Faculty of LAW",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Faculty of Business Administration",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Faculty of Business Medicine",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

// Call to Action Section Data
export const callToActionData: CallToActionData = {
  title: "Looking to advance your professional career with an academic degree?",
  buttonText: "View Our Degree Programs"
}; 