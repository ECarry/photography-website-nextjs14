interface PhotoPageProps {
  params: {
    id: string;
  };
}

const PhotoPage = ({ params }: PhotoPageProps) => {
  return <div>{params.id}</div>;
};

export default PhotoPage;
