interface PhotoPageProps {
  params: {
    id: string;
  };
}

const PhotoPage = ({ params }: PhotoPageProps) => {
  return <section>{params.id}</section>;
};

export default PhotoPage;
