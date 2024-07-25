import { Metadata } from "next";
import ShuffleHero from "../_components/ShuffleHero";
import { YearCountChart } from "./year-count-chart";
import { CityCountChart } from "./city-count-chart";
import GeoMap from "../_components/geoMap";

export const metadata: Metadata = {
  title: "Overview",
};

const page = () => {
  return (
    <section className="p-4 space-y-4">
      <ShuffleHero />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <YearCountChart />
        <CityCountChart />
        <div className="col-span-2 rounded-md overflow-hidden">
          <GeoMap />
        </div>
      </div>
    </section>
  );
};

export default page;
