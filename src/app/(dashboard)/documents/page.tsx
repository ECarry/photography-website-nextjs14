"use client";

import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import useNewPostSheet from "@/features/posts/store/use-new-post-sheet";
import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";

// Hooks
import { useDeletePost } from "@/features/posts/api/use-delete-post";
import { Heart } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const DocumentsPage = () => {
  const { onOpen } = useNewPostSheet();
  const { data, isLoading } = useGetPosts();
  const deletePost = useDeletePost();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this post. This action cannot be undone."
  );

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (!ok) return;
    deletePost.mutate({ id });
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <ConfirmationDialog />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your posts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => onOpen()}>Create Post</Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-t-2 border-t-primary animate-spin rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
          {data?.map((post) => (
            <div key={post.id} className="relative rounded-xl overflow-hidden">
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={post.coverImage || "/public/404.png"}
                  alt={post.title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              {/* Filter */}
              <div className="absolute w-full h-2/3 bottom-0 backdrop-blur-xl [mask-image:linear-gradient(to_top,white_30%,transparent_100%)]" />

              <div className="absolute bottom-2 z-10 w-full ">
                <div className="p-3 flex flex-col gap-y-3">
                  <h1 className="text-white">{post.title}</h1>
                  <span className="text-sm text-white/80">
                    {new Date(post.createAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex w-full items-center gap-x-3">
                    <Button
                      className="w-full rounded-lg"
                      size="lg"
                      variant="secondary"
                      asChild
                    >
                      <Link href={`/documents/${post.slug}`}>
                        <span className="">Edit</span>
                      </Link>
                    </Button>

                    <Button
                      onClick={() => handleDelete(post.id)}
                      size="lg"
                      className="w-full rounded-lg bg-transparent backdrop-blur-sm backdrop-saturate-50 hover:bg-white/5 transition-all duration-150"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3">
                <div className="bg-transparent backdrop-blur-sm backdrop-saturate-50 rounded-full overflow-hidden hover:bg-transparent hover:backdrop-blur-lg p-2 cursor-pointer transition-all duration-300">
                  <Heart size={22} className="text-white/80" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
