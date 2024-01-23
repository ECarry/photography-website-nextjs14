'use client'

import Image from 'next/image';

import { Upload, X } from 'lucide-react';
import { Input } from './ui/input';

interface ImageUploadProps {
  value: string;
  onChange: (url?: string) => void;
}

const ImageUploadUTApi = ({
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    console.log({
      FILE: file
    });
    
  }

  return (
    <div className="border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-md p-4 transition-colors hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer">
        <label className="flex flex-col items-center justify-center space-y-2" htmlFor="file-upload">
          <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Click or drag & drop your image here</p>
          <Input className="hidden" id="file-upload" type="file" />
        </label>
      </div>
  )
}

export default ImageUploadUTApi
