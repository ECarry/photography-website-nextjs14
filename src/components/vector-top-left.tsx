import Link from "next/link";
import Graphic from "./graphic";
import { PiArrowLeft } from "react-icons/pi";

interface Props {
  title: string;
}

const VectorTopLeft = ({ title }: Props) => {
  return (
    <div className="relative bg-background rounded-br-[18px]">
      <div className="pt-2 px-4 pb-3">
        <Link href="/" className="text-sm font-light flex items-center gap-2">
          <PiArrowLeft size={14} />
          <p>{title}</p>
        </Link>
      </div>

      <div className="absolute size-[18px]">
        <Graphic />
      </div>

      <div className="absolute size-[18px] top-0 -right-[18px]">
        <Graphic />
      </div>
    </div>
  );
};

export default VectorTopLeft;
