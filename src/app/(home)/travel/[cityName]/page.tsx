import CityPhotos from "./city-photos";

type Params = Promise<{ cityName: string }>;

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { cityName } = await params;
  return {
    title: `${decodeURIComponent(cityName)} - Travel`,
  };
};

const CityPage = async ({ params }: { params: Params }) => {
  const { cityName } = await params;

  return (
    <div className="size-full">
      <CityPhotos cityName={cityName} />
    </div>
  );
};

export default CityPage;
