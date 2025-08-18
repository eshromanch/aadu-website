export interface AboutHeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface OurStoryData {
  title: string;
  description: string;
  image: string;
}

export interface MissionVisionData {
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  image: string;
}

export interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

export interface OurValuesData {
  title: string;
  image: string;
  values: ValueCard[];
}

export interface AccreditationRecognitionData {
  title: string;
  description: string;
  image: string;
}

export interface EvaluationBodyData {
  title: string;
  paragraphs: string[];
  image: string;
}

export interface BranchInfo {
  title: string;
  address: string;
  phone: string;
  email: string;
}

export interface TalkWithUsData {
  title: string;
  description: string;
  branches: BranchInfo[];
}

// About Hero Section Data
export const aboutHeroData: AboutHeroData = {
  title: "About AADU",
  subtitle: "Empowering Professionals Through Accredited Recognition",
  backgroundImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Our Story Section Data
export const ourStoryData: OurStoryData = {
  title: "Our Story",
  description: "Founded to bridge real-world experience with formal education, AADU has been accredited by the Education Accreditation Council of America (EACOA) since 1991. We help professionals turn their life and work experience into recognized academic degrees without traditional coursework.",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Mission & Vision Section Data
export const missionVisionData: MissionVisionData = {
  mission: {
    title: "Mission",
    description: "To provide accessible, credible academic credentials by validating the professional achievements and life experience of working adults."
  },
  vision: {
    title: "Vision",
    description: "To lead globally in recognizing experiential learning and empower individuals through accredited credentials."
  },
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Our Values Section Data
export const ourValuesData: OurValuesData = {
  title: "Our Values",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  values: [
    {
      icon: "/icons/integrity.svg",
      title: "Integrity",
      description: "Rigorous, fair evaluations."
    },
    {
      icon: "/icons/accessibility.svg",
      title: "Accessibility",
      description: "Academic Degrees for all professionals."
    },
    {
      icon: "/icons/excellence.svg",
      title: "Excellence",
      description: "Quality, recognized credentials."
    },
    {
      icon: "/icons/growth.svg",
      title: "Growth",
      description: "Enabling career advancement"
    }
  ]
};

// Accreditation & Recognition Section Data
export const accreditationRecognitionData: AccreditationRecognitionData = {
  title: "Accreditation & Recognition",
  description: "AADU is accredited by the Education Accreditation Council of America (EACOA) since 1991, ensuring our degrees meet global academic standards and are widely recognized.",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Evaluation Body Section Data
export const evaluationBodyData: EvaluationBodyData = {
  title: "Evaluation Body",
  paragraphs: [
    "Our evaluation faculty is highly qualified and experienced in assessing the professional and life experience of our applicants. Many hold PhDs and Master's degrees and are experts in their respective fields.",
    "Degrees are awarded in the major(s) requested by the applicant upon approval from a faculty member specializing in that discipline.",
    "To meet growing demand, we continually expand our faculty across diverse disciplines, enabling evaluation in virtually any major. Our faculty is organized by field to ensure thorough and credible assessments aligned with academic standards."
  ],
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Talk With Us Section Data
export const talkWithUsData: TalkWithUsData = {
  title: "Talk with us",
  description: "Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.",
  branches: [
    {
      title: "Bangladesh Branch",
      address: "ABC North Ridge, plot-51, Road-15, Sector-3, Uttara, Dhaka-1230",
      phone: "+8801822806311",
      email: "aauedu68@gmail.com"
    },
    {
      title: "Thailand Branch",
      address: "17th, 2nd Floor, Soi Ramkham Haeng 2 Suangluang Bangkok, 10250",
      phone: "+660827296334",
      email: "aauedu68@gmail.com"
    }
  ]
}; 