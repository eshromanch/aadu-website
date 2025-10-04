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
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      {
        label: "Life Experience",
        href: "/life-experience",
      },
      {
        label: "Degree Programs",
        href: "/degree-programs",
      },
      {
        label: "Available Majors",
        href: "/majors",
      },
    ],
  },
  {
    label: "Partnership Programs",
    href: "/partnership-programs",
    children: [
      {
        label: "Corporate Partnership Program",
        href: "/partnership-programs/corporate",
      },
      {
        label: "Community Partnership Program",
        href: "/partnership-programs/community",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const topNavData: NavItem[] = [
  {
    label: "Majors",
    href: "/majors",
  },
  {
    label: "Verification",
    href: "/verification",
  },
  {
    label: "Apply",
    href: "/apply",
  },
]; 