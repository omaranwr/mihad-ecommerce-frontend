import { FacebookIcon, InstagramIcon } from "@/components/icons";

interface Link {
  name: string;
  href: string;
}

export const tokenName = "token";

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

export const facebookLink =
  "https://www.facebook.com/share/1CaDWcDfwi/?mibextid=wwXIfr";
export const instagramLink =
  "https://www.instagram.com/mehad.co_?igsh=dzVhOThlNmRyaGhm&utm_source=qr";

export const socials = [
  {
    link: facebookLink,
    name: "Facebook",
    icon: FacebookIcon,
  },
  {
    link: instagramLink,
    name: "Instagram",
    icon: InstagramIcon,
  },
] as const;

export const phoneNumber = "0103 5875066";

export const email = facebookLink;
