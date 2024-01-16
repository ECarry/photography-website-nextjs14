import { db } from "@/lib/db"

import AnimateItems from "@/components/AnimateItems"
import PhotoLarge from "@/components/photo/PhotoLarge"

const HomePage = async () => {
  const photos = await db.photo.findMany({
    where: {
      category: {
        title: 'ecarry'
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    photos.length > 0
    ?
      <div className="space-y-4 p-8 md:ml-[280px] md:p-[50px] md:pl-0">
        <AnimateItems 
          className="space-y-8"
          duration={0.7}
          staggerDelay={0.15}
          distanceOffset={0}
          staggerOnFirstLoadOnly
          items={photos.map((photo, index) =>
            <PhotoLarge
              key={photo.id}
              photo={photo}
              priority={index <= 1}
            />)}
        />
      </div>
    :
    <>No data</>
  )
}

export default HomePage
