export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigationData: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      {
        label: "Degree Programs",
        href: "/academics/degree-programs",
      },
      {
        label: "Available Majors",
        href: "/academics/majors",
      },
    ],
  },
  {
    label: "Partnership Programs",
    href: "/partnerships",
    children: [
      {
        label: "Corporate Partnership Program",
        href: "/partnerships/corporate",
      },
      {
        label: "Community College Partnership Program",
        href: "/partnerships/community-college",
      },
    ],
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];

export const topNavData: NavItem[] = [
  {
    label: "List of Majors",
    href: "/majors",
  },
  {
    label: "Verification",
    href: "/verification",
  },
]; 