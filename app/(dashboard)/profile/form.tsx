"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AvatarUpload from "./AvatarUpload";
import { useEditUser } from "@/features/user/use-edit-user";
import { useRouter } from "next/navigation";

interface UserFormProps {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
}

const FormSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
});

export function UserForm({ name, image, email }: UserFormProps) {
  const router = useRouter();
  const mutation = useEditUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name || "",
      image: image || "https://github.com/shadcn.png",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="flex items-center gap-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <AvatarUpload value={field.value} onChange={field.onChange} />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{name}</h1>
            <p className="text-muted-foreground text-sm">{email}</p>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          disabled={mutation.isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="max-w-[500px]" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
