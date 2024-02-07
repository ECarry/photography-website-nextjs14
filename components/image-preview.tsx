import { deletePhotoFormUploadthing } from '@/actions/deletePhotoFromUplaodthing';
import { UploadFileResponse } from '@/types'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ImagePreviewProps {
  image: UploadFileResponse;
  onChange: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps>= ({ image, onChange }) => {
  if (!image.data) return

  const onSubmit = async () => {
    await deletePhotoFormUploadthing(image.data.key)
  }

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
          onClick={() => {
            onChange()
            onSubmit()
          }}
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
          type='submit'
        >
          <X className='h-4 w-4' />
        </button>
    </div>
  )
}

export default ImagePreview
