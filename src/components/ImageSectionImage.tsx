import { motion, useScroll, useTransform } from "motion/react";
import type { GetImageResult } from "astro";
import { useRef } from "react";

function ImageSectionImage({
  imageResult,
  alt,
}: {
  imageResult: GetImageResult;
  alt: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  return (
    <>
      <div className="absolute inset-0" ref={ref}></div>
      <motion.img
        className="fixed top-0 h-svh object-cover"
        src={imageResult.src}
        alt={alt}
        {...imageResult.attributes}
        style={{
          scale,
        }}
      />
    </>
  );
}

export default ImageSectionImage;
