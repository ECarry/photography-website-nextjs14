import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ThumbnailProps {
  title: string;
  url: string;
  description: string;
  width: number;
  height: number;
  blurDataURL: string;
  aspectRatio: number;
}

const Thumbnail = ({
  title,
  url,
  description,
  width,
  height,
  blurDataURL,
  aspectRatio,
}: ThumbnailProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden w-full max-h-[500px] cursor-zoom-in">
          <Image
            src={url}
            alt={description}
            width={width}
            height={height}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "aspect-ratio-square border-none bg-transparent p-0 shadow-none",
          aspectRatio > 1 ? "max-w-[70vw]" : ""
        )}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Image
          src={url}
          alt={description}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="size-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
