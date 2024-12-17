import Vector from "@/components/vector-bottom-right";
import ProfileCard from "../_components/profile-card";
import ContactCard from "../_components/contact-card";
import Footer from "../_components/footer";
import { type Metadata } from "next";
import TechMarquee from "@/components/tech-marquee";
import AboutCard from "../_components/about-card";
import CameraCard from "../_components/camera-card";
import CardContainer from "@/components/card-container";
import MotionFadeIn from "@/components/motion-fade-in";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row w-full">
      {/* LEFT CONTENT - Fixed */}
      <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
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
        <MotionFadeIn>
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <div className="flex-1">
              <ProfileCard />
            </div>

            <div className="flex-1 w-full lg:max-w-[300px] flex flex-col justify-between gap-3">
              <MotionFadeIn delay={0.1} className="h-full">
                <ContactCard
                  title="Instagram"
                  href="https://instagram.com/ekkooooooooooo0o0"
                />
              </MotionFadeIn>
              <MotionFadeIn delay={0.2} className="h-full">
                <ContactCard title="X" href="https://x.com" />
              </MotionFadeIn>
              <MotionFadeIn delay={0.3} className="h-full">
                <ContactCard title="GitHub" href="https://github.com/ecarry" />
              </MotionFadeIn>
              <MotionFadeIn delay={0.4} className="h-full">
                <ContactCard
                  title="Contact me"
                  className="bg-primary hover:bg-primary-hover text-white dark:text-black"
                />
              </MotionFadeIn>
            </div>
          </div>
        </MotionFadeIn>

        {/* ABOUT CARD  */}
        <MotionFadeIn delay={0.5}>
          <AboutCard />
        </MotionFadeIn>

        {/* TECH CARD  */}
        <MotionFadeIn delay={0.6}>
          <TechMarquee />
        </MotionFadeIn>

        {/* CAMERA CARD  */}
        <MotionFadeIn delay={0.7}>
          <CameraCard />
        </MotionFadeIn>

        <MotionFadeIn>
          <CardContainer>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">SONY</h1>
              <p className="text-sm">Alpha 7RⅡ</p>
            </div>
          </CardContainer>
        </MotionFadeIn>

        <MotionFadeIn>
          <CardContainer>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">DJI</h1>
              <p className="text-sm">Air 2S</p>
            </div>
          </CardContainer>
        </MotionFadeIn>

        <MotionFadeIn>
          <CardContainer>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">Tamron</h1>
              <p className="text-sm">50-400mm F/4.5-6.3 Di III VC VXD</p>
            </div>
          </CardContainer>
        </MotionFadeIn>

        <MotionFadeIn>
          <CardContainer>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">Sigma</h1>
              <p className="text-sm">35mm F/1.4 DG HSM</p>
            </div>
          </CardContainer>
        </MotionFadeIn>

        <MotionFadeIn>
          <CardContainer>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">Viltrox</h1>
              <p className="text-sm">AF 40mm F/2.5 FE</p>
            </div>
          </CardContainer>
        </MotionFadeIn>

        <MotionFadeIn>
          <CardContainer>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">Viltrox</h1>
              <p className="text-sm">AF 85mm F/1.8 FE</p>
            </div>
          </CardContainer>
        </MotionFadeIn>

        {/* FOOTER  */}
        <MotionFadeIn>
          <Footer />
        </MotionFadeIn>
      </div>
    </div>
  );
};

export default AboutPage;
