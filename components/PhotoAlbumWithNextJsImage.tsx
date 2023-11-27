'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 767px)').matches);

  useEffect(() => {
    const handleResize = (event: any) => {
      setIsMobile(event.matches);
    };

    const mediaQueryList = window.matchMedia('(max-width: 767px)');

    // 初始化
    handleResize(mediaQueryList);

    // 监听媒体查询变化
    mediaQueryList.addListener(handleResize);

    // 清理监听器
    return () => {
      mediaQueryList.removeListener(handleResize);
    };
  }, []);

  
  return (
    <PhotoAlbum 
      layout="columns"
      photos={photos}
      columns={isMobile ? 2 : 3}
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
