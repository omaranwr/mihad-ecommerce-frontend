import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/lib/constants";

function MenuButton() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="text-primary-foreground bg-black/50 backdrop-blur-xl"
      >
        <SheetHeader>
          <div className="px-3 pt-6">
            <a href="/" className="font-heading text-xl">
              Logo
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
