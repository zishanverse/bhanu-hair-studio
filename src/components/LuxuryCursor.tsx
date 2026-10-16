"use client";

import React, { useEffect, useState, useRef } from "react";

/**
 * Ultra-Lightweight Champagne Cursor Halo
 * 
 * Performance & Stability Architecture:
 * 1. ONLY activates on genuine desktop mice (pointer: fine AND hover: hover).
 *    Never runs on mobile, iPad, or touchscreens where custom cursors cause ghost taps and scroll lag.
 * 2. Leaves native OS hardware cursor active so the cursor NEVER hangs or freezes even if the page is busy.
 * 3. Pure GPU transform via requestAnimationFrame — strictly ZERO 'transform' inside CSS transitions.
 * 4. Throttled target inspection to eliminate expensive DOM traversal on high-polling mice.
 * 5. Automatically pauses render loop when the window or tab is blurred/idle.
 */
export function LuxuryCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const lastTargetCheck = useRef<number>(0);

  useEffect(() => {
    // 1. Strict hardware capability check: mouse only
    const hasFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    // Prefers-reduced-motion check for accessibility
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Throttle interactive element lookup to at most once every 60ms to prevent CPU thrash
      const now = performance.now();
      if (now - lastTargetCheck.current > 60) {
        lastTargetCheck.current = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const interactive = Boolean(
            target.closest("a, button, [role='button'], input, select, textarea, [data-cursor]")
          );
          if (interactive !== isHoveredRef.current) {
            isHoveredRef.current = interactive;
            setIsHovered(interactive);
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // 2. High-Performance Inertia Loop (60/120fps GPU compositing)
    let isRunning = true;
    const render = () => {
      if (!isRunning) return;

      // Smooth lerp (0.22)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    // Pause animation when tab is inactive to preserve battery & CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (rafId.current) cancelAnimationFrame(rafId.current);
      } else {
        if (!isRunning) {
          isRunning = true;
          rafId.current = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isRunning = false;
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Precision Core Dot (Follows exact pointer) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-champagne-300 pointer-events-none will-change-transform shadow-[0_0_8px_rgba(222,199,169,0.7)] transition-opacity duration-150 ${
          isVisible ? "opacity-90" : "opacity-0"
        } ${isHovered ? "scale-150 bg-champagne-200" : "scale-100"}`}
      />

      {/* Smooth Trailing Champagne Aura Ring */}
      {/* CRITICAL: ONLY transition width/height/border/opacity, NEVER 'transform' */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform border transition-[width,height,margin,border-color,opacity,box-shadow] duration-200 ease-out ${
          isVisible ? "opacity-75" : "opacity-0"
        } ${
          isHovered
            ? "w-10 h-10 -ml-5 -mt-5 border-champagne-300/80 bg-champagne-400/10 shadow-[0_0_15px_rgba(197,164,119,0.3)]"
            : "w-7 h-7 -ml-3.5 -mt-3.5 border-champagne-400/35 bg-transparent"
        }`}
      />
    </div>
  );
}

