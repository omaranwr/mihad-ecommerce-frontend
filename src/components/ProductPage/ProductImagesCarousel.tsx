import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function ProductImagesCarousel({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    api?.on("select", () => setSelected(api.selectedScrollSnap()));
  }, [api]);
  return (
    <div className="sm:w-75">
      <Carousel opts={{ watchDrag: true }} setApi={setApi}>
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="aspect-2/3">
              <img {...img} className="h-full w-full object-contain" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="grid grid-cols-3 items-center text-center">
        <Button
          onClick={() => api?.scrollPrev()}
          disabled={!api?.canScrollPrev()}
          variant={"ghost"}
        >
          <ChevronLeft />
        </Button>
        {selected + 1}/{images.length}
        <Button
          onClick={() => api?.scrollNext()}
          disabled={!api?.canScrollNext()}
          variant={"ghost"}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default ProductImagesCarousel;
