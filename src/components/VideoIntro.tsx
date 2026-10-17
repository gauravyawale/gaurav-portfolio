"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Video,
  Layers,
} from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";

export default function VideoIntro() {
  const { introVideo, profile } = portfolioData;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(75); // fallback 1:15 = 75s
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const [attemptedPlay, setAttemptedPlay] = useState(false);

  // Check if videoUrl is an embed link (YouTube, Loom, Vimeo)
  const isEmbed =
    introVideo.videoUrl.includes("youtube.com") ||
    introVideo.videoUrl.includes("youtu.be") ||
    introVideo.videoUrl.includes("loom.com") ||
    introVideo.videoUrl.includes("vimeo.com");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }

      // Update active chapter based on currentTime
      const curr = video.currentTime;
      for (let i = introVideo.chapters.length - 1; i >= 0; i--) {
        if (curr >= introVideo.chapters[i].seconds) {
          setActiveChapterIndex(i);
          break;
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      if (attemptedPlay) {
        setHasVideoError(true);
        setIsPlaying(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [introVideo.chapters, attemptedPlay]);

  const togglePlay = () => {
    setAttemptedPlay(true);
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasVideoError(false);
        })
        .catch(() => {
          setHasVideoError(true);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const jumpToChapter = (seconds: number, index: number) => {
    setActiveChapterIndex(index);
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying && !hasVideoError) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro-video"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Background glow accents */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-4">
          <Video className="w-3.5 h-3.5" />
          <span>{introVideo.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Meet <span className="glow-accent-text">Gaurav</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          {introVideo.subtitle}
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Video Player Card (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-4 sm:p-6 border-slate-200/80 dark:border-white/[0.08] relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Top ambient highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Video Container (16:9 Aspect Ratio) */}
          <div
            className="relative w-full aspect-video rounded-2xl bg-slate-900 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-white/[0.06] shadow-2xl"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            {isEmbed ? (
              <iframe
                src={introVideo.videoUrl}
                title={introVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* HTML5 Video Element */}
                <video
                  ref={videoRef}
                  src={introVideo.videoUrl}
                  poster={introVideo.posterUrl}
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Video Placeholder / Info Overlay if video file not yet added */}
                {hasVideoError && attemptedPlay && (
                  <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md p-6 flex flex-col justify-between text-left z-20 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-300 dark:border-cyan-500/30">
                        <Video className="w-3.5 h-3.5" />
                        <span>VIDEO SLOT CONFIGURED</span>
                      </div>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        Duration: {introVideo.duration}
                      </span>
                    </div>

                    <div className="space-y-3 my-auto">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-mono text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="font-semibold">
                          Drop your introduction video file to activate
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {introVideo.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                        Place your recorded video at{" "}
                        <code className="text-cyan-700 dark:text-cyan-300 bg-slate-200 dark:bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs">
                          public/intro-video.mp4
                        </code>{" "}
                        or set a YouTube / Loom embed link in{" "}
                        <code className="text-cyan-700 dark:text-cyan-300 bg-slate-200 dark:bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs">
                          portfolioData.ts
                        </code>
                        . The player, controls, and chapter timestamps are pre-wired.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>Supported: MP4, WebM, Loom, YouTube</span>
                      <button
                        type="button"
                        onClick={() => {
                          setHasVideoError(false);
                          setAttemptedPlay(false);
                        }}
                        className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                      >
                        Back to Preview Poster
                      </button>
                    </div>
                  </div>
                )}

                {/* Big Center Play Button Overlay (when paused and no active error screen) */}
                {!isPlaying && !(hasVideoError && attemptedPlay) && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all hover:bg-black/10 group/btn cursor-pointer z-10"
                    aria-label="Play video introduction"
                  >
                    <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400/80 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-cyan-500/30 group-hover/btn:border-cyan-300">
                      <Play className="w-8 h-8 fill-cyan-300 ml-1" />
                    </div>
                  </button>
                )}

                {/* Custom Glassmorphic Controls Bar */}
                {!(hasVideoError && attemptedPlay) && (showControls || !isPlaying) && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 z-10 transition-opacity duration-200">
                    {/* Scrub Progress Bar */}
                    <input
                      type="range"
                      min={0}
                      max={duration || 75}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                    />

                    <div className="flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={toggleMute}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-red-400" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        <span className="font-mono text-[11px] text-slate-300">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                          {introVideo.chapters[activeChapterIndex]?.title}
                        </span>

                        <button
                          type="button"
                          onClick={handleFullscreen}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                          aria-label="Fullscreen"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Under-player Meta Bar */}
          <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500" />
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{profile.name}</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-cyan-700 dark:text-cyan-400">{profile.role}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Duration: {introVideo.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Chapters & Key Takeaways (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Chapters Card */}
          <div className="glass-panel rounded-3xl p-6 border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Video Chapters
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Click timestamp to jump
              </span>
            </div>

            <div className="space-y-3">
              {introVideo.chapters.map((chapter, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => jumpToChapter(chapter.seconds, idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? "bg-cyan-50 border-cyan-300 dark:bg-cyan-950/40 dark:border-cyan-500/40 shadow-sm dark:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                        : "bg-slate-100/70 border-slate-200/80 hover:border-slate-300 dark:bg-slate-950/40 dark:border-white/[0.05] dark:hover:border-white/15"
                    }`}
                  >
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-mono shrink-0 ${
                        isActive
                          ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold"
                          : "bg-slate-200 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {chapter.time}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs sm:text-sm font-semibold truncate ${
                          isActive
                            ? "text-cyan-800 dark:text-cyan-300"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {chapter.title}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {chapter.summary}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hiring Manager Key Takeaways Card */}
          <div className="glass-panel rounded-3xl p-6 border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/80 dark:border-white/[0.06]">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Key Engineering Highlights
              </h3>
            </div>

            <div className="space-y-2.5 mb-6">
              {introVideo.keyTakeaways.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Direct Action CTAs */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-600/20"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("experience")}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 glass-panel border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Experience</span>
              </button>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-panel hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer text-slate-600 dark:text-slate-300"
                aria-label="LinkedIn Profile"
                title="Connect on LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
