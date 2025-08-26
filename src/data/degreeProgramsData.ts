export interface DegreeProgramCard {
  title: string;
  description: string;
  buttonText: string;
  variant: "dark" | "light";
  image: string;
  imageAlt: string;
}

export interface CallToActionData {
  title: string;
}

export interface IndividualDegreeProgram {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  aboutImage: string;
  aboutImageAlt: string;
  eligibilityImage: string;
  eligibilityImageAlt: string;
  aboutTheDegree: {
    paragraph1: string;
    paragraph2: string;
  };
  eligibilityCriteria: {
    intro: string;
    requirements: string[];
    conclusion: string;
  };
  price: string;
}

// Hero Section Data
export const degreeProgramsHeroData = {
  title: "Degree Programs at AADU",
  subtitle: "Unlock career growth with degree options that recognize your professional journey",
  backgroundImage: "/images/Bachelor's Degree.jpg"
};

// Degree Program Cards Data
export const degreePrograms: DegreeProgramCard[] = [
  {
    title: "Bachelor's Degree Program",
    description: "Earn an accredited Bachelor's degree based on your professional and life experience—no classes or exams required.",
    buttonText: "Learn More",
    variant: "light",
    image: "/images/Bachelor's Degree.jpg",
    imageAlt: "Person working at desk"
  },
  {
    title: "Master's Degree Program",
    description: "Advance your expertise with a Master's degree awarded through rigorous evaluation of your career achievements.",
    buttonText: "Learn More",
    variant: "light",
    image: "/images/masters degreee.jpg",
    imageAlt: "Person working at desk"
  },
  {
    title: "Doctorate Degree Program",
    description: "Achieve the highest academic honor with a Doctorate degree recognizing your extensive knowledge and contributions.",
    buttonText: "Learn More",
    variant: "light",
    image: "/images/Doctorate Degree.jpg",
    imageAlt: "Person working at desk"
  },
  {
    title: "Associate Degree Program",
    description: "Obtain an accredited Associate degree reflecting your practical experience without traditional coursework.",
    buttonText: "Learn More",
    variant: "light",
    image: "/images/Assosiate Degree.jpg",
    imageAlt: "Person working at desk"
  },
  {
    title: "High School Diploma Program",
    description: "Receive an accredited High School Diploma based on your life experience, opening doors to further education and opportunities.",
    buttonText: "Learn More",
    variant: "light",
    image: "/images/High school Diploma.jpg",
    imageAlt: "Person working at desk"
  }
];

// Individual Degree Program Data
export const individualDegreePrograms: IndividualDegreeProgram[] = [
  {
    id: "bachelors",
    title: "Bachelor's Degree Program",
    subtitle: "Earn your accredited degree based on real-life experience. no exams or classes required.",
    heroImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heroImageAlt: "Graduates in red caps and gowns",
    aboutImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    aboutImageAlt: "Person working at desk",
    eligibilityImage: "/images/About Asian American Digital University (AADU) - Card - Homepagge.png",
    eligibilityImageAlt: "Construction workers in safety gear",
    aboutTheDegree: {
      paragraph1: "The Bachelor's degree from Asian American Digital University (AADU) is an accredited academic qualification awarded based on the rigorous evaluation of your professional work and life experience. Designed for individuals with substantial expertise in their field, this degree validates your knowledge and skills without the need for traditional coursework or exams.",
      paragraph2: "The Bachelor's degree from Asian American Digital University (AADU) is fully accredited and recognized, as AADU holds accreditation from the Education Accreditation Council of America (EACOA). This credential validates your expertise and supports career advancement internationally."
    },
    eligibilityCriteria: {
      intro: "To qualify for a life experience degree at Asian American Digital University (AADU), applicants must meet the following requirements:",
      requirements: [
        "Minimum Work or Life Experience: At least 12 years of relevant professional or personal experience in the chosen discipline.",
        "Evidence of Expertise: Ability to provide verifiable documentation such as employment records, portfolios, project reports, or references demonstrating skills and accomplishments.",
        "Age Requirement: Applicants must be at least 21 years old.",
        "Educational Background: No formal education prerequisites; prior learning and experience are the basis for evaluation.",
        "Residency: Open to applicants worldwide.",
        "Commitment to Integrity: Submission of genuine and verifiable information for assessment."
      ],
      conclusion: "Applicants who meet these criteria will undergo a faculty-led evaluation to determine the appropriate degree level based on their experience."
    },
    price: "$499"
  },
  {
    id: "masters",
    title: "Master's Degree Program",
    subtitle: "Advance your expertise with a Master's degree awarded through rigorous evaluation of your career achievements.",
    heroImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heroImageAlt: "Graduates in red caps and gowns",
    aboutImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    aboutImageAlt: "Person working at desk",
    eligibilityImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eligibilityImageAlt: "Construction workers in safety gear",
    aboutTheDegree: {
      paragraph1: "The Master's degree from Asian American Digital University (AADU) represents advanced academic achievement based on extensive professional experience and specialized expertise. This degree is designed for professionals who have demonstrated exceptional knowledge and leadership in their field.",
      paragraph2: "The Master's degree from Asian American Digital University (AADU) is fully accredited and recognized, as AADU holds accreditation from the Education Accreditation Council of America (EACOA). This credential validates your advanced expertise and supports career advancement internationally."
    },
    eligibilityCriteria: {
      intro: "To qualify for a Master's degree at Asian American Digital University (AADU), applicants must meet the following requirements:",
      requirements: [
        "Advanced Work Experience: At least 15 years of relevant professional experience in the chosen discipline.",
        "Leadership Evidence: Demonstrated leadership roles, management experience, or significant project oversight.",
        "Age Requirement: Applicants must be at least 25 years old.",
        "Educational Background: Prior degree or equivalent professional experience required.",
        "Residency: Open to applicants worldwide.",
        "Commitment to Integrity: Submission of genuine and verifiable information for assessment."
      ],
      conclusion: "Applicants who meet these criteria will undergo a faculty-led evaluation to determine the appropriate degree level based on their experience."
    },
    price: "$699"
  },
  {
    id: "doctorate",
    title: "Doctorate Degree Program",
    subtitle: "Achieve the highest academic honor with a Doctorate degree recognizing your extensive knowledge and contributions.",
    heroImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heroImageAlt: "Graduates in red caps and gowns",
    aboutImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    aboutImageAlt: "Person working at desk",
    eligibilityImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eligibilityImageAlt: "Construction workers in safety gear",
    aboutTheDegree: {
      paragraph1: "The Doctorate degree from Asian American Digital University (AADU) represents the pinnacle of academic achievement, awarded to individuals who have made significant contributions to their field through extensive research, innovation, and leadership.",
      paragraph2: "The Doctorate degree from Asian American Digital University (AADU) is fully accredited and recognized, as AADU holds accreditation from the Education Accreditation Council of America (EACOA). This credential validates your highest level of expertise and supports career advancement internationally."
    },
    eligibilityCriteria: {
      intro: "To qualify for a Doctorate degree at Asian American Digital University (AADU), applicants must meet the following requirements:",
      requirements: [
        "Extensive Work Experience: At least 20 years of relevant professional experience in the chosen discipline.",
        "Research Contributions: Evidence of significant research, publications, or innovations in the field.",
        "Age Requirement: Applicants must be at least 30 years old.",
        "Educational Background: Master's degree or equivalent professional experience required.",
        "Residency: Open to applicants worldwide.",
        "Commitment to Integrity: Submission of genuine and verifiable information for assessment."
      ],
      conclusion: "Applicants who meet these criteria will undergo a faculty-led evaluation to determine the appropriate degree level based on their experience."
    },
    price: "$999"
  },
  {
    id: "associate",
    title: "Associate Degree Program",
    subtitle: "Obtain an accredited Associate degree reflecting your practical experience without traditional coursework.",
    heroImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heroImageAlt: "Graduates in red caps and gowns",
    aboutImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    aboutImageAlt: "Person working at desk",
    eligibilityImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eligibilityImageAlt: "Construction workers in safety gear",
    aboutTheDegree: {
      paragraph1: "The Associate degree from Asian American Digital University (AADU) is an accredited academic qualification awarded based on the evaluation of your practical work and life experience. Designed for individuals with foundational expertise in their field.",
      paragraph2: "The Associate degree from Asian American Digital University (AADU) is fully accredited and recognized, as AADU holds accreditation from the Education Accreditation Council of America (EACOA). This credential validates your expertise and supports career advancement internationally."
    },
    eligibilityCriteria: {
      intro: "To qualify for an Associate degree at Asian American Digital University (AADU), applicants must meet the following requirements:",
      requirements: [
        "Work Experience: At least 8 years of relevant professional or personal experience in the chosen discipline.",
        "Evidence of Skills: Ability to provide verifiable documentation demonstrating practical skills and knowledge.",
        "Age Requirement: Applicants must be at least 18 years old.",
        "Educational Background: No formal education prerequisites; prior learning and experience are the basis for evaluation.",
        "Residency: Open to applicants worldwide.",
        "Commitment to Integrity: Submission of genuine and verifiable information for assessment."
      ],
      conclusion: "Applicants who meet these criteria will undergo a faculty-led evaluation to determine the appropriate degree level based on their experience."
    },
    price: "$299"
  },
  {
    id: "diploma",
    title: "High School Diploma Program",
    subtitle: "Receive an accredited High School Diploma based on your life experience, opening doors to further education and opportunities.",
    heroImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    heroImageAlt: "Graduates in red caps and gowns",
    aboutImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    aboutImageAlt: "Person working at desk",
    eligibilityImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eligibilityImageAlt: "Construction workers in safety gear",
    aboutTheDegree: {
      paragraph1: "The High School Diploma from Asian American Digital University (AADU) is an accredited academic qualification awarded based on the evaluation of your life experience and practical knowledge. This diploma opens doors to further education and career opportunities.",
      paragraph2: "The High School Diploma from Asian American Digital University (AADU) is fully accredited and recognized, as AADU holds accreditation from the Education Accreditation Council of America (EACOA). This credential validates your knowledge and supports educational advancement."
    },
    eligibilityCriteria: {
      intro: "To qualify for a High School Diploma at Asian American Digital University (AADU), applicants must meet the following requirements:",
      requirements: [
        "Life Experience: At least 5 years of relevant life experience demonstrating practical knowledge and skills.",
        "Evidence of Learning: Ability to provide verifiable documentation of learning through various life experiences.",
        "Age Requirement: Applicants must be at least 16 years old.",
        "Educational Background: No formal education prerequisites; life experience is the basis for evaluation.",
        "Residency: Open to applicants worldwide.",
        "Commitment to Integrity: Submission of genuine and verifiable information for assessment."
      ],
      conclusion: "Applicants who meet these criteria will undergo a faculty-led evaluation to determine the appropriate diploma level based on their experience."
    },
    price: "$199"
  }
];

// Call to Action Data
export const callToActionData: CallToActionData = {
  title: "Get your desired degree delivered in just 45 days, with FREE shipping via FedEx"
}; 