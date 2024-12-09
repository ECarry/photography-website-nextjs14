import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import VectorTopLeftAnimation from "@/components/vector-top-left-animation";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";

interface Props {
  title: string;
  coverId: string | null;
}

const CityCard = ({ title, coverId }: Props) => {
  const { data } = useGetPhoto(coverId!);

  if (!data) return null;

  return (
    <motion.div
      className="w-full relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <AspectRatio ratio={0.75 / 1} className="overflow-hidden rounded-lg">
        <Image
          src={data.url}
          alt="Image"
          fill
          className="
            object-cover
            transition-[filter] duration-300 ease-out
            group-hover:blur-sm
          "
        />
      </AspectRatio>

      <div className="absolute top-0 left-0">
        <VectorTopLeftAnimation title={title} />
      </div>
    </motion.div>
  );
};

export default CityCard;
