'use client'

import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Photo } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditPhotoFormProps {
  photo: Photo
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  description: z.string(),
  
})

const EditPhotoForm = ({
  photo
}: EditPhotoFormProps) => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: photo.title,
      description: photo.description || ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (valuse: z.infer<typeof formSchema>) => {
    console.log(valuse);
    
    try {
      const res = await fetch(`/api/photos/${photo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: photo.id,
          data: valuse
        })
      })

      console.log('======>', await res.json());
      
      toast({
        title: "Update Successful",
      })
      router.refresh()
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your request. ${error}`,
      })
    }
  }
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold mb-4">Edit Photo</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-primary dark:text-secondary/70'>
                  Title
                </FormLabel>

                <FormControl>
                  <Input 
                    disabled={isLoading} 
                    placeholder='Enter Title'
                    {...field}
                    className='border-0 focus-visible:ring-0 text-primary focus-visible:ring-offset-0' 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-primary dark:text-secondary/70'>
                  Description
                </FormLabel>

                <FormControl>
                  <Textarea
                    disabled={isLoading} 
                    placeholder='Enter Description'
                    {...field}
                    className='border-0 min-h-[250px] focus-visible:ring-0 text-primary focus-visible:ring-offset-0' 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} variant='primary' className="w-full">
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EditPhotoForm
