"use client";

import { useState } from "react";
import { portfolioData, Experience as ExperienceType } from "@/data/portfolio-data";
import {
  Briefcase,
  Calendar,
  MapPin,
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#d6dae5] dark:border-[#2a2e3d]"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] text-xs font-mono mb-4">
          <Briefcase className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>RECORD // TENURE &amp; ARCHITECTURAL IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight mb-4">
          Professional <span className="text-[#d97706] dark:text-[#f59e0b]">Experience</span>
        </h2>
        <p className="text-[#4b5262] dark:text-[#9ba1b0] text-sm sm:text-base leading-relaxed">
          Technical leadership, enterprise platform architecture, and frontend performance optimizations across industrial IoT and high-scale SaaS products.
        </p>
      </div>

      {/* Vertical Architectural Timeline */}
      <div className="relative border-l border-[#d6dae5] dark:border-[#2a2e3d] ml-3 sm:ml-8 md:ml-24 space-y-12">
        {experiences.map((exp: ExperienceType, expIdx: number) => (
          <div key={exp.id} className="relative pl-6 sm:pl-9 group">
            {/* Timeline Milestone Bead */}
            <div
              className={`absolute -left-[13px] top-2 w-6 h-6 border flex items-center justify-center transition-all duration-200 ${
                exp.isCurrent
                  ? "bg-[#ffffff] dark:bg-[#161922] border-[#f59e0b]"
                  : "bg-[#edf0f5] dark:bg-[#161922] border-[#d6dae5] dark:border-[#2a2e3d] group-hover:border-[#f59e0b]"
              }`}
            >
              {exp.isCurrent ? (
                <span className="w-2 h-2 bg-[#f59e0b] animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 bg-[#727a8c] dark:bg-[#656d7e] group-hover:bg-[#f59e0b]" />
              )}
            </div>

            {/* Experience Card */}
            <div className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 sm:p-8 relative corner-crosshair transition-colors hover:border-[#f59e0b]/50">
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pb-5 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-mono text-[#f59e0b] uppercase tracking-widest border border-[#f59e0b]/40 px-1.5 py-0.5">
                      EXP_{String(expIdx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0c0e12] dark:text-[#f1f3f9]">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#f59e0b]/10 text-[#d97706] dark:text-[#f59e0b] border border-[#f59e0b]/30">
                        ACTIVE ROLE
                      </span>
                    )}
                  </div>
                  <div className="text-base font-semibold text-[#d97706] dark:text-[#f59e0b] font-mono">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-[#727a8c] dark:text-[#656d7e]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium">{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary Statement */}
              <p className="text-sm text-[#4b5262] dark:text-[#9ba1b0] leading-relaxed mb-6 font-normal">
                {exp.summary}
              </p>

              {/* Performance Metrics Row */}
              {exp.performanceMetrics && exp.performanceMetrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]">
                  {exp.performanceMetrics.map((pm, pmIdx) => (
                    <div key={pmIdx} className="font-mono">
                      <div className="text-xl sm:text-2xl font-bold text-[#0c0e12] dark:text-[#f1f3f9]">
                        {pm.metric}
                      </div>
                      <div className="text-[11px] text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wide">
                        {pm.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-Projects Accordion (ABB & UnoJobs) */}
              {exp.subProjects && exp.subProjects.length > 0 && (
                <div className="space-y-4 mb-6">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#727a8c] dark:text-[#656d7e] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
                    <span>Key Client Engagements &amp; Architectural Modules</span>
                  </div>

                  {exp.subProjects.map((sub, sIdx) => {
                    const isExpanded = expandedSubProject === sub.name;
                    return (
                      <div
                        key={sIdx}
                        className="border border-[#d6dae5] dark:border-[#2a2e3d] bg-[#ffffff] dark:bg-[#161922]"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSubProject(sub.name)}
                          className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#edf0f5]/60 dark:hover:bg-[#0c0e12]/60 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2 font-mono text-xs text-[#d97706] dark:text-[#f59e0b]">
                              <span>MOD_{String(sIdx + 1).padStart(2, "0")} {"//"}</span>
                              <span>{sub.clientOrDomain}</span>
                            </div>
                            <div className="text-sm sm:text-base font-bold text-[#0c0e12] dark:text-[#f1f3f9]">
                              {sub.name}
                            </div>
                            <div className="text-xs font-mono text-[#727a8c] dark:text-[#656d7e]">
                              {sub.role} {sub.period ? `• ${sub.period}` : ""}
                            </div>
                          </div>

                          <div className="p-1.5 border border-[#d6dae5] dark:border-[#2a2e3d] text-[#727a8c] dark:text-[#656d7e]">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#f59e0b]" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-4 pt-0 border-t border-[#d6dae5] dark:border-[#2a2e3d] animate-in fade-in duration-150">
                            <p className="text-xs text-[#4b5262] dark:text-[#9ba1b0] leading-relaxed my-3">
                              {sub.summary}
                            </p>

                            {/* Subproject Optimizations */}
                            {sub.optimizations && sub.optimizations.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
                                {sub.optimizations.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className="p-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] font-mono"
                                  >
                                    <div className="text-sm font-bold text-[#d97706] dark:text-[#f59e0b]">
                                      {opt.metric}
                                    </div>
                                    <div className="text-[11px] font-semibold text-[#0c0e12] dark:text-[#f1f3f9]">
                                      {opt.label}
                                    </div>
                                    <div className="text-[10px] text-[#727a8c] dark:text-[#656d7e] mt-0.5">
                                      {opt.detail}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Highlights List */}
                            <div className="space-y-1.5 my-3">
                              {sub.highlights.map((h, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-start gap-2 text-xs text-[#4b5262] dark:text-[#9ba1b0]"
                                >
                                  <span className="font-mono text-[#f59e0b] mt-0.5">■</span>
                                  <span className="leading-relaxed">{h}</span>
                                </div>
                              ))}
                            </div>

                            {/* Sub Tech Stack */}
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#d6dae5] dark:border-[#2a2e3d]">
                              {sub.techStack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 text-[10px] font-mono text-[#4b5262] dark:text-[#9ba1b0] bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]"
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

              {/* Detailed Achievements */}
              <div className="space-y-2 mb-6">
                <div className="font-mono text-xs uppercase tracking-wider text-[#727a8c] dark:text-[#656d7e]">
                  VERIFIED DELIVERABLES
                </div>
                {exp.achievements.map((ach, aIdx) => (
                  <div
                    key={aIdx}
                    className="flex items-start gap-2 text-xs text-[#4b5262] dark:text-[#9ba1b0]"
                  >
                    <span className="font-mono text-[10px] text-[#f59e0b] mt-0.5">
                      [{String(aIdx + 1).padStart(2, "0")}]
                    </span>
                    <span className="leading-relaxed">{ach}</span>
                  </div>
                ))}
              </div>

              {/* Skills Footer */}
              <div className="pt-4 border-t border-[#d6dae5] dark:border-[#2a2e3d] flex flex-wrap gap-1.5">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-xs font-mono text-[#4b5262] dark:text-[#9ba1b0] bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b]/50 hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] transition-colors"
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
