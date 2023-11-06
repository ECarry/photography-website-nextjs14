"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun size={20} className="dark:hidden" />
      <Moon size={20} className="hidden dark:block" />
    </Button>
  )
}
