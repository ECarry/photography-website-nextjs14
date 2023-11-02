'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import { Photo } from "@prisma/client";

interface ShuffleGridProps {
  squareData: Photo []
}

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
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full overflow-hidden"
    >
      <Image 
        src={sq.imageUrl}
        alt="sq"
        width={256}
        height={75}
        className="object-cover w-full h-full"
      />
    </motion.div>
  ));
};

const ShuffleGrid = ({
  squareData
}: ShuffleGridProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(generateSquares(squareData));

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares(squareData));

    timeoutRef.current = setTimeout(shuffleSquares, 5000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleGrid
