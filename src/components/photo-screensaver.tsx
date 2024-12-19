"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoScreensaverProps {
  photos: Array<{
    id: string;
    url: string;
    blurData: string;
  }>;
  className?: string;
}

const GRID_SIZE = 5; // 5x5 grid
const FLIP_INTERVAL = 3000; // 3 seconds between selecting new photo to flip
const ANIMATION_DURATION = 1.8; // 1.8 seconds for each flip

const PhotoScreensaver = ({ photos, className }: PhotoScreensaverProps) => {
  const [grid, setGrid] = useState<
    Array<{
      id: string;
      url: string;
      blurData: string;
      isFlipping: boolean;
      currentPhoto: {
        id: string;
        url: string;
      };
      flipKey: number;
    }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<{ [key: number]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (!photos.length) return;

    // Initialize grid with random photos
    const initialGrid = Array(GRID_SIZE * GRID_SIZE)
      .fill(null)
      .map(() => {
        const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        return {
          ...randomPhoto,
          isFlipping: false,
          currentPhoto: {
            id: randomPhoto.id,
            url: randomPhoto.url,
          },
          flipKey: 0,
        };
      });
    setGrid(initialGrid);

    // Start flip animation loop
    const flipInterval = setInterval(() => {
      const position = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
      const nextPhoto = photos[Math.floor(Math.random() * photos.length)];

      // Clear any existing timeout for this position
      if (timeoutsRef.current[position]) {
        clearTimeout(timeoutsRef.current[position]);
      }

      setGrid((currentGrid) => {
        const newGrid = [...currentGrid];
        newGrid[position] = {
          ...newGrid[position],
          isFlipping: true,
          id: nextPhoto.id,
          url: nextPhoto.url,
          flipKey: newGrid[position].flipKey + 1,
        };
        return newGrid;
      });

      // Set timeout to complete the flip
      timeoutsRef.current[position] = setTimeout(() => {
        setGrid((currentGrid) => {
          const newGrid = [...currentGrid];
          const cell = newGrid[position];
          if (cell) {
            newGrid[position] = {
              ...cell,
              isFlipping: false,
              currentPhoto: {
                id: cell.id,
                url: cell.url,
              },
            };
          }
          return newGrid;
        });
        delete timeoutsRef.current[position];
      }, ANIMATION_DURATION * 1000);
    }, FLIP_INTERVAL);

    return () => {
      clearInterval(flipInterval);
      Object.values(timeoutsRef.current).forEach(clearTimeout);
      timeoutsRef.current = {};
    };
  }, [photos]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-black",
        className
      )}
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          perspective: "3000px",
          transformStyle: "preserve-3d",
        }}
      >
        {grid.map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            className="relative aspect-square"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <AnimatePresence>
              <motion.div
                key={`front-${photo.currentPhoto.id}-${photo.flipKey}`}
                className="w-full h-full absolute"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transformOrigin: "center",
                  zIndex: photo.isFlipping ? 0 : 1,
                }}
                initial={{ rotateY: 0, opacity: 1 }}
                animate={{
                  rotateY: photo.isFlipping ? 90 : 0,
                  opacity: photo.isFlipping ? 0 : 1,
                }}
                transition={{
                  duration: ANIMATION_DURATION / 2,
                  ease: [0.645, 0.045, 0.355, 1],
                }}
              >
                <Image
                  src={photo.currentPhoto.url}
                  alt="Photo front"
                  fill
                  quality={50}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {photo.isFlipping && (
                <motion.div
                  key={`back-${photo.id}-${photo.flipKey}`}
                  className="w-full h-full absolute"
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center",
                    rotateY: "-90deg",
                    zIndex: 2,
                  }}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: ANIMATION_DURATION / 2,
                    ease: [0.645, 0.045, 0.355, 1],
                    delay: ANIMATION_DURATION / 2,
                  }}
                >
                  <Image
                    src={photo.url}
                    alt="Photo back"
                    fill
                    quality={50}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoScreensaver;
