import { IMAGE_LARGE_WIDTH } from '@/site';
import Image from 'next/image';
import Link from 'next/link';

export default function ImageLarge({
  className,
  src,
  aspectRatio,
  alt,
  priority,
  id,
}: {
  className?: string
  src: string
  aspectRatio: number
  alt: string
  priority?: boolean,
  id: string
}) {
  return (
    <Link
      href={`/p/${id}`}
      className="active:brightness-75"
    >
      <Image {...{
        className,
        src,
        alt,
        priority,
        //blurDataURL: blurData,
        //placeholder: 'blur',
        width: IMAGE_LARGE_WIDTH,
        height: Math.round(IMAGE_LARGE_WIDTH / aspectRatio),
      }} />
    </Link>
  );
};
