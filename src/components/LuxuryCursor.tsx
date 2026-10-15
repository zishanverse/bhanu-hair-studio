"use client";

import React, { useEffect, useState, useRef } from "react";

export function LuxuryCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const cursorTextRef = useRef("");
  const isHoveredRef = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only mount on devices with fine pointer (mouse), not touchscreens
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setMounted(true);

    // Completely eradicate default OS cursor across the entire document
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const styleEl = document.createElement("style");
    styleEl.id = "force-hide-system-cursor";
    styleEl.innerHTML = `
      @media (pointer: fine) {
        *, *::before, *::after, html, body, a, button, input, textarea, select, canvas, [role="button"], [tabindex], .cursor-pointer, .cursor-grab, .cursor-grabbing {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Check hover targets for custom cursor states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, select, textarea");
      const canvasTarget = target.closest("canvas, [aria-label*='3D'], [aria-label*='Interactive']");
      const imageTarget = target.closest("[data-cursor='view'], #gallery img");
      const dragTarget = target.closest("[data-cursor='drag'], .horizontal-reel");

      let nextText = "";
      let nextHovered = false;

      if (canvasTarget) {
        nextText = "DRAG 3D";
        nextHovered = true;
      } else if (dragTarget) {
        nextText = "DRAG";
        nextHovered = true;
      } else if (imageTarget) {
        nextText = "EXPAND";
        nextHovered = true;
      } else if (target.closest("#experience")) {
        nextText = "RITUAL";
        nextHovered = true;
      } else if (interactive) {
        nextText = "";
        nextHovered = true;
      } else {
        nextText = "";
        nextHovered = false;
      }

      // Only trigger React state updates when state actually changes to avoid 60fps re-rendering
      if (nextText !== cursorTextRef.current) {
        cursorTextRef.current = nextText;
        setCursorText(nextText);
      }
      if (nextHovered !== isHoveredRef.current) {
        isHoveredRef.current = nextHovered;
        setIsHovered(nextHovered);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth inertia render loop for the ring follower (pure GPU transform, NO CSS transition interference)
    const render = () => {
      // Lerp ring toward mouse position
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

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      const el = document.getElementById("force-hide-system-cursor");
      if (el) el.remove();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Precision Core Dot (Tracks cursor position instantly) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-champagne-300 pointer-events-none will-change-transform shadow-[0_0_10px_rgba(222,199,169,0.8)] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${cursorText ? "scale-0" : isClicking ? "scale-150" : "scale-100"}`}
      />

      {/* Smooth Magnetic Halo Ring with Dynamic Context Text */}
      {/* Note: Transform is handled purely in requestAnimationFrame; CSS transitions ONLY width/height/colors/opacity to prevent lag & stutter! */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none will-change-transform border backdrop-blur-[1px] transition-[width,height,margin,background-color,border-color,opacity,box-shadow,transform] duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          cursorText
            ? "w-20 h-20 -ml-10 -mt-10 bg-obsidian-950/85 border-champagne-400 shadow-[0_0_30px_rgba(197,164,119,0.45)]"
            : isClicking
            ? "w-7 h-7 -ml-3.5 -mt-3.5 bg-champagne-400/25 border-champagne-300 shadow-[0_0_15px_rgba(197,164,119,0.5)]"
            : isHovered
            ? "w-12 h-12 -ml-6 -mt-6 bg-champagne-500/15 border-champagne-400 shadow-[0_0_20px_rgba(197,164,119,0.25)]"
            : "w-8 h-8 -ml-4 -mt-4 bg-transparent border-champagne-400/40"
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-champagne-300 uppercase font-semibold text-center leading-none px-1 animate-in fade-in zoom-in-90 duration-150">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
