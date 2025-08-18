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
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida ac elit eu egestas.",
  sections: [
    {
      title: "Academics",
      links: [
        { label: "Bachelor's Degree", href: "/bachelors" },
        { label: "Master's Degree", href: "/masters" },
        { label: "Doctorate Degree", href: "/doctorate" },
        { label: "Associate Degree", href: "/associate" },
        { label: "Diploma Degree", href: "/diploma" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { label: "Application Form", href: "/application" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "About",
      links: [
        { label: "Admission Requirements", href: "/admission" },
        { label: "Philosophy of AADU", href: "/philosophy" },
        { label: "List of Majors", href: "/majors" }
      ]
    }
  ]
}; 