import Link from "next/link";
import { PiArrowDown } from "react-icons/pi";

const LatestWorkCard = () => {
  return (
    <div className="p-6 bg-muted rounded-xl w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <p className="text-sm font-light">Latest Work</p>
        <PiArrowDown size={14} />
      </div>

      <div>
        <Link href="/" className="relative text-sm font-light group">
          View All
          <span className="absolute -bottom-[2px] left-0 w-full h-[1px] bg-black dark:bg-white transition-all duration-300 transform ease-in-out group-hover:w-1/3" />
        </Link>
      </div>
    </div>
  );
};

export default LatestWorkCard;
