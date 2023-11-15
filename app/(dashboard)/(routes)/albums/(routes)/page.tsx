import { Metadata } from 'next'

import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Albums',
  description: 'Albums',
}

const AlbumsPage = () => {
  return (
    <>
      <PageHeader
        title="All Albums"
        desc='Photography logs.'
        label='Add Album'
        type='createAlbum'
      />
      
      <div className="mt-6 pb-6">
        <PhotoGallery type='albums' />
      </div>
    </>

  )
}

export default AlbumsPage
