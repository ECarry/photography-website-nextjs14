import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShuffleGrid from "./ShuffleGrid";
import { db } from "@/lib/db";

const ShuffleHero = async () => {
  const squareData = await db.photo.findMany({
    take: 16,
    where: {
      category: {
        title: 'ecarry'
      }
    }
  })

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Framing life’s beautiful moments
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Capturing every corner of the world, one frame at a time.
        </p>
        <Button
          //onClick={() => onOpen('createPhoto')}
          variant='primary'
        >
          <Plus size={16} className="mr-2" />
          New Photo
        </Button>
      </div>
      <ShuffleGrid squareData={squareData} />
    </section>
  );
};

export default ShuffleHero;
