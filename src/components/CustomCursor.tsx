"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function useIsFinePointer() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(pointer: fine)").matches : false),
    () => false
  );
}

export default function CustomCursor() {
  const isFinePointer = useIsFinePointer();
  const [isHovering, setIsHovering] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!isFinePointer) return;

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });

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
      trailX += (mouseX - trailX) * 0.22;
      trailY += (mouseY - trailY) * 0.22;
      setTrailingPos({ x: trailX, y: trailY });
      animationId = requestAnimationFrame(updateTrail);
    };

    animationId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Precision Drafting Center Cross-dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-sm bg-[#f59e0b] transition-transform duration-75"
        style={{
          width: isHovering ? "6px" : "4px",
          height: isHovering ? "6px" : "4px",
          transform: `translate3d(${pos.x - (isHovering ? 3 : 2)}px, ${
            pos.y - (isHovering ? 3 : 2)
          }px, 0)`,
        }}
      />

      {/* Architectural Targeting Reticle Frame */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-40 transition-all duration-200 ease-out border ${
          isHovering
            ? "w-9 h-9 border-[#f59e0b] bg-[#f59e0b]/10 scale-110"
            : "w-7 h-7 border-[#2a2e3d] dark:border-[#2a2e3d] bg-transparent scale-100"
        }`}
        style={{
          transform: `translate3d(${
            trailingPos.x - (isHovering ? 18 : 14)
          }px, ${trailingPos.y - (isHovering ? 18 : 14)}px, 0)`,
        }}
      >
        {/* Subtle corner crosshairs */}
        <span className="absolute -top-1 -left-1 text-[9px] font-mono leading-none text-[#f59e0b]/70 select-none">
          +
        </span>
        <span className="absolute -bottom-1 -right-1 text-[9px] font-mono leading-none text-[#f59e0b]/70 select-none">
          +
        </span>
      </div>
    </>
  );
}
