"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio-data";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "Intro", href: "#intro-video" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-violet-500/10 dark:from-cyan-500/20 dark:via-indigo-500/20 dark:to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-mono font-bold tracking-tighter text-sm transition-all duration-300 group-hover:border-cyan-500 dark:group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]">
              &lt;GY/&gt;
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight text-sm sm:text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {portfolioData.profile.name}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Senior Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-none backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-full ${
                    isActive
                      ? "text-cyan-700 bg-cyan-100/80 border border-cyan-300/80 shadow-sm dark:text-cyan-400 dark:bg-cyan-950/50 dark:shadow-[0_0_12px_rgba(56,189,248,0.25)] dark:border-cyan-500/30"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Live Status Indicator, Theme Toggle & Quick Contact */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500" />
              </span>
              <span>{portfolioData.profile.statusBadge}</span>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 hover:from-cyan-500/20 hover:to-violet-500/20 dark:from-cyan-500/20 dark:to-violet-500/20 border border-cyan-500/40 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top duration-200">
            {/* Live Status inside mobile */}
            <div className="flex items-center justify-between gap-2 px-3 py-2 mb-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500" />
                </span>
                <span>{portfolioData.profile.statusBadge}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-cyan-700 bg-cyan-50 border border-cyan-300/60 dark:text-cyan-400 dark:bg-cyan-950/40 dark:border-cyan-500/30"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-2">
                <ThemeToggle showLabel className="mb-2" />
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-violet-600 shadow-md shadow-cyan-900/20"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

