import { useModal } from '@/hooks/use-modal-store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Photo title is required.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Photo is required.'
  })
})

const CreatePhotoModal = () => {
  const { onClose, isOpen, type } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createPhoto'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      imageUrl: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const exif = await getImageExifInfo(values.imageUrl).catch((error) => {
        console.log(error);
        return {};
      }) as Object

      const data = {
        ...values,
        ...exif,
      }
      
      await fetch('/api/photos', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error);
      
    }
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isLoading} type="submit" variant='primary'>Create</Button>
            </DialogFooter>
          </form>
    </Form>

      </DialogContent>
    </Dialog>
  )
}

export default CreatePhotoModal
