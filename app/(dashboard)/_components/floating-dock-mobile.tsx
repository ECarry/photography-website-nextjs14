"use client";

import { FloatingDock } from "@/components/floating-dock";
import { House, Images, User2 } from "lucide-react";

const links = [
  {
    href: "/dashboard",
    icon: House,
    title: "Overview",
  },
  {
    href: "/photos",
    icon: Images,
    title: "Photos",
  },
  {
    href: "/settings",
    icon: User2,
    title: "Settings",
  },
];

const FloatingDockMobile = () => {
  return <FloatingDock items={links} className="fixed bottom-4 right-4" />;
};

export default FloatingDockMobile;
