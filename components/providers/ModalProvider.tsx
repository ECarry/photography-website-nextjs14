'use client'

import { useEffect, useState } from 'react'
import CreatePhotoModal from '@/components/modals/CreatePhotoModal'
import DeletePhotoModal from '@/components/modals/DeletePhotoModal'
import CreateAlbumModal from '@/components/modals/CreateAlbumModal'
import DeleteAlbumModal from '@/components/modals/DeleteAlbumModal'

export const MoadlProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() =>{
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  
  return (
    <>
      <CreatePhotoModal />
      <DeletePhotoModal />
      <CreateAlbumModal />
      <DeleteAlbumModal />
    </>
  )
}
