'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string(),
  password: z.string()
})

const LoginForm = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res?.error) {
        toast({
          variant: "destructive",
          title: res.error,
          description: "Incorrect email or password.",
        })
        return
      }
      
      router.push('/dashboard')
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className='w-full max-w-sm'>
      <h1 className='text-3xl text-center font-semibold mb-4'>Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' >
          <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>

                <FormControl>
                  <Input 
                    disabled={isLoading}
                    placeholder='hello@ecarry.me'
                    {...field}
                    type='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>

                <FormControl>
                  <Input 
                    disabled={isLoading}
                    {...field}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} variant='primary' className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
