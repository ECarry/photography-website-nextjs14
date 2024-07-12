import { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Photos",
};

const PhotosPage = () => {
  return (
    <section className="h-full">
      <Content />
    </section>
  );
};

export default PhotosPage;
