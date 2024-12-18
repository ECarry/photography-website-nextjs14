"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import VectorTopLeftAnimation from "@/components/vector-top-left-animation";

interface Props {
  title: string;
  coverId: string | null;
}

const CityCard = ({ title, coverId }: Props) => {
  const router = useRouter();
  const { data } = useGetPhoto(coverId!);

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
      <AspectRatio
        ratio={0.75 / 1}
        className="overflow-hidden rounded-lg relative"
      >
        <BlurImage
          src={data.url}
          alt={data.title}
          fill
          quality={20}
          priority
          className="object-cover group-hover:blur-sm transition-[filter] duration-300 ease-out"
          blurhash={data.blurData}
        />
      </AspectRatio>

      <div className="absolute top-0 left-0 z-20">
        <VectorTopLeftAnimation title={title} />
      </div>
    </motion.div>
  );
};

export default CityCard;
