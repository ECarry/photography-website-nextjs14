'use client'

import Image from "next/image";
import Link from "next/link";
import type { RenderPhotoProps } from "react-photo-album";

export default function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {

  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Link href={``}>
        <Image
          fill
          src={photo}
          {...{ alt, title, sizes, className, onClick }}
        />
      </Link>
    </div>
  );
}
