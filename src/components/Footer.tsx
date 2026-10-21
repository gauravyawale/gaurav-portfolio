"use client";

import { portfolioData } from "@/data/portfolio-data";
import { ArrowUp, Terminal, Shield } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#d6dae5] dark:border-[#2a2e3d] bg-[#ffffff] dark:bg-[#0c0e12] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#727a8c] dark:text-[#656d7e]">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="flex items-center gap-2 text-[#0c0e12] dark:text-[#f1f3f9] font-medium">
            <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
            <span>{portfolioData.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-[#d6dae5] dark:text-[#2a2e3d]">{"//"}</span>
          <span className="text-[11px] uppercase tracking-wider">
            Senior Software Engineer
          </span>
        </div>

        {/* Middle: Architectural Blueprint note */}
        <div className="flex items-center gap-2 text-[11px] text-[#727a8c] dark:text-[#656d7e]">
          <Terminal className="w-3 h-3 text-[#f59e0b]" />
          <span>ARCH_SYSTEM // NEXT.JS 16 • REACT 19 • THREE.JS CAD • TAILWIND V4</span>
        </div>

        {/* Right: Coordinates & Scroll to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-[#727a8c] dark:text-[#656d7e] hidden sm:flex">
            <Shield className="w-3 h-3 text-[#f59e0b]" />
            <span>12.9716° N, 77.5946° E</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 bg-[#edf0f5] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all cursor-pointer"
            aria-label="Back to top of page"
            title="Return to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
