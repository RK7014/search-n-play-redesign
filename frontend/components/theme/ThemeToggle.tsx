"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={
        className ??
        "inline-flex size-9 items-center justify-center rounded-full border border-[var(--border-1)] text-paper transition-colors hover:bg-[var(--surface-3)]"
      }
    >
      {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  );
}
