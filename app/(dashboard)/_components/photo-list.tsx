import PhotoCard from "../_components/photo-card";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import Sort from "./sort";

export type Photos = InferResponseType<
  typeof client.api.photos.$get,
  200
>["data"];

const PhotoList = ({ photos }: { photos: Photos }) => {
  return (
    <div className="py-4 space-y-4 px-4">
      <div className="flex items-center">
        <h1 className="hidden md:block text-sm text-muted-foreground font-light tracking-wide subpixel-antialiased">
          Showing <span className="text-black">{photos.length}</span> Photos
          Listing
        </h1>

        <Sort />
      </div>

      {/* Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {photos.map((item) => (
          <PhotoCard key={item.id} photo={item} />
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
