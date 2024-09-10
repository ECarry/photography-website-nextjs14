"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: LucideIcon; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center"
                >
                  <item.icon className="h-5 w-5 text-neutral-400" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center"
      >
        <Menu className="size-5 text-neutral-400" />
      </button>
    </div>
  );
};
