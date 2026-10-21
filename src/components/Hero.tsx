"use client";

import { portfolioData } from "@/data/portfolio-data";
import ThreeBackground from "@/components/ThreeBackground";
import {
  ArrowRight,
  Mail,
  ChevronDown,
  Layers,
  Cpu,
  ShieldCheck,
  Play,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Hero() {
  const { profile } = portfolioData;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 overflow-hidden arch-grid-pattern"
    >
      {/* 3D Architectural CAD Drafting Plane */}
      <ThreeBackground />

      {/* Structural Hairline Datum Lines */}
      <div className="absolute inset-x-0 top-32 h-[1px] bg-[#d6dae5]/60 dark:bg-[#2a2e3d]/60 pointer-events-none" />
      <div className="absolute inset-y-0 left-8 md:left-16 w-[1px] bg-[#d6dae5]/40 dark:bg-[#2a2e3d]/40 pointer-events-none hidden sm:block" />
      <div className="absolute inset-y-0 right-8 md:right-16 w-[1px] bg-[#d6dae5]/40 dark:bg-[#2a2e3d]/40 pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Engineering Specification Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
          <span className="text-[#727a8c] dark:text-[#656d7e]">SPEC //</span>
          <span className="tracking-wide">{profile.title}</span>
        </div>

        {/* Primary Engineering Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-5xl leading-[1.12] mb-6 text-[#0c0e12] dark:text-[#f1f3f9]">
          Architecting{" "}
          <span className="text-[#d97706] dark:text-[#f59e0b]">
            High-Performance Web Systems
          </span>{" "}
          &amp; Enterprise Frontends.
        </h1>

        {/* Technical Sub-description */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-[#4b5262] dark:text-[#9ba1b0] leading-relaxed mb-10 font-normal">
          {profile.bio}
        </p>

        {/* Architectural Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button
            onClick={() => scrollTo("projects")}
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-semibold tracking-wider text-[#0c0e12] bg-[#f59e0b] hover:bg-[#fbbf24] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span>EXPLORE BLUEPRINTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo("intro-video")}
            className="inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-medium tracking-wide text-[#0c0e12] dark:text-[#f1f3f9] bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] transition-all cursor-pointer active:scale-95"
          >
            <Play className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
            <span>VIDEO BRIEFING (1:15)</span>
          </button>

          <button
            onClick={() => scrollTo("experience")}
            className="inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-medium tracking-wide text-[#4b5262] dark:text-[#9ba1b0] bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] transition-all cursor-pointer active:scale-95"
          >
            <Layers className="w-3.5 h-3.5 text-[#727a8c] dark:text-[#656d7e]" />
            <span>TRACK RECORD</span>
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-medium tracking-wide text-[#4b5262] dark:text-[#9ba1b0] bg-transparent border border-transparent hover:border-[#d6dae5] dark:hover:border-[#2a2e3d] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>DISPATCH</span>
          </button>
        </div>

        {/* Technical Architecture Specification Card */}
        <div className="w-full max-w-4xl bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 sm:p-7 text-left mb-14 relative corner-crosshair">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#727a8c] dark:text-[#656d7e]">
              <Terminal className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-semibold">
                SYSTEM_SPEC // STACK_PROFILE.JSON
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#4b5262] dark:text-[#9ba1b0] bg-[#edf0f5] dark:bg-[#0c0e12] px-2.5 py-1 border border-[#d6dae5] dark:border-[#2a2e3d]">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] inline-block" />
              <span>PRODUCTION VALIDATED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3.5 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]">
              <div className="text-[#727a8c] dark:text-[#656d7e] mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#f59e0b]" />
                <span className="text-[11px] uppercase tracking-wider">Frontend Engine</span>
              </div>
              <div className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium text-xs mb-1">
                React 19 • Next.js 16 • TypeScript
              </div>
              <div className="text-[#d97706] dark:text-[#f59e0b] text-[10px]">
                -38% payload &amp; virtualization
              </div>
            </div>

            <div className="p-3.5 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]">
              <div className="text-[#727a8c] dark:text-[#656d7e] mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#f59e0b]" />
                <span className="text-[11px] uppercase tracking-wider">Services &amp; Real-Time</span>
              </div>
              <div className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium text-xs mb-1">
                Fastify • Node.js • WebSockets • Redis
              </div>
              <div className="text-[#727a8c] dark:text-[#656d7e] text-[10px]">
                Atomic locks &amp; low-latency sync
              </div>
            </div>

            <div className="p-3.5 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]">
              <div className="text-[#727a8c] dark:text-[#656d7e] mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#f59e0b]" />
                <span className="text-[11px] uppercase tracking-wider">Quality &amp; Spatial Data</span>
              </div>
              <div className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium text-xs mb-1">
                RTL • Jest • PostgreSQL / PostGIS
              </div>
              <div className="text-[#727a8c] dark:text-[#656d7e] text-[10px]">
                80% coverage on core modules
              </div>
            </div>
          </div>
        </div>

        {/* Quantifiable Architectural Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-4 text-left transition-colors hover:border-[#f59e0b]/50"
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight mb-1 text-[#0c0e12] dark:text-[#f1f3f9]">
                {stat.value}
              </div>
              <div className="text-xs font-mono font-semibold text-[#0c0e12] dark:text-[#f1f3f9] mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#4b5262] dark:text-[#9ba1b0] leading-tight font-mono">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Connect Profiles Bar */}
        <div className="flex items-center gap-3 mt-12 text-[#727a8c] dark:text-[#656d7e]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e]">
            CHANNELS:
          </span>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#4b5262] dark:text-[#9ba1b0] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#4b5262] dark:text-[#9ba1b0] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-all"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            aria-label="Email Address"
            className="p-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#4b5262] dark:text-[#9ba1b0] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Scroll Cue */}
        <button
          onClick={() => scrollTo("experience")}
          className="mt-12 flex flex-col items-center gap-1.5 text-[#727a8c] dark:text-[#656d7e] hover:text-[#f59e0b] transition-colors cursor-pointer group"
          aria-label="Scroll to experience"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">
            EXPLORE SPECIFICATIONS
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#f59e0b]" />
        </button>
      </div>
    </section>
  );
}
