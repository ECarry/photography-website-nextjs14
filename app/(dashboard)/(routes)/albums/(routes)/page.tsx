import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import React from 'react'

const AlbumsPage = () => {
  return (
    <div className="">
      <PageHeader
        title="All Albums"
        label='Add Album'
        type='createAlbum'
      />
    </div>
  )
}

export default AlbumsPage
