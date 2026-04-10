import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { socials } from "@/lib/constants";
import AutoPlay from "embla-carousel-autoplay";
import type { GetImageResult } from "astro";

function HeroCarousel({
  panels,
}: {
  panels: {
    image: {
      imageResult: GetImageResult;
      alt: string;
    };
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
      <Carousel
        opts={{
          duration: 15,
          watchDrag: true,
          breakpoints: {
            "(min-width: 1024px)": { watchDrag: false },
          },
        }}
        setApi={setApi}
        plugins={[AutoPlay({ delay: 3000 })]}
      >
        <CarouselContent className="w-full gap-0">
          {panels.map(({ link, image }, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <div className="text-primary-foreground absolute inset-0">
                  <div className="font-heading flex h-screen flex-col items-center justify-center gap-4 sm:h-full">
                    <h2 className="bg-primary/57 soft-ring rounded-4xl px-6 py-2 text-4xl backdrop-blur-xl">
                      Follow Mihad
                    </h2>
                    <ul className="flex gap-5 pb-10">
                      {socials.map((social, index) => (
                        <li key={index}>
                          <a href={social.link}>
                            <Button
                              className="bg-primary/70 soft-ring rounded-full p-3 backdrop-blur-xl"
                              size={"icon-lg"}
                            >
                              <social.icon />
                            </Button>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <a href={link.href}>
                        <Button className="bg-primary/57 soft-ring rounded-full px-8 py-5 backdrop-blur-xl">
                          Buy {link.name}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
                <img
                  src={image.imageResult.src}
                  alt={image.alt}
                  {...image.imageResult.attributes}
                  className="h-[80svh] w-full object-cover"
                ></img>
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
