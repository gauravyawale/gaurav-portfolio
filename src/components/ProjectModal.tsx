"use client";

import { useEffect, useRef } from "react";
import { Project } from "@/data/portfolio-data";
import {
  X,
  ExternalLink,
  Zap,
  Terminal,
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
        className="fixed inset-0 bg-[#0c0e12]/85 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] shadow-2xl overflow-hidden z-10 corner-crosshair animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#d6dae5] dark:border-[#2a2e3d] flex items-start justify-between gap-4 bg-[#edf0f5] dark:bg-[#0c0e12]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
              <span className="px-2 py-0.5 uppercase tracking-wider bg-[#ffffff] dark:bg-[#161922] text-[#d97706] dark:text-[#f59e0b] border border-[#d6dae5] dark:border-[#2a2e3d]">
                SPEC: {project.category}
              </span>
              <span className="text-[#727a8c] dark:text-[#656d7e]">
                ROLE: <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-semibold">{project.role}</span>
              </span>
            </div>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#d97706] dark:text-[#f59e0b] mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-[#d6dae5] dark:border-[#2a2e3d] text-[#727a8c] dark:text-[#656d7e] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] hover:border-[#f59e0b] transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Performance Metric Box */}
          <div className="p-3.5 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] font-mono text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#f59e0b] shrink-0" />
              <span className="text-[#727a8c] dark:text-[#656d7e] uppercase">Benchmark Metric:</span>
              <strong className="text-[#0c0e12] dark:text-[#f1f3f9]">{project.metrics}</strong>
            </div>
            <div className="text-[10px] text-[#f59e0b] uppercase tracking-wider">
              [ PRODUCTION VALIDATED ]
            </div>
          </div>

          {/* Deep Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e] mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Scope &amp; Architecture Overview</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#4b5262] dark:text-[#9ba1b0] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e] mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Architecture Highlights</span>
              </h4>
              <div className="space-y-1.5">
                {project.architectureHighlights?.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] text-xs text-[#4b5262] dark:text-[#9ba1b0]"
                  >
                    <span className="text-[#f59e0b] font-mono font-bold">›</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Solved */}
          {project.challengesSolved && project.challengesSolved.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e] mb-2 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Engineering Challenges &amp; Resolved Bottlenecks</span>
              </h4>
              <div className="space-y-2.5">
                {project.challengesSolved?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] space-y-1.5"
                  >
                    <div className="text-xs font-bold text-[#d97706] dark:text-[#f59e0b] flex items-center gap-2 font-mono">
                      <span>CHALLENGE:</span>
                      <span className="text-[#0c0e12] dark:text-[#f1f3f9]">{item.challenge}</span>
                    </div>
                    <div className="text-xs text-[#4b5262] dark:text-[#9ba1b0] leading-relaxed pl-2 border-l-2 border-[#f59e0b]">
                      <strong className="text-[#0c0e12] dark:text-[#f1f3f9] font-mono">SOLUTION: </strong>
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
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e] mb-2 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Layer-by-Layer Architectural Decomposition</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.architectureBreakdown?.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]"
                  >
                    <div className="text-xs font-mono text-[#d97706] dark:text-[#f59e0b] mb-0.5 font-semibold">
                      {layer.layer}
                    </div>
                    <div className="text-xs text-[#4b5262] dark:text-[#9ba1b0] leading-snug">
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
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#727a8c] dark:text-[#656d7e] mb-2">
                Full Technology Arsenal
              </h4>
              <div className="space-y-2.5">
                {project.fullTechStack?.map((category, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d]"
                  >
                    <div className="text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wider mb-1.5">
                      {category.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.items?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono text-[#0c0e12] dark:text-[#f1f3f9] bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d]"
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
        <div className="p-4 sm:p-5 border-t border-[#d6dae5] dark:border-[#2a2e3d] bg-[#edf0f5] dark:bg-[#0c0e12] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] hover:border-[#f59e0b] transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>SOURCE CODE</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-[#0c0e12] bg-[#f59e0b] hover:bg-[#fbbf24] transition-all"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-[#727a8c] dark:text-[#656d7e] hover:text-[#0c0e12] dark:hover:text-[#f1f3f9] transition-colors cursor-pointer"
          >
            [ESC] CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
