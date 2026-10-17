"use client";

import { portfolioData } from "@/data/portfolio-data";
import ThreeBackground from "@/components/ThreeBackground";
import {
  ArrowRight,
  Mail,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Play,
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
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden dot-pattern"
    >
      {/* 3D Particle Network Canvas */}
      <ThreeBackground />

      {/* Atmospheric Radial Glow Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Role Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-mono mb-8 shadow-sm dark:shadow-[0_0_20px_rgba(56,189,248,0.15)] animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>{profile.title}</span>
        </div>

        {/* Professional Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.15] mb-6 text-slate-900 dark:text-white">
          Building{" "}
          <span className="glow-accent-text">High-Performance Web Apps</span> &amp;{" "}
          <span className="text-slate-900 dark:text-white">Scalable Frontends.</span>
        </h1>

        {/* Factual Description */}
        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-10">
          {profile.bio}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo("intro-video")}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 glass-panel border-cyan-500/40 hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 dark:bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600 dark:bg-cyan-500" />
            </span>
            <Play className="w-4 h-4 fill-cyan-600 dark:fill-cyan-400 text-cyan-600 dark:text-cyan-400 transition-transform group-hover:scale-110" />
            <span>Watch Intro (1m)</span>
          </button>

          <button
            onClick={() => scrollTo("projects")}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/25 transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] active:scale-95 cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollTo("experience")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-700 dark:text-slate-200 glass-panel border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:text-cyan-700 dark:hover:text-cyan-400 transition-all duration-300 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 active:scale-95 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Work History</span>
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-panel border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Technical Architecture Teaser Card */}
        <div className="w-full max-w-4xl glass-panel rounded-2xl p-6 sm:p-8 text-left border-slate-200/80 dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-16 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                engineering-stack.json
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-md border border-emerald-300/60 dark:border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PRODUCTION VERIFIED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.04]">
              <div className="text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Frontend Architecture</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-semibold text-sm">
                React 19 • Next.js 16 • TypeScript
              </div>
              <div className="text-cyan-700 dark:text-cyan-400/80 mt-1 text-[11px]">
                -45% initial bundle size reduction
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.04]">
              <div className="text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>Real-Time &amp; Backend</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-semibold text-sm">
                Node.js • WebSockets • Redis
              </div>
              <div className="text-violet-700 dark:text-violet-400/80 mt-1 text-[11px]">
                Sub-90ms query responses &amp; 60 FPS feeds
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.04]">
              <div className="text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Testing &amp; Data</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-semibold text-sm">
                RTL • Jest • PostgreSQL / PostGIS
              </div>
              <div className="text-emerald-700 dark:text-emerald-400/80 mt-1 text-[11px]">
                &gt;88% component test coverage
              </div>
            </div>
          </div>
        </div>

        {/* Quantifiable Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-5 text-left border-slate-200/80 dark:border-white/[0.06]"
            >
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 glow-accent-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Connect Links */}
        <div className="flex items-center gap-4 mt-12 text-slate-500 dark:text-slate-400">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Profiles:
          </span>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            aria-label="Email Address"
            className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollTo("experience")}
          className="mt-12 flex flex-col items-center gap-1.5 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer group"
          aria-label="Scroll to experience"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest group-hover:tracking-wider transition-all">
            Scroll to explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-600 dark:text-cyan-400" />
        </button>
      </div>
    </section>
  );
}
