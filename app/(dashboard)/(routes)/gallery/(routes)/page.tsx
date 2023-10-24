import type { Metadata } from 'next'

import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Gallery - ECarry Photography',
  description: 'Gallery',
}


const GalleryPage = () => {
  return (
    <div>
      <div className="">
        <PageHeader
          title="All Photos"
          label='Add Photo'
          type='createPhoto'
        />
      </div>
      
      <div className="mt-6 pb-6">
        <PhotoGallery type='photos' />
      </div>
    </div>
  )
}

export default GalleryPage
