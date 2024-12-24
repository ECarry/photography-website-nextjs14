import VectorCombined from "@/components/vector-combined";
import MapWithPhotos from "./map-with-photos";

export const metadata = {
  title: "Discover",
  description:
    "Capturing memories across the globe - A visual journey through time and space",
};

const MapPage = () => {
  return (
    <div className="w-full h-full rounded-[18px] overflow-hidden relative">
      <MapWithPhotos />
      <div className="absolute right-0 bottom-0 z-50">
        <VectorCombined title="Discover" position="bottom-right" />
      </div>
    </div>
  );
};

export default MapPage;
