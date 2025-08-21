export interface PartnershipProgram {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  variant: "light" | "dark";
}

export const partnershipProgramsData: PartnershipProgram[] = [
  {
    id: "corporate",
    title: "Corporate Partnership Program",
    description: "Partner with us to offer your employees accredited degrees based on their work experience, supporting career growth.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Corporate team meeting around a table",
    buttonText: "Learn More",
    variant: "dark"
  },
  {
    id: "community-college",
    title: "Community College Partnership Program",
    description: "Work with AADU to help your students earn accredited degrees by recognizing their life and work experience.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Students studying in a library",
    buttonText: "Learn More",
    variant: "light"
  }
]; 