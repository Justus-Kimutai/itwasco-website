export const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Strategic Plan", href: "/strategic-plan" },
  { name: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  services: [
    { name: "Water Supply", href: "/services#water-supply" },
    { name: "New Connections", href: "/services#connections" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Strategic Plan", href: "/strategic-plan" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/contact#faq" },
    { name: "Report Issue", href: "/contact#report" },
  ],
} as const;
