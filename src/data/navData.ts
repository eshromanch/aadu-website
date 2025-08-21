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
        label: "About life experience",
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
  {
    label: "Apply",
    href: "/apply",
  },
]; 