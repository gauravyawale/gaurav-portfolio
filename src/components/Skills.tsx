"use client";

import { portfolioData } from "@/data/portfolioData";
import {
  Code2,
  Server,
  Cpu,
  ShieldCheck,
  Terminal,
  Sparkles,
  Award,
  BookOpen,
  ExternalLink,
} from "lucide-react";

export default function Skills() {
  const { skillGroups, certifications, publications } = portfolioData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-4 h-4 text-[#f59e0b]" />;
      case "Backend":
        return <Server className="w-4 h-4 text-[#f59e0b]" />;
      case "DevOps & Tools":
        return <Cpu className="w-4 h-4 text-[#f59e0b]" />;
      case "AI & Productivity":
        return <Sparkles className="w-4 h-4 text-[#f59e0b]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#f59e0b]" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#d6dae5] dark:border-[#2a2e3d]"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] text-xs font-mono mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>TECH STACK // CORE COMPETENCIES &amp; CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight mb-4">
          Tech <span className="text-[#d97706] dark:text-[#f59e0b]">Stack</span>
        </h2>
        <p className="text-[#4b5262] dark:text-[#9ba1b0] text-sm sm:text-base leading-relaxed">
          Production-tested technologies across frontend architectures, backend API services, spatial databases, and automated deployment tooling.
        </p>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {skillGroups.map((group, idx) => (
          <div
            key={idx}
            className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 relative flex flex-col justify-between corner-crosshair transition-colors hover:border-[#f59e0b]/50"
          >
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight font-mono">
                      {group.category}
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wider">
                  [{String(group.skills.length).padStart(2, "0")} SPECS]
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-xs font-mono text-[#4b5262] dark:text-[#9ba1b0] bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-[#f59e0b]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#d6dae5] dark:border-[#2a2e3d] text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e] flex items-center gap-1.5 uppercase tracking-wider">
              <Terminal className="w-3 h-3 text-[#f59e0b]" />
              <span>Production validated across enterprise SCADA &amp; SaaS</span>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Certifications Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wider mb-6 pb-2 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
          <Award className="w-4 h-4 text-[#f59e0b]" />
          <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-bold">Verified Certifications</span>
          <span>{"// Verified Proof of Competence"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, cIdx) => (
            <div
              key={cIdx}
              className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-5 flex flex-col justify-between transition-colors hover:border-[#f59e0b]"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e] mb-2 uppercase tracking-wide">
                  <span>{cert.issuer}</span>
                  <span className="text-[#d97706] dark:text-[#f59e0b]">{cert.date}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0c0e12] dark:text-[#f1f3f9] mb-3 leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-[#d6dae5] dark:border-[#2a2e3d]">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d97706] dark:text-[#f59e0b] hover:underline"
                >
                  <span>VERIFY CREDENTIAL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Publications Section */}
      {publications && publications.length > 0 && (
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wider mb-6 pb-2 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
            <BookOpen className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-bold">Technical Publications</span>
            <span>{"// Peer-Reviewed / Engineering Articles"}</span>
          </div>

          <div className="space-y-4">
            {publications.map((pub, pIdx) => (
              <div
                key={pIdx}
                className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-[#f59e0b]"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#d97706] dark:text-[#f59e0b] uppercase tracking-wider mb-1">
                    {pub.publisher}
                  </div>
                  <h4 className="text-base font-bold text-[#0c0e12] dark:text-[#f1f3f9] mb-1">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-[#4b5262] dark:text-[#9ba1b0] max-w-3xl leading-relaxed">
                    {pub.summary}
                  </p>
                </div>

                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] text-xs font-mono text-[#0c0e12] dark:text-[#f1f3f9] hover:border-[#f59e0b] shrink-0 transition-colors"
                >
                  <span>READ PUBLICATION</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#f59e0b]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
