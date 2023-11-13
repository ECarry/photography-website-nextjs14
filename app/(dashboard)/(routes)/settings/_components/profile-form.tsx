"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User } from "@prisma/client"
import * as z from "zod"

import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AvatarUpload from "./AvatarUpload"

interface ProfileFormProps {
  user: User;
}

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  imageUrl: z.string()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({
  user
}: ProfileFormProps) {
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.username || '',
      imageUrl: user.imageUrl || ''
    }
  })

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify(values)
      })

      toast({
        title: "Update Successful.",
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField 
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
                <AvatarUpload
                  value={field.value}
                  onChange={field.onChange}
                />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
