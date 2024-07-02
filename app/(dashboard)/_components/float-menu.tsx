"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/photos",
    label: "Photos",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const FloatMenu = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-0 w-full z-50 h-[48px] px-4 block md:hidden">
      <div className="max-w-[300px] mx-auto h-full z-50 bg-black/65 backdrop-blur supports-[backdrop-filter]:bg-black/25 rounded-full py-2 px-4 flex items-center justify-between text-white/50">
        {routes.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              pathname.startsWith(href) && "text-white",
              "hover:text-white transition-all duration-150"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FloatMenu;
