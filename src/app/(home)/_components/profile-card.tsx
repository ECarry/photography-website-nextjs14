import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";

const ProfileCard = () => {
  return (
    <Link href="/about">
      <div className="flex flex-col p-10 gap-24 bg-muted hover:bg-muted-hover transition-all duration-150 ease-[cubic-bezier(0.22, 1, 0.36, 1)] rounded-xl font-light relative group flex-1">
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
            moments and telling stories through creative and emotional imagery,
            wherever my journey takes me.
          </p>
        </div>

        <div className="absolute top-8 right-8 opacity-0 group-hover:top-6 group-hover:right-6 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <PiArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
