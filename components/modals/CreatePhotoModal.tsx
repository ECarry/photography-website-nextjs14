import { useModal } from '@/hooks/use-modal-store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { createPhoto } from '@/actions/createPhoto'
import { CreatePhotoSchema } from '@/schemas'
import getImageExifInfo from '@/lib/getImageExifInfo'

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,  
} from "@/components/ui/dialog"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ImageUpload from '@/components/ImageUpload'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Upload, X } from 'lucide-react'

import { getExifData } from '@/lib/getExifData'
import { getImageSize } from '@/lib/getImageSize'
import { uploadFiles } from '@/actions/uploadPhoto'
import Image from 'next/image'
import extractExifData from '@/lib/extractExifData'
import { UploadFileResponse } from '@/types'
import ImagePreview from '../image-preview'

type Schema = z.infer<typeof CreatePhotoSchema>

const CreatePhotoModal = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [images, setImages] = useState<UploadFileResponse[] >()

  const router = useRouter()

  const { onClose, isOpen, type, data } = useModal()
  const isModalOpen = isOpen && type === 'createPhoto'

  const form = useForm<Schema>({
    resolver: zodResolver(CreatePhotoSchema),
    defaultValues: {
      imageUrl: '',
    }
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const size = await getImageSize(file)

    console.log(size);
    

    const exif = await getExifData(file)

    if (!exif) return 
    const formatExif = extractExifData(exif)

  }

  const onUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const uploadedFiles = await uploadFiles(fd);

    setImages(uploadedFiles)
  }

  const onSubmit = async (values: Schema) => {
    setError('')
    setSuccess('')
    const albumId = data.id ? data.id : null

    const exif = await getImageExifInfo(values.imageUrl).catch((error) => {
      console.log(error);

      return {};
    }) as Object

    const v = {
      ...values,
      ...exif,
      albumId
    }

    startTransition(() => {
      createPhoto(v)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })

    form.reset()
    router.refresh()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl'>
            Upload Photo
          </DialogTitle>
          <DialogDescription className='text-center'>
            Upload photo to Uploadthing
          </DialogDescription>
        </DialogHeader>
        <div className='border-2 rounded-sm border-dashed py-10 px-4'>
          <form
            onSubmit={onUploadSubmit}
          >
            <input
              name="files" 
              type="file" 
              multiple 
              accept='image/*'
              onChange={handleImageChange}
            />
            <Button type='submit'>Upload</Button>
          </form>
        </div>

        {images?.map((image, index) => (
          <div key={index}  className='flex items-center justify-between relative'>
            <div className='flex gap-4 items-center'>
              <Image 
                src={image.data?.url || ''}
                alt=''
                height={100}
                width={100}
                className='object-cover w-[100px] h-[100px]'
              />
      
              <div className=''>
                <h1>{image.data?.name}</h1>
                <p>{image.data?.size}</p>
              </div>
            </div>
      
      
            <button
              className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
              type='button'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        ))}


        <FormError message='error' />
        <FormSuccess message='success' />
        <Button>Create</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePhotoModal
