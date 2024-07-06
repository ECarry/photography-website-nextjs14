import { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Photos",
};

const PhotosPage = () => {
  return (
    <main>
      <Content />
    </main>
  );
};

export default PhotosPage;
