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
    link: "https://www.facebook.com/share/1CaDWcDfwi/?mibextid=wwXIfr",
    icon: FacebookIcon,
  },
  {
    link: "https://www.instagram.com/mehad.co_?igsh=dzVhOThlNmRyaGhm&utm_source=qr",
    icon: InstagramIcon,
  },
] as const;

export const phoneNumber = "0103 5875066";
