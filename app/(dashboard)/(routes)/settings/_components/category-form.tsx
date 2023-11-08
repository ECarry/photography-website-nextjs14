'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface CategoryFormProps {
  categories: Category[]
}

const categoryFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Categary title must be at least 2 characters.'
    })
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

const CategoryForm = ({
  categories
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
  })

  const onSubmit = async (values: CategoryFormValues) => {

  }
  return (
    <div>CategoryForm</div>
  )
}

export default CategoryForm
