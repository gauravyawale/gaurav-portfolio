"use client";

import { portfolioData } from "@/data/portfolioData";
import {
  Code2,
  Server,
  Cpu,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function Skills() {
  const { skillGroups } = portfolioData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-4 h-4 text-[#f59e0b]" />;
      case "Backend":
        return <Server className="w-4 h-4 text-[#f59e0b]" />;
      case "DevOps & Tools":
        return <Cpu className="w-4 h-4 text-[#f59e0b]" />;
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
          <span>TECHNICAL ARSENAL // CORE COMPETENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight mb-4">
          Engineering <span className="text-[#d97706] dark:text-[#f59e0b]">Arsenal</span>
        </h2>
        <p className="text-[#4b5262] dark:text-[#9ba1b0] text-sm sm:text-base leading-relaxed">
          Production-tested technologies across frontend architectures, backend API services, spatial databases, and automated deployment tooling.
        </p>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
    </section>
  );
}
