export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  description: string;
  sections: FooterSection[];
}

export const footerData: FooterData = {
  description: "AADU - American Academy of Distance University. Transform your work experience into an accredited degree and advance your professional career.",
  sections: [
    {
      title: "Academics",
      links: [
        { label: "Degree Programs", href: "/degree-programs" },
        { label: "Life Experience", href: "/life-experience" },
        { label: "Available Majors", href: "/majors" },
        { label: "Apply Now", href: "/apply" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { label: "About AADU", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Verification", href: "/verification" },
        { label: "Partnership Programs", href: "/partnership-programs" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Student Verification", href: "/verification" },
        { label: "Corporate Partnerships", href: "/partnership-programs/corporate" },
        { label: "Search", href: "/search" },
        { label: "Admin Panel", href: "/admin" }
      ]
    }
  ]
}; 