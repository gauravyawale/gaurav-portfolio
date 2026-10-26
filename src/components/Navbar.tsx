"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio-data";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { num: "01", name: "Overview", href: "#hero" },
  { num: "02", name: "Intro", href: "#intro-video" },
  { num: "03", name: "Experience", href: "#experience" },
  { num: "04", name: "Projects", href: "#projects" },
  { num: "05", name: "Tech Stack", href: "#skills" },
  { num: "06", name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "intro-video", "experience", "projects", "skills", "contact"];
      const scrollPos = window.scrollY + 180;

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#ffffff]/90 dark:bg-[#0c0e12]/92 backdrop-blur-md border-b border-[#d6dae5] dark:border-[#2a2e3d] py-3.5"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Architectural Monogram & Identification */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 bg-[#edf0f5] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] flex items-center justify-center font-mono font-bold text-xs text-[#0c0e12] dark:text-[#f1f3f9] transition-all duration-200 group-hover:border-[#f59e0b] group-hover:text-[#f59e0b]">
              GY
            </div>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-[#0c0e12] dark:text-[#f1f3f9] text-sm tracking-tight transition-colors group-hover:text-[#f59e0b]">
                {portfolioData.profile.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e] flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#f59e0b] inline-block" />
                Senior Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Architectural Nav Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-[#edf0f5]/80 dark:bg-[#161922]/80 border border-[#d6dae5] dark:border-[#2a2e3d]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 text-xs font-mono transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#0c0e12] dark:text-[#f1f3f9] bg-[#ffffff] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]"
                      : "text-[#727a8c] dark:text-[#9ba1b0] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] hover:bg-[#ffffff]/50 dark:hover:bg-[#0c0e12]/40"
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? "text-[#f59e0b]" : "text-[#727a8c] dark:text-[#656d7e]"}`}>
                    {item.num}
                  </span>
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Status Badge, Theme Toggle & Direct Action */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[11px] font-mono text-[#4b5262] dark:text-[#9ba1b0]">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] animate-pulse inline-block" />
              <span>{portfolioData.profile.statusBadge}</span>
            </div>

            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[#0c0e12] dark:text-[#f1f3f9] bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f59e0b]" />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] hover:border-[#f59e0b]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-[#f59e0b]" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2 px-3 py-2 mb-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] text-[11px] font-mono text-[#4b5262] dark:text-[#9ba1b0]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#f59e0b] animate-pulse inline-block" />
                <span>{portfolioData.profile.statusBadge}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-xs font-mono flex items-center justify-between border ${
                    activeSection === item.href.substring(1)
                      ? "text-[#0c0e12] dark:text-[#f1f3f9] bg-[#edf0f5] dark:bg-[#0c0e12] border-[#f59e0b]"
                      : "text-[#727a8c] dark:text-[#9ba1b0] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] border-transparent"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-[#f59e0b]">{item.num}</span>
                </a>
              ))}

              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono font-medium text-[#0c0e12] bg-[#f59e0b] hover:bg-[#fbbf24] transition-colors"
                >
                  <span>INQUIRE NOW</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
