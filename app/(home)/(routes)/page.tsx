import { db } from "@/lib/db"

import Container from "@/components/Container"
import AnimateItems from "@/components/AnimateItems"
import PhotoLarge from "@/components/photo/PhotoLarge"

const HomePage = async () => {
  const photos = await db.photo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    photos.length > 0
    ?
    <Container>
      <div className="space-y-4 p-6">
        <AnimateItems 
          className="space-y-1"
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
    </Container>
    :
    <>No data</>
  )
}

export default HomePage
