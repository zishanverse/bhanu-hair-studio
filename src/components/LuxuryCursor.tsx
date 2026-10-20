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
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const cursorLabelRef = useRef<string | null>(null);
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

      // Throttle interactive element lookup to at most once every 50ms to prevent CPU thrash
      const now = performance.now();
      if (now - lastTargetCheck.current > 50) {
        lastTargetCheck.current = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const isTextInput = Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
          if (isTextInput) {
            if (isVisibleRef.current) {
              isVisibleRef.current = false;
              setIsVisible(false);
            }
            return;
          } else if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            setIsVisible(true);
          }

          const interactive = Boolean(
            target.closest("a, button, [role='button'], [data-cursor], .cursor-pointer")
          );
          if (interactive !== isHoveredRef.current) {
            isHoveredRef.current = interactive;
            setIsHovered(interactive);
          }

          const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;
          const label = cursorElement?.dataset.cursor?.trim() || null;
          if (label !== cursorLabelRef.current) {
            cursorLabelRef.current = label;
            setCursorLabel(label);
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

      // Smooth inertia lerp (0.22)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ringPos.current.x + 18}px, ${ringPos.current.y + 14}px, 0)`;
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
      {/* 1. Precision Core Dot (Follows exact pointer) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-champagne-300 pointer-events-none will-change-transform shadow-[0_0_8px_rgba(222,199,169,0.7)] transition-opacity duration-150 ${
          isVisible ? "opacity-90" : "opacity-0"
        } ${isHovered ? "scale-150 bg-champagne-200" : "scale-100"}`}
      />

      {/* 2. Smooth Trailing Champagne Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform border transition-[width,height,margin,border-color,opacity,box-shadow] duration-200 ease-out ${
          isVisible ? "opacity-75" : "opacity-0"
        } ${
          cursorLabel === "Drag" || cursorLabel === "Swipe Reel"
            ? "w-14 h-14 -ml-7 -mt-7 border-champagne-300 bg-champagne-400/20 shadow-[0_0_25px_rgba(200,162,82,0.4)]"
            : cursorLabel === "View" || cursorLabel === "Inspect"
            ? "w-12 h-12 -ml-6 -mt-6 border-white/80 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            : isHovered
            ? "w-10 h-10 -ml-5 -mt-5 border-champagne-300/80 bg-champagne-400/10 shadow-[0_0_15px_rgba(197,164,119,0.3)]"
            : "w-7 h-7 -ml-3.5 -mt-3.5 border-champagne-400/35 bg-transparent"
        }`}
      />

      {/* 3. Contextual Cursor Label Badge (Inspired by Reposé Residence) */}
      <div
        ref={labelRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform transition-all duration-200 ${
          cursorLabel ? "opacity-100 scale-100" : "opacity-0 scale-80"
        }`}
        style={{ transform: `translate3d(-100px, -100px, 0)` }}
      >
        <span className="inline-block text-[10px] uppercase font-sans tracking-[0.24em] px-2.5 py-1 rounded-full bg-champagne-300 text-obsidian-950 font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.85)] border border-champagne-100/60">
          {cursorLabel}
        </span>
      </div>
    </div>
  );
}

