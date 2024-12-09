import Logo from "./logo";
import AnimatedLink from "../../../../components/animated-link";
import { ThemeSwitch } from "@/components/theme/theme-switch";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center gap-5 pb-3 px-4 relative">
        <Logo />
        <div className="hidden lg:flex gap-5">
          <AnimatedLink link="/travel" label="Travel" />
          <AnimatedLink link="/" label="Grid" />
          <AnimatedLink link="/" label="Map" />
          <AnimatedLink link="/blog" label="Blog" />
          <AnimatedLink link="/about" label="About" />
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
