import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEditPhoto } from "@/features/photos/api/use-edit-photo";
import { useDeletePhoto } from "@/features/photos/api/use-delete-photo";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { deleteCloudPhoto } from "@/actions/photos";
import { Icons } from "@/components/icons";

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type FormValues = z.input<typeof FormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  url: string;
};

const PhotoForm = ({ id, defaultValues, url }: Props) => {
  const router = useRouter();
  const editMutation = useEditPhoto(id);
  const deleteMutation = useDeletePhoto(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action cannot be undone."
  );

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {},
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      await deleteCloudPhoto(url);
      deleteMutation.mutate(undefined, {
        onSuccess: async () => {
          router.push("/photos");
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full" variant="primary" disabled={isPending}>
            <Icons.save size={16} className="mr-2" />
            Save Changes
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            type="button"
            disabled={isPending}
            onClick={onDelete}
          >
            <Icons.trash size={16} className="mr-2" />
            Delete Photo
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PhotoForm;
