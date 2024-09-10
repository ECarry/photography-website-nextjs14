import Mapbox from "@/components/map";

// meta
export const metadata = {
  title: "Map",
};

const MapPage = () => {
  return (
    <section className="ml-0 md:ml-[280px] h-dvh">
      <Mapbox showLocal={false} />
    </section>
  );
};

export default MapPage;
