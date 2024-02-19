import { fetchAlbum } from '@/data/photo'

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards' 

const page = async () => {
  const albums = await fetchAlbum()

  return (
    <div className='flex items-center justify-center flex-col h-screen ml-0 md:ml-[280px]'>
      <InfiniteMovingCards
        direction="left"
        speed='slow'
        className=''
        items={albums}
      />

      <InfiniteMovingCards
        direction="right"
        speed='normal'
        className=''
        items={albums}
      />

      <InfiniteMovingCards
        direction="left"
        speed='slow'
        className=''
        items={albums}
      />
    </div>
  )
}

export default page
