"use client";

import Image from "next/image";
import Carousel from "./Carousel";

const images = [
  {
    src: "/bg.webp",
    alt: "Background",
  },
  {
    src: "/404.webp",
    alt: "404",
  },
];

export function ImageSlider() {
  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      containerClassName="h-full"
    >
      {images.map((image) => (
        <div key={image.src} className="flex-[0_0_100%] h-full relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={image.src === "/bg.webp"}
            className="object-cover"
            quality={100}
          />
        </div>
      ))}
    </Carousel>
  );
}
