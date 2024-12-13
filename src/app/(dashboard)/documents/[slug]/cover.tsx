import PostCoverUpload from "@/features/r2/components/post-cover-upload";

interface Props {
  cover?: string;
}

const Cover = ({ cover }: Props) => {
  const onChange = () => {};
  return <PostCoverUpload onChange={onChange} value={cover} />;
};

export default Cover;
