import { db } from "@/lib/db";

import MapboxWithMarks from "@/components/MapboxWithMarks";

const MapPage = async () => {
  const photos = await db.photo.findMany({});

  return (
    <div className="ml-[280px] h-dvh">
      <MapboxWithMarks photos={photos} />
    </div>
  );
};

export default MapPage;
