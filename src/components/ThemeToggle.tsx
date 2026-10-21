"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const emptySubscribe = () => () => {};

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`w-9 h-9 border border-[#2a2e3d] bg-[#161922] flex items-center justify-center text-[#9ba1b0] opacity-60 ${className}`}
        disabled
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Architectural Light Vellum" : "Switch to Deep Obsidian"}
      title={isDark ? "Switch to Architectural Light Vellum" : "Switch to Deep Obsidian"}
      className={`group relative flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 ${
        showLabel
          ? "px-3 py-2 w-full justify-between bg-[#161922] border border-[#2a2e3d] text-[#9ba1b0] hover:text-[#f1f3f9] hover:border-[#f59e0b]/50"
          : "w-9 h-9 justify-center bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#4b5262] dark:text-[#9ba1b0] hover:text-[#f59e0b] dark:hover:text-[#f59e0b] hover:border-[#f59e0b]/50"
      } ${className}`}
    >
      <div className="relative w-3.5 h-3.5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-3.5 h-3.5 text-[#f59e0b] transition-all duration-200 absolute ${
            isDark
              ? "opacity-0 rotate-90 scale-50 pointer-events-none"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`w-3.5 h-3.5 text-[#9ba1b0] group-hover:text-[#f59e0b] transition-all duration-200 absolute ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-medium tracking-wider uppercase">
          {isDark ? "Light Vellum" : "Obsidian"}
        </span>
      )}
    </button>
  );
}
