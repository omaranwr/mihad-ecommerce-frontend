import { useEffect, useState, type ComponentProps } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroCarousel({ images }: { images: ComponentProps<"img">[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    api?.on("select", () => setSelected(api.selectedScrollSnap()));
  }, [api]);
  return (
    <>
      <Carousel opts={{ watchDrag: false }} setApi={setApi}>
        <CarouselContent className="w-full gap-0">
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img {...image} className="w-full"></img>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-2 p-3">
        <Button
          onClick={() => {
            if (api?.canScrollPrev()) api?.scrollPrev();
            else api?.scrollTo(images.length - 1);
          }}
          variant={"ghost"}
          size={"icon-xs"}
        >
          <ChevronLeft />
        </Button>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${index === selected && "bg-foreground"} border-foreground h-2 w-2 rounded-full border`}
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
