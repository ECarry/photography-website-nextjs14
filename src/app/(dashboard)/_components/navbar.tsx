import { UserButton } from "@/features/auth/components/user-button";
import HomeButton from "./home-button";
import Navigation from "./navigation";
import SearchBar from "./search-bar";
import UploadButton from "./upload-button";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitch } from "@/components/theme/theme-switch";

const Navbar = () => {
  return (
    <header
      // style={{
      //   backgroundColor: "transparent",
      //   backgroundImage: "radial-gradient(transparent 1px, #fff 1px)",
      //   backgroundSize: "4px 4px",
      //   backdropFilter: "saturate(50%) blur(4px)",
      // }}
      className="border-b sticky top-0 z-50 bg-transparent backdrop-blur-sm backdrop-saturate-50"
    >
      <div className="px-4 flex items-center h-[60px] ">
        <div className="flex items-center gap-x-8">
          <h1 className="font-bold text-xl">ECarry</h1>
          <Navigation />
        </div>
        <div className="ml-auto flex items-center space-x-2 md:space-x-3">
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          <ThemeSwitch />
          <HomeButton />
          <UploadButton />
          <Separator orientation="vertical" className="h-5" />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
