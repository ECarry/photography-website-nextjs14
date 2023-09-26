'use client'

import { useEffect, useState } from 'react'
import CreatePhotoModal from '../modals/CreatePhotoModal'

export const MoadlProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() =>{
    setIsMounted(true)
  })

  if (!isMounted) {
    return null
  }
  return (
    <>
      <CreatePhotoModal />
    </>
  )
}
