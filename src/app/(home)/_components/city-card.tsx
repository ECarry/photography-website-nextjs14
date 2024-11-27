import Image from "next/image";
import osaka from "./osaka.webp";
import kyoto from "./kyoto.webp";
import nara from "./nara.webp";
import kobe from "./kobe.webp";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import VectorTopLeftAnimation from "@/components/vector-top-left-animation";

type CityName = "Osaka" | "Kyoto" | "Nara" | "Kobe";

interface Props {
  title: CityName;
}

const PhotosMap = {
  Osaka: osaka,
  Kyoto: kyoto,
  Nara: nara,
  Kobe: kobe,
} as const;

const CityCard = ({ title }: Props) => {
  return (
    <div className="w-full relative group cursor-pointer">
      <AspectRatio ratio={0.75 / 1} className="overflow-hidden rounded-lg">
        <Image
          src={PhotosMap[title]}
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
    </div>
  );
};

export default CityCard;
