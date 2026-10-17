"use client";

import { portfolioData } from "@/data/portfolioData";
import {
  Code2,
  Server,
  Cpu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Skills() {
  const { skillGroups } = portfolioData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case "Backend":
        return <Server className="w-5 h-5 text-violet-400" />;
      case "DevOps & Tools":
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Skills &amp; <span className="glow-accent-text">Core Competencies</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Production-tested technologies across frontend architectures, backend API services, spatial databases, and automated deployment tooling.
        </p>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {skillGroups.map((group, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 border-slate-200/80 dark:border-white/[0.08] relative group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/80 dark:border-white/[0.06]">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                  {getCategoryIcon(group.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {group.category}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {group.skills.length} Technologies
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.06] hover:border-cyan-500/40 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400/80" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/[0.04] text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Production verified on client &amp; internal platforms</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
