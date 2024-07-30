import { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Photos",
};

const PhotosPage = () => {
  return (
    <section className="h-full pb-20 md:pb-0">
      <Content />
    </section>
  );
};

export default PhotosPage;
