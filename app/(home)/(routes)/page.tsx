import AnimateItems from "@/components/AnimateItems";
import NoPhoto from "@/components/no-photo";
import PhotoLarge from "@/components/photo/PhotoLarge";
import { fetchAllPhotos } from "@/data/photo";

const HomePage = async () => {
  const photos = await fetchAllPhotos();

  return photos.length > 0 ? (
    <div className="space-y-4 p-8 md:ml-[280px] md:p-[50px] md:pl-0">
      <AnimateItems
        className="space-y-8"
        duration={0.7}
        staggerDelay={0.15}
        distanceOffset={0}
        staggerOnFirstLoadOnly
        items={photos.map((photo, index) => (
          <PhotoLarge key={photo.id} photo={photo} priority={index <= 1} />
        ))}
      />
    </div>
  ) : (
    <NoPhoto />
  );
};

export default HomePage;
