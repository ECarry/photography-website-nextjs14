import { useParams } from "next/navigation";

export const usePhotoId = () => {
  const params = useParams();

  return params.id as string;
};
