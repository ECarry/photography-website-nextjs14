"use client";

import { use } from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";
import { useGetPost } from "@/features/posts/api/use-get-post";
import Cover from "./cover";
import { DocumentMenu } from "./document-menu";
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
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-8 px-6 py-3">
        <Cover cover={data?.coverImage || undefined} />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{data?.title}</h1>
          <p className="text-sm">
            {new Date(data?.createAt || "").toDateString()}
          </p>
        </div>
      </div>
      <ToolBar />
      <div className="flex gap-8 flex-1 px-6 py-4">
        <div className="w-64 shrink-0">
          <DocumentMenu />
        </div>
        <div className="flex-1 min-w-0">
          <Editor content={data?.content || ""} />
        </div>
      </div>
    </div>
  );
};

export default DocumentSlugPage;
