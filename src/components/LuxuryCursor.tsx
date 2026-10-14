"use client";

import React, { useEffect, useState, useRef } from "react";

export function LuxuryCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only mount on devices with fine pointer (mouse), not touchscreens
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hover targets for custom cursor states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, select, textarea");
      const canvasTarget = target.closest("canvas, [aria-label*='3D'], [aria-label*='Interactive']");
      const imageTarget = target.closest("img, [data-cursor]");

      if (canvasTarget) {
        setCursorText("DRAG 3D");
        setIsHovered(true);
      } else if (target.closest("#experience")) {
        setCursorText("INSPECT");
        setIsHovered(true);
      } else if (target.closest("#gallery")) {
        setCursorText("VIEW");
        setIsHovered(true);
      } else if (interactive) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth inertia render loop for the ring follower
    const render = () => {
      // Lerp ring toward mouse position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-champagne-300 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${cursorText ? "scale-0" : "scale-100"}`}
      />

      {/* Smooth Magnetic Halo Ring with Dynamic Context Text */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border border-champagne-400/50 backdrop-blur-[2px] transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          cursorText
            ? "w-20 h-20 -ml-10 -mt-10 bg-obsidian-950/80 border-champagne-400 shadow-[0_0_25px_rgba(197,164,119,0.35)]"
            : isHovered
            ? "w-12 h-12 -ml-6 -mt-6 bg-champagne-500/10 border-champagne-400"
            : "w-8 h-8 -ml-4 -mt-4 bg-transparent"
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-champagne-300 uppercase font-semibold text-center leading-none px-1">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
