"use client";

import { use, useEffect } from "react";
import { useGetPost } from "@/features/posts/api/use-get-post";
import Editor from "./editor";
import ToolBar from "./toolbar";

interface DocumentSlugPageProps {
  params: {
    slug: string;
  };
}

const DocumentSlugPage = ({ params }: DocumentSlugPageProps) => {
  // nextjs 15 features use()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug } = use(params);
  const { data, isLoading } = useGetPost(slug);

  useEffect(() => {
    if (data?.title) {
      document.title = `${data.title} - Documents - Dashboard`;
    }
  }, [data?.title]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <ToolBar />
      <Editor />
    </div>
  );
};

export default DocumentSlugPage;
