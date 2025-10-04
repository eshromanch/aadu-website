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

export interface CommunityPartnershipData {
  aboutProgram: string[];
  aboutProgramImage: string;
  features: Feature[];
  partnerAdvantages: {
    intro: string;
    advantages: PartnerAdvantage[];
  };
  partnerAdvantagesImage: string;
}

export const communityPartnershipData: CommunityPartnershipData = {
  aboutProgram: [
    "AADU partners with community organizations, non-profits, and educational institutions to provide accessible degree programs for community members. Our community partnership program focuses on empowering individuals through education and recognizing their valuable life experiences.",
    "We work closely with community leaders to identify educational needs and provide flexible, affordable degree options that fit the unique circumstances of community members."
  ],
  aboutProgramImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  
  features: [
    {
      id: "no-classes",
      title: "No Classes, No Exams",
      description: "Earn your degree based on life experience and community involvement without traditional academic requirements.",
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
      description: "American University is accredited by EACOA, ensuring your degree is recognized and trusted worldwide.",
      icon: "Globe"
    },
    {
      id: "majors",
      title: "Major in over 180+ subjects",
      description: "Choose from over 180 available majors for your degree program.",
      icon: "GraduationCap",
      link: "View list of all available majors"
    }
  ],
  
  partnerAdvantages: {
    intro: "Our community partnership program offers significant benefits for community organizations and their members, creating opportunities for educational advancement and community development.",
    advantages: [
      {
        title: "Community Discounts",
        description: "Special pricing for community members, group discounts for organizations, and flexible payment plans to make education accessible to everyone."
      },
      {
        title: "Community Recognition Programs",
        description: "Customized degree programs that recognize community service, volunteer work, and local leadership experience as valuable educational achievements."
      }
    ]
  },
  
  partnerAdvantagesImage: "/images/Partner Advantages.jpg"
};

