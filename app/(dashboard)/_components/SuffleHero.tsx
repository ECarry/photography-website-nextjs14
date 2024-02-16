import { db } from "@/lib/db";

import ShuffleGrid from "@/app/(dashboard)/_components/ShuffleGrid";
import ShimmerButton from "@/app/(dashboard)/_components/ShimmerButton";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const ShuffleHero = async () => {
  const squareData = await db.photo.findMany({
    take: 16,
    where: {
      category: {
        title: 'ecarry'
      }
    }
  })

  if (squareData.length < 1) {
    return null
  }

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
      <div>
        <TypewriterEffect 
          words={[
            {
              text: "Better",
              className: 'text-xs md:text-sm text-indigo-500 dark:text-indigo-500 font-medium'
            },
            {
              text: "every",
              className: 'text-xs md:text-sm text-indigo-500 dark:text-indigo-500 font-medium'
            },
            {
              text: "day",
              className: 'text-xs md:text-sm text-indigo-500 dark:text-indigo-500 font-medium'
            },
          ]}
          className="mb-8 text-start"
        />
        <h3 className="text-2xl md:text-4xl font-semibold">
          Remember, photography is an art that captures moments, emotions, and stories.
        </h3>
        <h3 className="text-2xl md:text-4xl font-semibold">
          Keep exploring and creating! 
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          📸🌟
        </p>
        <ShimmerButton />
      </div>
      <ShuffleGrid squareData={squareData} />
    </section>
  );
};

export default ShuffleHero;
