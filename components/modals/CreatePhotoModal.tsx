import { useModal } from '@/hooks/use-modal-store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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
import getImageExifInfo from '@/lib/getImageExifInfo'
import { useState, useTransition } from 'react'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { createPhoto } from '@/actions/createPhoto'
import { CreatePhotoSchema } from '@/schemas'

const CreatePhotoModal = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const { onClose, isOpen, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createPhoto'

  const form = useForm({
    resolver: zodResolver(CreatePhotoSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof CreatePhotoSchema>) => {
    setError('')
    setSuccess('')
    const albumId = data.id ? data.id : null

    const exif = await getImageExifInfo(values.imageUrl).catch((error) => {
      setError('get exif info error')
      return {};
    }) as Object

    const v = {
      ...values,
      ...exif,
      albumId
    }

    createPhoto(v)

    form.reset()
    router.refresh()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl'>
            Create Photo
          </DialogTitle>
          <DialogDescription className='text-center'>
            Upload photo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="imageUrl"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <DialogFooter>
              <Button disabled={isPending} type="submit" variant='primary'>Create</Button>
            </DialogFooter>
          </form>
    </Form>

      </DialogContent>
    </Dialog>
  )
}

export default CreatePhotoModal
