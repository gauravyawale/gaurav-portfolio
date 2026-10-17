"use client";

import { useState } from "react";
import { portfolioData, Project } from "@/data/portfolio-data";
import ProjectModal from "@/components/ProjectModal";
import {
  Code,
  ExternalLink,
  Sparkles,
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
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-4">
          <Code className="w-3.5 h-3.5" />
          <span>PRODUCTION SYSTEMS &amp; ARCHITECTURES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Featured <span className="glow-accent-text">Projects</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Production systems, geospatial routing platforms, and high-performance SaaS applications. Click any card to explore architectural blueprints, telemetry streams, and challenges solved.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {(
            [
              { label: "All Projects", key: "all" },
              { label: "Systems & Real-Time", key: "systems" },
              { label: "Full-Stack Web", key: "full-stack" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                filter === tab.key
                  ? "bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold shadow-md dark:shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                  : "glass-panel text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="group relative glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border-slate-200/80 dark:border-white/[0.08] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.01]"
          >
            {/* Top ambient highlight line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Card Meta & Badges */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30">
                      <Sparkles className="w-2.5 h-2.5 text-violet-600 dark:text-violet-400" /> FEATURED
                    </span>
                  )}
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/40 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Key Architecture Highlights bullet */}
              <div className="mb-4 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.04]">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                  <Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Architecture Highlights
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {project.architectureHighlights?.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">›</span>
                      <span className="line-clamp-1 text-[11px] sm:text-xs">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance Metric Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] mb-4">
                <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{project.metrics}</span>
              </div>
            </div>

            <div>
              {/* Core Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100/60 dark:bg-white/[0.02]">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(project)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
