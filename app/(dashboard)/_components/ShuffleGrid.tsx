import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { Icons } from "@/components/icons";

export type Photo = InferResponseType<
  typeof client.api.photos.$get,
  200
>["data"][0];

const shuffle = (array: Photo[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = (squareData: Photo[]) => {
  return shuffle(squareData).map((sq: Photo) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full overflow-hidden"
    >
      <Image
        src={sq.url}
        alt={sq.title}
        width={256}
        height={256}
        placeholder="blur"
        blurDataURL={sq.blurData}
        className="object-cover w-full h-full"
      />
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const photosQuery = useGetPhotos();
  const squareData = useMemo(() => {
    if (!photosQuery.data || photosQuery.data.length === 0) return [];
    return photosQuery.data?.length <= 16
      ? photosQuery.data
      : photosQuery.data?.slice(0, 16);
  }, [photosQuery.data]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [squares, setSquares] = useState(generateSquares(squareData));

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares(squareData));

      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [squareData]);

  return photosQuery.isPending ? (
    <div className="w-full h-[450px] flex items-center justify-center">
      <Icons.loader className="animate-spin" />
    </div>
  ) : (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleGrid;
