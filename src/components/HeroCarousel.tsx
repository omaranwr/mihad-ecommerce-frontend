import { useEffect, useState, type ComponentProps } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { socials } from "@/lib/constants";

function HeroCarousel({
  panels,
}: {
  panels: {
    image: ComponentProps<"img">;
    link: { name: string; href: string };
  }[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    api?.on("select", () => setSelected(api.selectedScrollSnap()));
  }, [api]);
  return (
    <>
      <Carousel opts={{ watchDrag: false }} setApi={setApi}>
        <CarouselContent className="w-full gap-0">
          {panels.map((panel, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <div className="text-primary-foreground absolute inset-0">
                  <div className="font-heading flex h-screen flex-col items-center justify-center gap-4 sm:h-full">
                    <h2 className="bg-primary rounded-4xl px-6 py-2 text-4xl">
                      Follow Mihad
                    </h2>
                    <ul className="flex gap-5 pb-10">
                      {socials.map((social, index) => (
                        <li key={index} className="bg-primary rounded-full p-3">
                          <a href={social.link}>
                            <social.icon />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-primary rounded-full px-8 py-3">
                      <a href={panel.link.href}>Buy {panel.link.name}</a>
                    </div>
                  </div>
                </div>
                <img {...panel.image} className="w-full"></img>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-2 p-3">
        <Button
          onClick={() => {
            if (api?.canScrollPrev()) api?.scrollPrev();
            else api?.scrollTo(panels.length - 1);
          }}
          variant={"ghost"}
          size={"icon-xs"}
        >
          <ChevronLeft />
        </Button>
        {panels.map((_, index) => (
          <div
            key={index}
            className={`${index === selected && "bg-foreground"} border-foreground h-2 w-2 rounded-full border transition-transform ${index !== selected && "hover:scale-125"} duration-300`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
        <Button
          onClick={() => {
            if (api?.canScrollNext()) api?.scrollNext();
            else api?.scrollTo(0);
          }}
          variant={"ghost"}
          size={"icon-xs"}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}

export default HeroCarousel;
