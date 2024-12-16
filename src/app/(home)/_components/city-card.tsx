"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import VectorTopLeftAnimation from "@/components/vector-top-left-animation";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import { Blurhash } from "react-blurhash";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  coverId: string | null;
}

const CityCard = ({ title, coverId }: Props) => {
  const router = useRouter();
  const { data } = useGetPhoto(coverId!);
  const [isLoading, setIsLoading] = useState(true);

  if (!data) return null;

  return (
    <motion.div
      className="w-full relative group cursor-pointer"
      onClick={() => router.push(`/travel/${title}`)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <AspectRatio ratio={0.75 / 1} className="overflow-hidden rounded-lg">
        {isLoading && (
          <Blurhash
            hash={data.blurData}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            className="absolute inset-0 z-10"
          />
        )}

        <Image
          src={data.url}
          alt="Image"
          fill
          quality={50}
          onLoad={() => setIsLoading(false)}
          className="
            object-cover
            transition-[filter] duration-300 ease-out
            group-hover:blur-sm
          "
        />
      </AspectRatio>

      <div className="absolute top-0 left-0 z-20">
        <VectorTopLeftAnimation title={title} />
      </div>
    </motion.div>
  );
};

export default CityCard;
