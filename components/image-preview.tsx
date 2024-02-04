import { UploadFileResponse } from '@/types'
import { X } from 'lucide-react'
import Image from 'next/image'

const ImagePreview: React.FC<UploadFileResponse>= (image) => {
  if (!image.data) return

  return (
    <div  className='flex items-center justify-between relative'>
      <div className='flex gap-4 items-center'>
        <Image 
          src={image.data.url || ''}
          alt=''
          height={100}
          width={100}
          className='object-cover w-[100px] h-[100px]'
        />

        <div className=''>
          <h1>{image.data.name}</h1>
          <p>{image.data.size}</p>
        </div>
      </div>


      <button
        className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
        type='button'
      >
        <X className='h-4 w-4' />
      </button>
    </div>
  )
}

export default ImagePreview
