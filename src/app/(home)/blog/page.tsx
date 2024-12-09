import ContactCard from "../_components/contact-card";
import Footer from "../_components/footer";
import { type Metadata } from "next";
import CardContainer from "@/components/card-container";
import PostCard from "../_components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog page",
};

const BlogPage = () => {
  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row w-full">
      {/* LEFT CONTENT - Fixed */}
      <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 group">
        <div className="w-full h-full relative bg-[url(/404.webp)] bg-top bg-cover rounded-xl">
          <div className="absolute w-full bottom-0 p-3">
            <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-primary text-white text-xs rounded">
                  New
                </div>
                <h2 className="font-light">Travel to Hong Kong</h2>
              </div>

              <span className="text-sm underline underline-offset-2">Read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT CONTENT - Scrollable */}
      <div className="w-full lg:w-1/2 space-y-3 pb-3">
        {/* DESCRIPTION CARD  */}
        <CardContainer>
          <div className="flex flex-col p-12 gap-[128px]">
            <h1 className="text-3xl">Blog</h1>
            <div className="flex flex-col gap-4 font-light">
              <p>
                Welcome to my blog, where I share my thoughts, experiences, and
                insights on a wide range of topics. Whether you&apos;re a
                photographer, a traveler, or simply someone who appreciates the
                beauty of life, my blog is a place to connect with others who
                share my passion for capturing moments and telling stories.
              </p>
            </div>
          </div>
        </CardContainer>

        {/* POST LIST CARD  */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>

        {/* CONTACT CARD  */}
        <div className="w-full grid grid-cols-2 gap-3">
          <ContactCard title="Instagram" />
          <ContactCard title="GitHub" />
          <ContactCard title="X" />
          <ContactCard
            title="Contact me"
            className="bg-primary hover:bg-primary-hover text-white dark:text-black"
          />
        </div>

        {/* FOOTER  */}
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
