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

  const [formData, setFormData] = useState<any | undefined>({})

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

  const [size, exif] = await Promise.all([
      getImageSize(file),
      getExifData(file)
    ]);

  if(!exif) {
    setError('Exif does not found.')
  }

  setFormData((prevList: any) => ({ ...prevList, ...size, ...(exif && { ...extractExifData(exif) }) }));
};

  const onUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const uploadedFiles = await uploadFiles(fd);

    if (uploadedFiles[0].error !== null) {
      return setError(uploadedFiles[0].error.message)
    }

    setSuccess('Files uploaded successfully')

    setImages(uploadedFiles);
    setFormData((prevList: any) => ({ 
    ...prevList,
    title: uploadedFiles[0].data?.name,
    imageUrl: uploadedFiles[0].data?.url,
  }));
    setSuccess('Files uploaded successfully');
  }

  const onSubmit = async () => {
    setError('')
    setSuccess('')
    const albumId = data.id ? data.id : null

    // form.reset()
    // router.refresh()
    // onClose()
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

        {images?.map((image: UploadFileResponse, index: number) => ( 
          <ImagePreview key={index} image={image} onChange={() => {
            setSuccess('')
            setImages(undefined)
          }} />
        ))}

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button onClick={() => onSubmit}>Create</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePhotoModal
