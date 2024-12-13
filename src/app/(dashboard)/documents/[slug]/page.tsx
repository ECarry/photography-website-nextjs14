"use client";

import { use } from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";
import { useGetPost } from "@/features/posts/api/use-get-post";
import Cover from "./cover";
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
    <div className="min-h-screen space-y-6 py-3 px-6">
      <Cover cover={data?.coverImage || undefined} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{data?.title}</h1>
        <p className="text-sm">
          {new Date(data?.createAt || "").toDateString()}
        </p>
      </div>
      <ToolBar />
      <Editor content={data?.content || ""} />
    </div>
  );
};

export default DocumentSlugPage;
