import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import SiteGrid from "@/components/SiteGrid";
import ImageLarge from "@/components/ImageLarge";
import { formatDate } from "@/lib/date";
import { convertToCoordination } from "@/lib/convert-coordination";
import { formatExposureTime } from "@/lib/format-exif";

const PhotoLarge = ({
  photo,
  priority,
}: {
  photo: any;
  priority?: boolean;
}) => {
  const renderMiniGrid = (children: JSX.Element) => (
    <div
      className={cn(
        "flex gap-y-4",
        "flex-col sm:flex-row lg:flex-col",
        "[&>*]:sm:flex-grow",
        "pr-2"
      )}
    >
      {children}
    </div>
  );

  return (
    <SiteGrid
      contentMain={
        <ImageLarge
          className="w-full max-h-[60vh] object-contain"
          alt={photo.title}
          src={photo.url}
          aspectRatio={photo.aspectRatio}
          priority={priority}
          id={photo.id}
          blurData={photo.blurData}
        />
      }
      contentSide={
        <div
          className={cn(
            "sticky top-4 self-start text-sm",
            "grid grid-cols-2 lg:grid-cols-1",
            "gap-y-4",
            "-translate-y-1",
            "mb-4"
          )}
        >
          {renderMiniGrid(
            <>
              {/* TITLE  */}
              <Link href={`/p/${photo.id}`} className="font-bold uppercase">
                {photo.title}
              </Link>
              {/* CAMERA  */}
              <div className="uppercase">
                {photo.make} {photo.model}
              </div>
            </>
          )}
          {renderMiniGrid(
            <>
              <ul className={cn("text-gray-500", "dark:text-gray-400")}>
                <li>
                  {photo.focalLength ? photo.focalLength + "mm" : "-"}{" "}
                  <span
                    className={cn("text-gray-400/80", "dark:text-gray-400/50")}
                  >
                    {photo.focalLength35mm ? photo.focalLength35mm + "mm" : "-"}
                  </span>
                </li>
                <li>{photo.fNumber ? "ƒ" + photo.fNumber : "-"}</li>
                <li>ISO {photo.iso}</li>
                <li>{formatExposureTime(photo.exposureTime || 0)}</li>
                <li className="hidden lg:block">
                  {convertToCoordination(photo.longitude, photo.latitude)}
                </li>
                {photo.gpsAltitude ? (
                  <li className="hidden lg:block">{photo.gpsAltitude + "m"}</li>
                ) : null}
              </ul>
              <div
                className={cn(
                  "flex gap-y-4",
                  "flex-col sm:flex-row lg:flex-col"
                )}
              >
                <div
                  className={cn(
                    "grow uppercase",
                    "text-gray-500",
                    "dark:text-gray-400"
                  )}
                >
                  {formatDate(photo.takeAt)}
                </div>
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

export default PhotoLarge;
