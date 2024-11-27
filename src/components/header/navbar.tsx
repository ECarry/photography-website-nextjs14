import Logo from "./logo";
import AnimatedLink from "../animated-link";
import { ThemeSwitch } from "@/components/theme/theme-switch";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center gap-5 pb-3 px-4 relative">
        <Logo />
        <AnimatedLink link="/" label="Grid" />
        <AnimatedLink link="/" label="Map" />
        <AnimatedLink link="/" label="Blog" />
        <AnimatedLink link="/about" label="About" />
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
