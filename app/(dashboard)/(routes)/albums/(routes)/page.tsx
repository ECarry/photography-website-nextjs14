import { Metadata } from 'next'

import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import { fetchAlbum } from '@/lib/data'
import AlbumCard from '@/app/(dashboard)/_components/AlbumCard'

export const metadata: Metadata = {
  title: 'Albums',
  description: 'Albums',
}

const AlbumsPage = async () => {
  const albums = await fetchAlbum()

  console.log(albums)

  return (
    <>
      <PageHeader
        title="All Albums"
        desc='Photography logs.'
        label='Add Album'
        type='createAlbum'
      />
      
      <div className="mt-6 pb-6">
        <div
           className='
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
           '
        >
          {albums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </>

  )
}

export default AlbumsPage
