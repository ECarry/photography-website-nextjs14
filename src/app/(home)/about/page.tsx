import Vector from "@/components/vector-bottom-right";
import ProfileCard from "../_components/profile-card";
import ContactCard from "../_components/contact-card";
import Footer from "../_components/footer";
import { type Metadata } from "next";
import TechMarquee from "@/components/tech-marquee";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row w-full">
      {/* LEFT CONTENT - Fixed */}
      <div className="w-full lg:w-1/2 lg:fixed lg:top-0 lg:left-0 h-screen p-0 lg:p-3">
        <div className="w-full h-full relative bg-[url(/bg.webp)] bg-top bg-cover rounded-xl">
          <div className="absolute right-0 bottom-0">
            <Vector title="Photography" />
          </div>
        </div>
      </div>

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT CONTENT - Scrollable */}
      <div className="w-full lg:w-1/2 space-y-3 pb-3">
        {/* PROFILE CARD  */}
        <div className="flex gap-4 items-stretch">
          <div className="flex-1">
            <ProfileCard />
          </div>

          <div className="flex-1 max-w-[300px] flex flex-col gap-3">
            <ContactCard title="Instagram" />
            <ContactCard title="GitHub" />
            <ContactCard title="X" />
            <ContactCard
              title="Contact me"
              className="bg-primary hover:bg-primary-foreground text-white dark:text-black"
            />
          </div>
        </div>

        {/* TECH CARD  */}
        <TechMarquee />

        {/* FOOTER  */}
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
