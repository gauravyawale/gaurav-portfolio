"use client";

import { useEffect, useRef } from "react";
import { Project } from "@/data/portfolio-data";
import {
  X,
  ExternalLink,
  Zap,
  Terminal,
  CheckCircle,
  AlertCircle,
  Cpu,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/[0.12] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/[0.08] flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/40">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Role: <span className="text-slate-800 dark:text-slate-200 font-semibold">{project.role}</span>
              </span>
            </div>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-sm font-mono text-cyan-700 dark:text-cyan-300/90 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer hover:rotate-90"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Performance Metric Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-cyan-50 to-slate-50 dark:from-emerald-950/40 dark:via-cyan-950/30 dark:to-slate-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Benchmark Metric:</span>
              <strong className="text-slate-900 dark:text-white">{project.metrics}</strong>
            </div>
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Production Tested</span>
            </div>
          </div>

          {/* Deep Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>System Overview &amp; Scope</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>Architectural Highlights</span>
              </h4>
              <div className="space-y-2">
                {project.architectureHighlights?.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-white/[0.04] text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">›</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Solved */}
          {project.challengesSolved && project.challengesSolved.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Key Engineering Challenges &amp; Solutions</span>
              </h4>
              <div className="space-y-3">
                {project.challengesSolved?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-950/70 border border-slate-200/80 dark:border-white/[0.06] space-y-2"
                  >
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2 font-mono">
                      <span>CHALLENGE:</span>
                      <span className="text-slate-800 dark:text-slate-200">{item.challenge}</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2 border-l-2 border-cyan-500/40">
                      <strong className="text-cyan-800 dark:text-cyan-300 font-mono">SOLUTION: </strong>
                      {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Layer Breakdown */}
          {project.architectureBreakdown && project.architectureBreakdown.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Layer-by-Layer Architecture</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architectureBreakdown?.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.05]"
                  >
                    <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-1 font-semibold">
                      {layer.layer}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                      {layer.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Tech Stack Categorized */}
          {project.fullTechStack && project.fullTechStack.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
                Full Technology Arsenal
              </h4>
              <div className="space-y-3">
                {project.fullTechStack?.map((category, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-white/[0.04]"
                  >
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {category.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-medium text-slate-700 dark:text-slate-200 glass-panel border-slate-200 dark:border-white/10 hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Repository</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
