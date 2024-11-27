import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  link: string;
  label: string;
  className?: string;
}

const AnimatedLink = ({ link, label, className }: Props) => {
  return (
    <div className="relative inline-block overflow-hidden">
      <Link
        href={link}
        className={cn(
          "relative inline-block group text-black font-light text-sm dark:text-white",
          className
        )}
      >
        {/* Default Text (visible initially, moves down on hover) */}
        <span className="block transform transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {label}
        </span>

        {/* Hover Text (hidden initially, moves up on hover) */}
        <span className="absolute inset-0 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {label}
        </span>
      </Link>
    </div>
  );
};

export default AnimatedLink;
