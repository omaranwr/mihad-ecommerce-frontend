import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

function ImageSectionOverlay({
  collection,
}: {
  collection: {
    name: string;
    href: string;
  };
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.1,
            ease: "easeOut",
          },
        }}
        viewport={{
          once: true,
        }}
        className="flex flex-col items-center justify-center gap-5"
      >
        <a href={collection.href}>
          <Button className="bg-primary/45 text-primary-foreground font-heading soft-ring group rounded-4xl px-4 py-7 text-3xl">
            <span className="underline decoration-1 group-hover:decoration-2">
              {collection.name}
            </span>
          </Button>
        </a>
        <a href={collection.href}>
          <Button className="bg-primary/45 text-primary-foreground soft-ring rounded-full px-6 py-5">
            Shop now
          </Button>
        </a>
      </motion.div>
    </div>
  );
}

export default ImageSectionOverlay;
