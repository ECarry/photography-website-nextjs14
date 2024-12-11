"use client";

import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import useNewPostSheet from "@/features/posts/store/use-new-post-sheet";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useDeletePost } from "@/features/posts/api/use-delete-post";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { onOpen } = useNewPostSheet();
  const { data, isLoading } = useGetPosts();
  const deletePost = useDeletePost();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    deletePost.mutate({ id });
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative aspect-[3/2]">
                <Skeleton className="absolute inset-0" />
              </div>
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((post) => (
            <Card key={post.id} className="group overflow-hidden">
              <div className="relative aspect-[3/2]">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-500 to-zinc-800" />
                )}
                <div className="absolute right-2 top-2 flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => toast.info("Edit feature coming soon")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => handleDelete(post.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                {post.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
