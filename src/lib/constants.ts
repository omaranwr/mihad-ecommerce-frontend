import { FacebookIcon, InstagramIcon } from "@/components/icons";

interface Link {
  name: string;
  href: string;
}

export const links: Link[] = [
  {
    name: "About us",
    href: "/about",
  },
  {
    name: "FAQs",
    href: "/faq",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Contacts",
    href: "/contacts",
  },
] as const;

export const legalLinks: Link[] = [
  {
    name: "Legal information",
    href: "/legal",
  },
  {
    name: "Privacy policy",
    href: "/privacy-policy",
  },
  {
    name: "Terms of service",
    href: "/terms-of-service",
  },
] as const;

export const socials = [
  {
    link: "https://www.facebook.com/share/1CaDWcDfwi/?mibextid=wwXIfr",
    name: "Facebook",
    icon: FacebookIcon,
  },
  {
    link: "https://www.instagram.com/mehad.co_?igsh=dzVhOThlNmRyaGhm&utm_source=qr",
    name: "Instagram",
    icon: InstagramIcon,
  },
] as const;

export const phoneNumber = "0103 5875066";
