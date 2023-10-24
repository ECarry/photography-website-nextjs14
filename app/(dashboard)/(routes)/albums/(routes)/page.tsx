import { Metadata } from 'next'

import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Albums - ECarry Photography',
  description: 'Albums',
}


const AlbumsPage = () => {
  return (
    <>
    <div className="">
      <PageHeader
        title="All Albums"
        label='Add Album'
        type='createAlbum'
      />
    </div>
    
    <div className="mt-6 pb-6">
        <PhotoGallery type='albums' />
      </div>
    </>

  )
}

export default AlbumsPage
