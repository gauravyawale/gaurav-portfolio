"use client";

import { portfolioData } from "@/data/portfolio-data";
import { ArrowUp, Terminal, Shield } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/80 dark:bg-[#02040a] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-slate-800 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span className="font-semibold">{portfolioData.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
          <span className="font-mono text-slate-500 dark:text-slate-400">
            Senior Software Engineer
          </span>
        </div>

        {/* Middle: Stack credits */}
        <div className="flex items-center gap-2 font-mono text-slate-500 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Next.js 16 • React 19 • Tailwind CSS • Three.js</span>
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Edge Optimized</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glass-panel text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110 cursor-pointer"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
