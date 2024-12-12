"use client";

import { use } from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";
import { useGetPost } from "@/features/posts/api/use-get-post";
//import { useUpdatePost } from "@/features/posts/api/use-update-post";

type Params = Promise<{ slug: string }>;

const DocumentSlugPage = ({ params }: { params: Params }) => {
  const { slug } = use(params);
  const { data, isLoading } = useGetPost(slug);
  //const mutation = useUpdatePost(slug);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <ToolBar />
      <Editor content={data?.content || ""} />
    </div>
  );
};

export default DocumentSlugPage;
