import Graphic from "../graphic";
import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="fixed top-3 left-3 z-50 bg-background rounded-br-[18px]">
      <div className="relative">
        <Navbar />

        <div className="absolute left-0 -bottom-[18px] size-[18px]">
          <Graphic />
        </div>

        <div className="absolute top-0 -right-[18px] size-[18px]">
          <Graphic />
        </div>
      </div>
    </header>
  );
};

export default Header;
