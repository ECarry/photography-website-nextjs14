"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

// Utility function to handle view transitions
const addViewTransition = (callback: () => void) => {
  if (!document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(callback);
};

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme: theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchTheme = () => {
    addViewTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  // Return a non-interactive switch component as a placeholder
  if (!mounted) {
    return (
      <Switch 
        className="h-4 mt-[2px] pointer-events-none opacity-50" 
        checked={false}
        disabled
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <Switch 
      className="h-4 mt-[2px]" 
      checked={theme === "dark"}
      onCheckedChange={() => switchTheme()} 
      aria-label="Toggle theme"
    />
  );
}
