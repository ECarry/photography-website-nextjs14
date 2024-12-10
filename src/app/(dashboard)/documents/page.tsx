"use client";

import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import useNewPostSheet from "@/features/posts/store/use-new-post-sheet";

const DocumentsPage = () => {
  const { onOpen } = useNewPostSheet();
  const { data } = useGetPosts();

  return (
    <div>
      <Button onClick={() => onOpen()}>New Post</Button>
      {data?.length}
    </div>
  );
};

export default DocumentsPage;
