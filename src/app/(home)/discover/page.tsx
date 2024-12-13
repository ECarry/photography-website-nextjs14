import Vector from "@/components/vector-bottom-right";
import MapWithPhotos from "./map-with-photos";

export const metadata = {
  title: "Discover",
  description: "Capturing memories across the globe - A visual journey through time and space",
};

const MapPage = () => {
  return (
    <div className="w-full h-full rounded-[18px] overflow-hidden relative">
      <MapWithPhotos />
      <div className="absolute right-0 bottom-0 z-50">
        <Vector title="Discover" />
      </div>
    </div>
  );
};

export default MapPage;
