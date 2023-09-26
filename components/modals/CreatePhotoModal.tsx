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

  const isModalOpen = isOpen && type === 'createPhoto'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      imageUrl: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const exifData = await getImageExifInfo(values.imageUrl)

    console.log(exifData);
    
    
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
              <Button type="submit" variant='primary'>Create</Button>
            </DialogFooter>
          </form>
    </Form>

      </DialogContent>
    </Dialog>
  )
}

export default CreatePhotoModal
