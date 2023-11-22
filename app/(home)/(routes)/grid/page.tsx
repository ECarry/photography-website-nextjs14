import { fetchECarryPhotos } from '@/lib/data'

import PhotoAlbum from "react-photo-album";
import NextJsImage from '@/components/NextJsImage';

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const GridPage = async () => {
  const data = await fetchECarryPhotos()

  const photos = data.map((photo) => ({
    id: photo.id,
    src: photo.imageUrl,
    width: photo.width,
    height: photo.height,
    srcSet: breakpoints.map((breakpoint) => {
      const height = Math.round((photo.height / photo.width) * breakpoint);
      return {
        src: photo.imageUrl,
        width: breakpoint,
        height,
      };
    }),
  }));

  return (
    <div className='py-[48px] md:py-6 md:ml-[50px] p-6'>
      <PhotoAlbum 
        layout="columns"
        photos={photos}
        columns={3}
        renderPhoto={NextJsImage}
        defaultContainerWidth={1200}
        sizes={{
          size: "calc(100vw - 40px)",
          sizes: [
            { viewport: "(max-width: 299px)", size: "calc(100vw - 10px)" },
            { viewport: "(max-width: 599px)", size: "calc(100vw - 20px)" },
            { viewport: "(max-width: 1199px)", size: "calc(100vw - 30px)" },
          ],
        }}
      />
    </div>
  )
}

export default GridPage
