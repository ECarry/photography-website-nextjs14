"use client";

import { FloatingDock } from "@/components/floating-dock";
import { House, LayoutDashboardIcon, MapPinned } from "lucide-react";

  const links = [
    {
      title: "Home",
      icon: House,
      href: "/",
    },
    {
      title: "Grid",
      icon: LayoutDashboardIcon,
      href: "/grid",
    },
    {
      title: "Map",
      icon: MapPinned,
      href: "/map",
    },
  ];

const FloatingDockMobile = () => {
  return <FloatingDock items={links} className="fixed bottom-4 right-4" />;
};

export default FloatingDockMobile;
