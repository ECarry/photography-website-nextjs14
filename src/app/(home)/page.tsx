// Internal dependencies - UI Components
import Footer from "./_components/footer";
import CityList from "./_components/city-list";
import ProfileCard from "./_components/profile-card";
import Vector from "@/components/vector-bottom-right";
import MotionFadeIn from "@/components/motion-fade-in";
import { ImageSlider } from "@/components/image-slider";
import LatestWorkCard from "./_components/latest-work-card";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* LEFT CONTENT - Fixed */}
      <div className="w-full lg:w-1/2 h-[70vh] lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 rounded-xl">
        <div className="w-full h-full relative">
          <ImageSlider />

          <div className="absolute right-0 bottom-0">
            <Vector title="Photography" />
          </div>
        </div>
      </div>

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT CONTENT - Scrollable */}
      <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3">
        {/* PROFILE CARD  */}
        <MotionFadeIn>
          <ProfileCard />
        </MotionFadeIn>

        {/* LAST TRAVEL CARD  */}
        <MotionFadeIn delay={0.2}>
          <div className="mt-3">
            <LatestWorkCard />
          </div>
        </MotionFadeIn>

        {/* CITY CARD  */}
        <MotionFadeIn delay={0.3}>
          <CityList />
        </MotionFadeIn>

        <MotionFadeIn delay={0.4}>
          <Footer />
        </MotionFadeIn>
      </div>
    </div>
  );
}
