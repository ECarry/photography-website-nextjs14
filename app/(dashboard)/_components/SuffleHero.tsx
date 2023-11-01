'use client'

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { motion } from "framer-motion";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SquareData {
  id: number;
  src: string;
}

const ShuffleHero = () => {
  const { onOpen } = useModal()

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Lets change it up a bit
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <Button
          onClick={() => onOpen('createPhoto')}
          variant='primary'
        >
          <Plus size={16} className="mr-2" />
          New Photo
        </Button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: SquareData[]) => {
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

const squareData: SquareData[] = [
  {
    id: 1,
    src: "https://utfs.io/f/c323808a-2d70-4e8c-b6fb-1500c81dc4e5-uifnx8.jpg",
  },
  {
    id: 2,
    src: "https://utfs.io/f/210915e9-084d-4c3f-8d2f-22a6ff0af0e0-eaozr0.jpg",
  },
  {
    id: 3,
    src: "https://utfs.io/f/efe4d674-d772-4e23-bbfd-2ac70b76dddd-1x98ey.jpeg",
  },
  {
    id: 4,
    src: "https://utfs.io/f/87cadcfe-3054-474a-ba6d-bcefa62cd893-1x98f2.jpeg",
  },
  {
    id: 5,
    src: "https://utfs.io/f/dd8408ae-22b7-4f4d-ab2a-86793ca90661-12wf4o.jpg",
  },
  {
    id: 6,
    src: "https://utfs.io/f/c3a86832-558c-42ff-8992-ffa3c4a9f1eb-1x98e4.jpeg",
  },
  {
    id: 7,
    src: "https://utfs.io/f/870b91e9-adbd-48db-95af-e566579bd8d9-eaoipt.jpg",
  },
  {
    id: 8,
    src: "https://utfs.io/f/34e0f2c6-1db0-4dc1-a4c0-78afba1fb6ed-rtdh9h.jpg",
  },
  {
    id: 9,
    src: "https://utfs.io/f/12d0f4cc-72f4-498a-b9e2-3f1c9b95fbca-1x98f3.jpeg",
  },
  {
    id: 10,
    src: "https://utfs.io/f/c11e33b7-e74c-498d-9f92-d3736b07d85b-u5xl4x.jpg",
  },
  {
    id: 11,
    src: "https://utfs.io/f/a06f68e4-6ac5-4277-9f90-6ea21b1f4845-eaojie.jpg",
  },
  {
    id: 12,
    src: "https://utfs.io/f/a5fa35fb-90a5-430b-b030-2e4e232924bb-1x98f0.jpeg",
  },
  {
    id: 13,
    src: "https://utfs.io/f/8ad5d1dd-9c7c-43ff-8b5e-0108a07e1f7e-1x98f1.jpeg",
  },
  {
    id: 14,
    src: "https://utfs.io/f/dc3843c6-bc83-4594-9d06-3f560d51daeb-1x98ex.jpeg",
  },
  {
    id: 15,
    src: "https://utfs.io/f/f705a9d1-ca67-436f-bbcf-5a555ec3bf17-eaojfu.jpg",
  },
  {
    id: 16,
    src: "https://utfs.io/f/78a855d6-e858-4f4b-a3a5-abecda07e8dd-1x98ez.jpeg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full overflow-hidden"
    >
      <Image 
        src={sq.src}
        alt="sq"
        width={256}
        height={75}
        className="object-cover w-full h-full"
      />
    </motion.div>
  ));
};

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
