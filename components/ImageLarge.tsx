import Image from "next/image";
import Link from "next/link";

// Height determined by intrinsic photo aspect ratio
export const IMAGE_TINY_WIDTH = 50;
// Height determined by intrinsic photo aspect ratio
export const IMAGE_SMALL_WIDTH = 300;
// Height determined by intrinsic photo aspect ratio
export const IMAGE_LARGE_WIDTH = 900;

export default function ImageLarge({
  className,
  src,
  aspectRatio,
  alt,
  priority,
  id,
  blurData,
}: {
  className?: string;
  src: string;
  aspectRatio: number;
  alt: string;
  priority?: boolean;
  id: string;
  blurData: string;
}) {
  return (
    <Link href={`/p/${id}`} className="active:brightness-75">
      <Image
        {...{
          className,
          src,
          alt,
          priority,
          blurDataURL: blurData,
          placeholder: "blur",
          width: IMAGE_LARGE_WIDTH,
          height: Math.round(IMAGE_LARGE_WIDTH / aspectRatio),
        }}
      />
    </Link>
  );
}
