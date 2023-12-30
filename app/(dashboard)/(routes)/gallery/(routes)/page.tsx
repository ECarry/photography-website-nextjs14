import type { Metadata } from 'next'

import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Gallery',
};

const GalleryPage = () => {
  return (
    <>
      <PageHeader
        title="All Photos"
        desc='Upload and manage photos.'
        label='Add Photo'
        type='createPhoto'
      />

      
      <div className="mt-6 pb-6">
        <PhotoGallery />
      </div>
    </>
  )
}

export default GalleryPage
