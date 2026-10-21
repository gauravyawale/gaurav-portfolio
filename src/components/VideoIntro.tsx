"use client";

import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  AlertCircle,
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#d6dae5] dark:border-[#2a2e3d]"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] text-xs font-mono mb-4">
          <Video className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>BRIEFING // {introVideo.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight mb-4">
          Engineering <span className="text-[#d97706] dark:text-[#f59e0b]">Walkthrough</span>
        </h2>
        <p className="text-[#4b5262] dark:text-[#9ba1b0] text-sm sm:text-base leading-relaxed">
          {introVideo.subtitle}
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Player Card */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-4 sm:p-5 relative corner-crosshair">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#d6dae5] dark:border-[#2a2e3d] font-mono text-xs text-[#727a8c] dark:text-[#656d7e]">
            <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium">MEDIA_STREAM // INTRO_VIDEO.MP4</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] inline-block" />
              <span>{introVideo.duration} DURATION</span>
            </div>
          </div>

          {/* Video Container (16:9 Aspect Ratio) */}
          <div
            className="relative w-full aspect-video bg-[#0c0e12] overflow-hidden border border-[#d6dae5] dark:border-[#2a2e3d]"
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
                <video
                  ref={videoRef}
                  src={introVideo.videoUrl}
                  poster={introVideo.posterUrl}
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Video Info Overlay if video file not yet placed */}
                {hasVideoError && attemptedPlay && (
                  <div className="absolute inset-0 bg-[#0c0e12]/95 p-6 flex flex-col justify-between text-left z-20 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center gap-2 text-[#f59e0b] bg-[#161922] px-3 py-1 border border-[#2a2e3d]">
                        <Video className="w-3.5 h-3.5" />
                        <span>STANDBY // MEDIA SLOT READY</span>
                      </div>
                      <span className="text-[#9ba1b0]">
                        Duration: {introVideo.duration}
                      </span>
                    </div>

                    <div className="space-y-3 my-auto">
                      <div className="flex items-center gap-2 text-[#f59e0b] font-mono text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="font-semibold uppercase tracking-wider">
                          Ready for recorded introduction video
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#f1f3f9] tracking-tight">
                        {introVideo.title}
                      </h4>
                      <p className="text-xs text-[#9ba1b0] leading-relaxed max-w-lg">
                        Place your video at{" "}
                        <code className="text-[#f59e0b] bg-[#161922] px-1.5 py-0.5 border border-[#2a2e3d] font-mono text-xs">
                          public/intro-video.mp4
                        </code>{" "}
                        or set a direct stream in{" "}
                        <code className="text-[#f59e0b] bg-[#161922] px-1.5 py-0.5 border border-[#2a2e3d] font-mono text-xs">
                          portfolioData.ts
                        </code>
                        .
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#2a2e3d] flex items-center justify-between text-[11px] font-mono text-[#656d7e]">
                      <span>FORMATS: MP4, WebM, Loom</span>
                      <button
                        type="button"
                        onClick={() => {
                          setHasVideoError(false);
                          setAttemptedPlay(false);
                        }}
                        className="text-[#f59e0b] hover:underline cursor-pointer"
                      >
                        Reset Player
                      </button>
                    </div>
                  </div>
                )}

                {/* Architectural Center Play Trigger */}
                {!isPlaying && !(hasVideoError && attemptedPlay) && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all hover:bg-black/20 group/btn cursor-pointer z-10"
                    aria-label="Play video introduction"
                  >
                    <div className="w-16 h-16 bg-[#161922]/90 border border-[#f59e0b] flex items-center justify-center text-[#f59e0b] shadow-lg transition-transform duration-200 group-hover/btn:scale-105">
                      <Play className="w-6 h-6 fill-[#f59e0b] ml-1" />
                    </div>
                  </button>
                )}

                {/* Precision Controls Bar */}
                {!(hasVideoError && attemptedPlay) && (showControls || !isPlaying) && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#0c0e12]/90 border-t border-[#2a2e3d] flex flex-col gap-2 z-10">
                    <input
                      type="range"
                      min={0}
                      max={duration || 75}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-[#2a2e3d] appearance-none cursor-pointer accent-[#f59e0b] focus:outline-none"
                    />

                    <div className="flex items-center justify-between text-xs text-[#f1f3f9] font-mono">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1 hover:text-[#f59e0b] cursor-pointer"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={toggleMute}
                          className="p-1 hover:text-[#f59e0b] cursor-pointer"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-3.5 h-3.5 text-[#f59e0b]" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <span className="text-[11px] text-[#9ba1b0]">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#f59e0b] hidden sm:inline">
                          {introVideo.chapters[activeChapterIndex]?.title}
                        </span>

                        <button
                          type="button"
                          onClick={handleFullscreen}
                          className="p-1 hover:text-[#f59e0b] cursor-pointer"
                          aria-label="Fullscreen"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Under-player Identification */}
          <div className="mt-3 pt-3 border-t border-[#d6dae5] dark:border-[#2a2e3d] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#727a8c] dark:text-[#656d7e]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] inline-block" />
              <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium">{profile.name}</span>
              <span>—</span>
              <span className="text-[#d97706] dark:text-[#f59e0b]">{profile.role}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>TOTAL: {introVideo.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Chapters & Key Takeaways */}
        <div className="lg:col-span-5 space-y-4">
          {/* Chapters Card */}
          <div className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#d6dae5] dark:border-[#2a2e3d]">
              <div className="flex items-center gap-2 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0c0e12] dark:text-[#f1f3f9]">
                  Navigation Chapters
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#727a8c] dark:text-[#656d7e]">
                JUMP TO TIMECODE
              </span>
            </div>

            <div className="space-y-2">
              {introVideo.chapters.map((chapter, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => jumpToChapter(chapter.seconds, idx)}
                    className={`w-full text-left p-3 border font-mono transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? "bg-[#edf0f5] dark:bg-[#0c0e12] border-[#f59e0b] text-[#0c0e12] dark:text-[#f1f3f9]"
                        : "bg-[#ffffff] dark:bg-[#161922] border-[#d6dae5] dark:border-[#2a2e3d] text-[#727a8c] dark:text-[#9ba1b0] hover:border-[#f59e0b]/50 hover:text-[#0c0e12] dark:hover:text-[#f1f3f9]"
                    }`}
                  >
                    <span
                      className={`px-1.5 py-0.5 text-[11px] shrink-0 border ${
                        isActive
                          ? "bg-[#f59e0b] text-[#0c0e12] border-[#f59e0b] font-bold"
                          : "bg-[#edf0f5] dark:bg-[#0c0e12] text-[#4b5262] dark:text-[#9ba1b0] border-[#d6dae5] dark:border-[#2a2e3d]"
                      }`}
                    >
                      {chapter.time}
                    </span>

                    <div className="flex-1 min-w-0 font-sans">
                      <div
                        className={`text-xs font-semibold truncate ${
                          isActive
                            ? "text-[#0c0e12] dark:text-[#f1f3f9]"
                            : "text-[#4b5262] dark:text-[#9ba1b0]"
                        }`}
                      >
                        {chapter.title}
                      </div>
                      <div className="text-[11px] text-[#727a8c] dark:text-[#656d7e] mt-0.5 line-clamp-2 leading-relaxed">
                        {chapter.summary}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hiring Manager Key Takeaways Card */}
          <div className="bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#d6dae5] dark:border-[#2a2e3d] font-mono text-xs">
              <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0c0e12] dark:text-[#f1f3f9]">
                Architectural Competencies
              </h3>
            </div>

            <div className="space-y-2 mb-5">
              {introVideo.keyTakeaways.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#4b5262] dark:text-[#9ba1b0]"
                >
                  <span className="font-mono text-[10px] text-[#f59e0b] mt-0.5 shrink-0">
                    [{idx + 1}]
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Direct Action CTAs */}
            <div className="pt-3 border-t border-[#d6dae5] dark:border-[#2a2e3d] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="flex-1 py-2 px-3 font-mono text-xs font-semibold text-[#0c0e12] bg-[#f59e0b] hover:bg-[#fbbf24] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>INQUIRE</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("experience")}
                className="py-2 px-3 font-mono text-xs font-medium text-[#0c0e12] dark:text-[#f1f3f9] bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#727a8c] dark:text-[#656d7e]" />
                <span>EXPERIENCE</span>
              </button>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] text-[#4b5262] dark:text-[#9ba1b0] hover:text-[#f59e0b] transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
                title="Connect on LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
