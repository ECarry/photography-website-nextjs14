'use client'

import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  description: z.string(),
  
})

const EditPhotoForm = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Edit Photo</h1>
    </div>
  )
}

export default EditPhotoForm
