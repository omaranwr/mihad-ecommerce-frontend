import { FacebookIcon, InstagramIcon } from "@/components/icons";

export const links = [
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
    name: "Collections",
    href: "/collections",
  },
  {
    name: "Contacts",
    href: "/contacts",
  },
] as const;

export const socials = [
  {
    link: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    link: "https://instagram.com",
    icon: InstagramIcon,
  },
] as const;
