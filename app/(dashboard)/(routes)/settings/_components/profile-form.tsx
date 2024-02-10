"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AvatarUpload from "./AvatarUpload"
import { User } from "next-auth"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { profileFormSchema } from "@/schemas"
import { useState, useTransition } from "react"
import { updateProfile } from "@/actions/updateProfile"

interface ProfileFormProps {
  user: User;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({
  user
}: ProfileFormProps) {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user.name || '',
      imageUrl: user.image || ''
    }
  })

  const onSubmit = async (values: ProfileFormValues) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      updateProfile(values)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField 
          control={form.control}
          name="imageUrl"
          disabled={isPending}
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
          name="username"
          disabled={isPending}
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending}>Update profile</Button>
      </form>
    </Form>
  )
}
