// External dependencies
import Link from "next/link";

// Internal dependencies - UI Components
import ContactCard from "./contact-card";
import { PiArrowUpRight } from "react-icons/pi";
import MotionFadeIn from "@/components/motion-fade-in";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 items-stretch">
      <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
        <Link
          href="/about"
          className="flex flex-col p-10 gap-24 bg-muted hover:bg-muted-hover transition-all duration-150 ease-[cubic-bezier(0.22, 1, 0.36, 1)] rounded-xl font-light relative group h-full"
        >
          <div className="flex gap-4 items-center">
            {/* AVATAR  */}
            <Avatar className="size-[60px]">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/16572906?s=400&u=a304af70d12572524d540553425d78ff4d1a101a&v=4"
                alt="Avatar"
              />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>

            {/* NAME  */}
            <div className="flex flex-col gap-[2px]">
              <h1 className="text-lg">ECarry</h1>
              <p className="text-sm text-text-muted">Photographer</p>
            </div>
          </div>

          <div>
            <p className="text-text-muted text-[15px]">
              I&apos;m ECarry, a photographer dedicated to capturing authentic
              moments and telling stories through creative and emotional
              imagery, wherever my journey takes me.
            </p>
          </div>

          <div className="absolute top-8 right-8 opacity-0 group-hover:top-6 group-hover:right-6 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <PiArrowUpRight size={18} />
          </div>
        </Link>
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col justify-between gap-3">
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
  );
};

export default ProfileCard;
