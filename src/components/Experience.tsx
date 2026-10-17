"use client";

import { useState } from "react";
import { portfolioData, Experience as ExperienceType } from "@/data/portfolio-data";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle,
  Sparkles,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Experience() {
  const { experiences } = portfolioData;
  const [expandedSubProject, setExpandedSubProject] = useState<string | null>(
    "ABB Enterprise Industrial Platform"
  );

  const toggleSubProject = (name: string) => {
    setExpandedSubProject(expandedSubProject === name ? null : name);
  };

  return (
    <section
      id="experience"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TRACK RECORD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Professional <span className="glow-accent-text">Experience</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Technical leadership, enterprise platform architecture, and frontend performance optimizations across industrial IoT and high-scale SaaS products.
        </p>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative border-l border-slate-300 dark:border-white/[0.1] ml-4 sm:ml-8 md:ml-28 space-y-16">
        {experiences.map((exp: ExperienceType) => (
          <div key={exp.id} className="relative pl-6 sm:pl-10 group">
            {/* Timeline Node Bead */}
            <div
              className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                exp.isCurrent
                  ? "bg-white dark:bg-[#090d16] border-cyan-500 dark:border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                  : "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-white/20 group-hover:border-cyan-500/60 dark:group-hover:border-cyan-400/60"
              }`}
            >
              {exp.isCurrent ? (
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400" />
              )}
            </div>

            {/* Experience Card */}
            <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-9 border-slate-200/80 dark:border-white/[0.08] relative">
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-white/[0.06]">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-300/80 dark:border-cyan-500/30">
                        <Sparkles className="w-3 h-3" /> PRESENT ROLE
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-cyan-700 dark:text-cyan-400 tracking-tight">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-300">{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {exp.summary}
              </p>

              {/* Performance Metrics Callout Bar */}
              {exp.performanceMetrics && exp.performanceMetrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {exp.performanceMetrics.map((pm, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.05] flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white glow-accent-text">
                          {pm.metric}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {pm.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dedicated Sub-Projects (GeekyAnts: ABB & UnoJobs) */}
              {exp.subProjects && exp.subProjects.length > 0 && (
                <div className="space-y-4 mb-8">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Featured Platform Engagements &amp; Architectures</span>
                  </div>

                  {exp.subProjects.map((sub) => {
                    const isExpanded = expandedSubProject === sub.name;
                    return (
                      <div
                        key={sub.name}
                        className="rounded-2xl bg-slate-100/70 dark:bg-slate-950/70 border border-slate-200/80 dark:border-white/[0.06] overflow-hidden transition-all duration-200"
                      >
                        {/* Sub-project Accordion Header */}
                        <button
                          type="button"
                          onClick={() => toggleSubProject(sub.name)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-200/50 dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <div>
                            <div className="flex flex-wrap items-center gap-2.5 mb-1">
                              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                                {sub.name}
                              </span>
                              <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-white/[0.04] text-slate-700 dark:text-slate-400 border border-slate-300/60 dark:border-white/[0.04]">
                                {sub.role}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400/80">
                              {sub.clientOrDomain}
                            </div>
                          </div>

                          <div className="p-1.5 rounded-lg bg-slate-200/50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </button>

                        {/* Sub-project Expanded Details */}
                        {isExpanded && (
                          <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-200/80 dark:border-white/[0.04] space-y-4 animate-in fade-in duration-150">
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {sub.summary}
                            </p>

                            {/* Optimization Highlights Callouts */}
                            {sub.optimizations && sub.optimizations.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {sub.optimizations.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-cyan-500/20"
                                  >
                                    <div className="text-xs font-bold text-cyan-800 dark:text-cyan-300 font-mono">
                                      {opt.label}: {opt.metric}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                      {opt.detail}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Specific Architectural Accomplishments */}
                            <div className="space-y-2">
                              {sub.highlights.map((h, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                                >
                                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{h}</span>
                                </div>
                              ))}
                            </div>

                            {/* Sub-project Tech Stack */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {sub.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 rounded text-[11px] font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* General Achievements (For Fellowship & General Roles) */}
              {(!exp.subProjects || exp.subProjects.length === 0) && (
                <div className="space-y-3 mb-6">
                  {exp.achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Core Skill Chips */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] hover:border-cyan-500/30 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
