import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/lib/constants";
import Logo from "@/assets/logo.jpg";

function MenuButton() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-primary/50 text-primary-foreground"
      >
        <SheetHeader>
          <div className="px-3 pt-6">
            <a
              href="/"
              className="font-heading flex items-center gap-2 text-2xl"
            >
              <img
                src={Logo.src}
                alt="Logo"
                className="h-10 w-10 rounded-full"
              />{" "}
              Mehad
            </a>
          </div>
        </SheetHeader>
        <ul className="flex flex-col gap-3 px-10 py-8 text-lg">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default MenuButton;
