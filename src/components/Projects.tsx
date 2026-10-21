"use client";

import { useState } from "react";
import { portfolioData, Project } from "@/data/portfolio-data";
import ProjectModal from "@/components/ProjectModal";
import {
  Code,
  ExternalLink,
  Zap,
  Terminal,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

type CategoryFilter = "all" | "systems" | "full-stack";

export default function Projects() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = portfolioData;

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#d6dae5] dark:border-[#2a2e3d]"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] text-xs font-mono mb-4">
          <Code className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>BLUEPRINTS // SYSTEMS &amp; DISTRIBUTED ENGINES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight mb-4">
          Featured <span className="text-[#d97706] dark:text-[#f59e0b]">Projects</span>
        </h2>
        <p className="text-[#4b5262] dark:text-[#9ba1b0] text-sm sm:text-base leading-relaxed">
          Production systems, geospatial routing platforms, and high-performance SaaS applications. Click any card to inspect architectural layers, technical challenges, and full stack breakdowns.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {(
            [
              { label: "ALL BLUEPRINTS", key: "all" },
              { label: "SYSTEMS & REAL-TIME", key: "systems" },
              { label: "FULL-STACK PLATFORMS", key: "full-stack" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 text-xs font-mono transition-all duration-150 cursor-pointer border ${
                filter === tab.key
                  ? "bg-[#f59e0b] text-[#0c0e12] border-[#f59e0b] font-semibold"
                  : "bg-[#ffffff] dark:bg-[#161922] text-[#727a8c] dark:text-[#9ba1b0] border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b]/50 hover:text-[#0c0e12] dark:hover:text-[#f1f3f9]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: Project, pIdx: number) => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="group relative bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 flex flex-col justify-between cursor-pointer corner-crosshair transition-all duration-200 hover:border-[#f59e0b]"
          >
            <div>
              {/* Card Meta & Badges */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e]">
                    SYS_{String(pIdx + 1).padStart(2, "0")} {"//"} {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-wider bg-[#f59e0b]/10 text-[#d97706] dark:text-[#f59e0b] border border-[#f59e0b]/30 uppercase">
                      FEATURED
                    </span>
                  )}
                  <div className="p-1 border border-[#d6dae5] dark:border-[#2a2e3d] text-[#727a8c] dark:text-[#656d7e] group-hover:text-[#f59e0b] group-hover:border-[#f59e0b] transition-colors">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] group-hover:text-[#d97706] dark:group-hover:text-[#f59e0b] transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-[#727a8c] dark:text-[#656d7e] mb-3 line-clamp-1">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-[#4b5262] dark:text-[#9ba1b0] text-xs leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Architecture Highlights bullet */}
              <div className="mb-4 p-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#727a8c] dark:text-[#656d7e] mb-1.5 uppercase tracking-wider">
                  <Terminal className="w-3 h-3 text-[#f59e0b]" />
                  <span>Architecture Highlights</span>
                </div>
                <ul className="space-y-1 text-xs text-[#4b5262] dark:text-[#9ba1b0]">
                  {project.architectureHighlights?.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 font-sans">
                      <span className="text-[#f59e0b] font-mono">›</span>
                      <span className="line-clamp-1 text-[11px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance Metric Box */}
              <div className="p-2 mb-4 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] text-[10px] font-mono text-[#4b5262] dark:text-[#9ba1b0] flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#f59e0b] shrink-0" />
                <span className="truncate">{project.metrics}</span>
              </div>
            </div>

            <div>
              {/* Core Tech Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono text-[#4b5262] dark:text-[#9ba1b0] bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e]">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-[#d6dae5] dark:border-[#2a2e3d] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[#727a8c] dark:text-[#656d7e] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] transition-colors"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>REPO</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[#d97706] dark:text-[#f59e0b] hover:underline transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>DEMO</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(project)}
                  className="inline-flex items-center gap-1 text-[#727a8c] dark:text-[#656d7e] group-hover:text-[#0c0e12] dark:group-hover:text-[#f1f3f9] transition-colors cursor-pointer"
                >
                  <span>SPEC</span>
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 text-[#f59e0b]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
