import { fetchECarryPhotos } from '@/data/photo';

import PhotoAlbumWithNextJsImage from '@/components/PhotoAlbumWithNextJsImage';

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const GridPage = async () => {
  const data = await fetchECarryPhotos(1, 100)

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
    <div className='p-4 md:py-[40px] md:pr-[50px] ml-0 md:ml-[280px]'>
      <PhotoAlbumWithNextJsImage photos={photos} />
    </div>
  )
}

export default GridPage
