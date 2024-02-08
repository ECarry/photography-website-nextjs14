import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export const CreatePhotoSchema = z.object({
  title: z.string().min(1, {
    message: 'Photo title is required.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Photo is required.'
  }),
  width: z.number().min(1, {
    message: 'Width is required.'
  }),
  height: z.number().min(1, {
    message: 'Height is required.'
  }),
  aspectRatio: z.number().min(1, {
    message: 'AspectRatio is required.'
  }),
})
