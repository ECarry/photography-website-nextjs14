import Vector from "@/components/vector-bottom-right";
import Mapbox from "@/components/map";

const MapPage = () => {
  return (
    <div className="w-full h-full rounded-[18px] overflow-hidden relative">
      <Mapbox />

      <div className="absolute right-0 bottom-0 z-50">
        <Vector title="Map" />
      </div>
    </div>
  );
};

export default MapPage;
