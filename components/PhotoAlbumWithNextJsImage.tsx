'use client'

import Image from "next/image";
import Link from "next/link";
import PhotoAlbum from "react-photo-album";

interface Image {
  src: string;
  width: number;
  height: number;
}

type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  srcSet: Image[];
}

interface PhotoAlbumWithNextJsImageProps {
  photos: Photo[]
}

const PhotoAlbumWithNextJsImage = ({
  photos
}: PhotoAlbumWithNextJsImageProps ) => {
  return (
    <PhotoAlbum 
      layout="columns"
      photos={photos}
      columns={2}
      renderPhoto={
        ({ photo, wrapperStyle, imageProps: { alt, title, sizes, className } }) => (
          <div style={{ ...wrapperStyle, position: "relative" }}>
            <Link 
              href={`/p/${photo.id}`}
              scroll={false}
            >
              <Image
                fill
                src={photo.src}
                {...{ alt, title, sizes, className }}
              />
            </Link>
          </div>
        )
      }
      sizes={{
        size: "calc(100vw - 40px)",
        sizes: [
          { viewport: "(max-width: 299px)", size: "calc(100vw - 10px)" },
          { viewport: "(max-width: 599px)", size: "calc(100vw - 20px)" },
          { viewport: "(max-width: 1199px)", size: "calc(100vw - 30px)" },
        ],
      }}
  />
  )
}

export default PhotoAlbumWithNextJsImage
