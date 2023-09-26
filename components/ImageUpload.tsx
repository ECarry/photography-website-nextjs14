'use client'

import { UploadDropzone } from '@/lib/uploadthing'

import '@uploadthing/react/styles.css'

import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url?: string) => void;
}

const ImageUpload = ({
  value,
  onChange
}: ImageUploadProps) => {
  if (value) {
    return (
      <div className='relative w-full h-[180px] mt-2'>
        <Image 
          src={value}
          fill
          alt='upload image'
          className='object-cover rounded-md'
        />
        <button
          onClick={() => onChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone 
      endpoint='imageUploader'
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error);
        
      }}
    />
  )
}

export default ImageUpload
