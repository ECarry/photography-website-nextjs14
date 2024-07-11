import Mapbox from "@/components/map";

const MapPage = () => {
  return (
    <div className="ml-0 md:ml-[280px] h-dvh">
      <Mapbox showLocal={false} />
    </div>
  );
};

export default MapPage;
