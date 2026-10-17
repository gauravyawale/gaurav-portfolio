"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor for non-touch fine pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsPointer(true);
    setMounted(true);

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.hasAttribute("data-cursor-hover"))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationId: number;
    const updateTrail = () => {
      trailX += (mouseX - trailX) * 0.18;
      trailY += (mouseY - trailY) * 0.18;
      setTrailingPos({ x: trailX, y: trailY });
      animationId = requestAnimationFrame(updateTrail);
    };

    animationId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!mounted || !isPointer) return null;

  return (
    <>
      {/* Tiny bright center core */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-600 dark:bg-cyan-400 shadow-[0_0_10px_#0284c7] dark:shadow-[0_0_10px_#38bdf8] transition-transform duration-75"
        style={{
          width: isHovering ? "8px" : "6px",
          height: isHovering ? "8px" : "6px",
          transform: `translate3d(${pos.x - (isHovering ? 4 : 3)}px, ${
            pos.y - (isHovering ? 4 : 3)
          }px, 0)`,
        }}
      />

      {/* Outer reactive halo ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-40 rounded-full border border-cyan-600/50 dark:border-cyan-400/40 transition-all duration-200 ease-out ${
          isHovering
            ? "w-12 h-12 bg-cyan-600/15 dark:bg-cyan-500/10 border-cyan-600/80 dark:border-cyan-400/80 scale-125"
            : "w-8 h-8 scale-100"
        }`}
        style={{
          transform: `translate3d(${
            trailingPos.x - (isHovering ? 24 : 16)
          }px, ${trailingPos.y - (isHovering ? 24 : 16)}px, 0)`,
        }}
      />
    </>
  );
}
