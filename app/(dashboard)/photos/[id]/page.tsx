"use client";

import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import Image from "next/image";

import { FaCameraRetro } from "react-icons/fa";
import { SiLens } from "react-icons/si";
import { MdShutterSpeed } from "react-icons/md";
import { IoApertureOutline } from "react-icons/io5";
import { formatDate } from "@/lib/date";

import FocalLengthIcon from "/public/eye.png";
import AltitudeIcon from "/public/aerial.png";
import Mapbox from "./map";
import { useEffect, useState } from "react";
import { getReverseGeocoding } from "@/lib/map";
import PhotoForm from "./form";
import { formatExposureTime } from "@/lib/format-exif";
import { Icons } from "@/components/icons";
import Thumbnail from "./thumbnail";
import { usePhotoId } from "@/hooks/use-photo-id";

const PhotoIdPage = () => {
  const photoId = usePhotoId();
  const [address, setAddress] = useState<string>("");
  const photoQuery = useGetPhoto(photoId);
  const photo = photoQuery.data;

  useEffect(() => {
    if (photo?.locationName) return;
    const fetchAddress = async () => {
      if (photo?.longitude !== null && photo?.latitude !== null) {
        try {
          const address = await getReverseGeocoding(
            photo?.longitude,
            photo?.latitude
          );

          setAddress(address);
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress("");
        }
      }
    };

    fetchAddress();
  }, [photo]);

  if (!photo) return;

  return (
    <main>
      <Thumbnail
        title={photo.title}
        url={photo.url}
        description={photo.description}
        width={photo.width}
        height={photo.height}
        blurDataURL={photo.blurData}
        aspectRatio={photo.aspectRatio}
      />

      <div className="grid lg:grid-cols-12 p-4 gap-4">
        <div className="space-y-8 col-span-1 lg:col-span-8 2xl:col-span-9">
          {/* Title  */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{photo.title}</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {photo.description}
            </p>
          </div>

          {/* Parameters  */}
          <div className="space-y-4">
            <h1 className="text-xl">Parameters</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <FaCameraRetro size={18} />
                </div>

                <span>
                  {photo.make} {photo.model}
                </span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <SiLens size={18} />
                </div>

                <span>{photo.lensModel || "-"}</span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <MdShutterSpeed size={22} />
                </div>

                <span>{formatExposureTime(photo.exposureTime || 0)}</span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <IoApertureOutline size={22} />
                </div>

                <span>{photo.fNumber ? "ƒ" + photo.fNumber : "-"}</span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <span className="font-bold">ISO</span>
                </div>

                <span>{photo.iso}</span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <Image
                    src={FocalLengthIcon}
                    width={20}
                    height={20}
                    alt="Focal Length Icon"
                    placeholder="blur"
                  />
                </div>

                <span>
                  {photo.focalLength35mm ? photo.focalLength35mm + "mm" : "-"}
                </span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <Image
                    src={AltitudeIcon}
                    width={18}
                    height={18}
                    placeholder="blur"
                    alt="Altitude Icon"
                  />
                </div>

                <span>{photo.gpsAltitude ? photo.gpsAltitude + "m" : "-"}</span>
              </div>

              <div className="col-span-1 flex items-center gap-x-2 text-muted-foreground">
                <div className="size-8 p-1 flex items-center justify-center">
                  <Icons.time size={22} />
                </div>

                <span>{formatDate(photo.takeAt)}</span>
              </div>
            </div>
          </div>

          {/* Map  */}
          <div className="space-y-4 pb-8">
            <h1 className="text-xl">Location</h1>
            <p className="text-sm text-muted-foreground">
              Click the map to update the coordinates.
            </p>
            <div className="w-full h-[500px] space-y-2">
              <Mapbox
                id={photo.id}
                latitude={photo.latitude}
                longitude={photo.longitude}
              />
              <div className="flex items-center">
                <Icons.mapPin size={18} className="text-sky-500 mr-2" />
                <span className="text-muted-foreground text-sm font-light">
                  {photo.locationName ?? address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right content  */}
        <div className="lg:col-span-4 2xl:col-span-3 col-span-1 p-4 border rounded-lg">
          <PhotoForm
            id={photo.id}
            url={photo.url}
            defaultValues={{
              title: photo.title,
              description: photo.description,
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default PhotoIdPage;
