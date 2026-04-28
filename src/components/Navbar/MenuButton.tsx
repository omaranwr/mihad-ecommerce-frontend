import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/lib/constants";
import Logo from "@/assets/logo.jpg";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function MenuButton({
  categories,
}: {
  categories: { name: string; link: string }[];
}) {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
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
        <div className="grid gap-3 px-10 py-8 text-lg">
          <ul className="flex flex-col gap-3">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
          <Separator />
          <Accordion>
            <AccordionItem>
              <AccordionTrigger className={"text-lg"}>
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3 px-5">
                  {categories.map((categorie, index) => (
                    <li key={index}>
                      <a
                        href={"/products/" + categorie.link}
                        className="text-base"
                      >
                        {categorie.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuButton;
