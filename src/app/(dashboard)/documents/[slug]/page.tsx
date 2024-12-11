import Editor from "./editor";
import ToolBar from "./toolbar";

type Params = Promise<{ slug: string }>;

const DocumentSlugPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen">
      {slug}
      <ToolBar />
      <Editor />
    </div>
  );
};

export default DocumentSlugPage;
