"use client";

// External dependencies
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Hooks
import { useConfirm } from "@/hooks/use-confirm";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import { useDeletePost } from "@/features/posts/api/use-delete-post";
import useNewPostSheet from "@/features/posts/store/use-new-post-sheet";

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
            <div key={post.id} className="relative">
              <Link
                href={`/documents/${post.slug}`}
                className="space-y-4 block group"
              >
                <AspectRatio
                  ratio={16 / 10}
                  className="overflow-hidden rounded-xl"
                >
                  <Image
                    src={post.coverImage || "/public/404.png"}
                    alt={post.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </AspectRatio>

                <div className="w-full">
                  <div className="flex flex-col gap-y-1">
                    <h1 className="text-lg line-clamp-1">{post.title}</h1>
                    <span className="text-text-muted text-sm">
                      {new Date(post.createAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="absolute top-3 right-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  className="bg-transparent backdrop-blur-sm backdrop-saturate-50 rounded-full overflow-hidden hover:bg-transparent hover:backdrop-blur-lg p-2 cursor-pointer transition-all duration-300"
                >
                  <Trash size={20} className="text-white/80" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
