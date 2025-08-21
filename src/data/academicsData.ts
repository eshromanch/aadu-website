export interface DegreeProgramData {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
}

export interface AvailableMajorsData {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
}

export interface EvaluationBodyData {
  title: string;
  paragraphs: string[];
  image: string;
}

// Hero Section Data
export const academicsHeroData = {
  title: "Turn Your Work Experience Into an Accredited Qualification",
  backgroundImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Degree Program Section Data
export const degreeProgramData: DegreeProgramData = {
  title: "Degree Program",
  description: "Discover our accredited degree programs that recognize your professional experience and support your career growth. Choose from Associate to Doctorate degrees tailored to your goals.",
  buttonText: "Learn More",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  imageAlt: "Person working at desk"
};

// Available Majors Section Data
export const availableMajorsData: AvailableMajorsData = {
  title: "Available Majors",
  description: "Explore a wide selection of majors across various fields, designed to match your expertise and career ambitions. Our accredited programs offer flexibility and recognition in disciplines that suit your work experience.",
  buttonText: "Learn More",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  imageAlt: "Person working at desk"
};

// Evaluation Body Section Data
export const evaluationBodyData: EvaluationBodyData = {
  title: "Evaluation Body",
  paragraphs: [
    "Our evaluation faculty is highly qualified and experienced in assessing the professional and life experience of our applicants. Many hold PhDs and Master’s degrees and are experts in their respective fields.",
    "Degrees are awarded in the major(s) requested by the applicant upon approval from a faculty member specializing in that discipline.",
    "To meet growing demand, we continually expand our faculty across diverse disciplines, enabling evaluation in virtually any major. Our faculty is organized by field to ensure thorough and credible assessments aligned with academic standards."
  ],
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}; 