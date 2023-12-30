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
        <AlbumCard />
      </div>
    </>

  )
}

export default AlbumsPage
