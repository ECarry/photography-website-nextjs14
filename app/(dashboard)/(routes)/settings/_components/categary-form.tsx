'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const categaryFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Categary title must be at least 2 characters.'
    })
})

type CategaryFormValues = z.infer<typeof categaryFormSchema>

const CategaryForm = () => {
  const form = useForm<CategaryFormValues>({
    resolver: zodResolver(categaryFormSchema),
  })

  const onSubmit = async (values: CategaryFormValues) => {

  }
  return (
    <div>CategaryForm</div>
  )
}

export default CategaryForm
