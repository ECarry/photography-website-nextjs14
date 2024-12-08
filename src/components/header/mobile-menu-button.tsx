import React from "react";
import Graphic from "../graphic";

const MobileMenuButton = () => {
  return (
    <div className="fixed top-3 right-3 z-50 bg-background rounded-bl-[18px] lg:hidden cursor-pointer select-none">
      <div className="relative pb-3 px-4">
        <h1 className="text-sm font-light">Menu</h1>

        <div className="absolute -left-[18px] top-0 size-[18px] rotate-90">
          <Graphic />
        </div>

        <div className="absolute -bottom-[18px] -right-0 size-[18px] rotate-90">
          <Graphic />
        </div>
      </div>
    </div>
  );
};

export default MobileMenuButton;
