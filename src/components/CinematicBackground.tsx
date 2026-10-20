"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export interface CinematicBackgroundProps {
  className?: string;
}

// Optimization: Use every 6th frame of the 900 frame sequence (~150 frames total)
const FRAME_STEP = 6;
const TOTAL_FRAMES = 150;
const CACHE_KEY = "v150_hero";

// Frame URL mapping: maps downsampled index (1..150) to the underlying frame_0001..frame_0900
function getOriginalFrameUrl(sampledIndex: number): string {
  const originalIndex = Math.min(900, Math.max(1, (sampledIndex - 1) * FRAME_STEP + 1));
  const padded = String(originalIndex).padStart(4, "0");
  return `/sequence/frame_${padded}.webp?v=${CACHE_KEY}`;
}

export function CinematicBackground({ className = "" }: CinematicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Bounded ring-buffer / LRU cache: max 40 decoded frames
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSet = useRef<Set<number>>(new Set());

  const heroProgressRef = useRef<number>(0);
  const isHeroInViewRef = useRef<boolean>(true);
  const lastDrawnFrameRef = useRef<number>(-1);
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Request a frame with bounded cache management
  const requestFrame = useCallback((index: number) => {
    if (index < 1 || index > TOTAL_FRAMES) return;
    if (imageCache.current.has(index) || loadingSet.current.has(index)) return;

    // Evict oldest frames if cache exceeds 40 frames
    if (imageCache.current.size >= 40) {
      const keys = Array.from(imageCache.current.keys());
      // Find frame farthest from current playhead
      let maxDist = -1;
      let evictKey = keys[0];
      const current = Math.round(heroProgressRef.current * (TOTAL_FRAMES - 1) + 1);
      for (const k of keys) {
        const d = Math.abs(k - current);
        if (d > maxDist) {
          maxDist = d;
          evictKey = k;
        }
      }
      imageCache.current.delete(evictKey);
    }

    loadingSet.current.add(index);
    const img = new Image();
    img.decoding = "async";
    img.src = getOriginalFrameUrl(index);
    img.onload = () => {
      loadingSet.current.delete(index);
      if ("decode" in img && typeof img.decode === "function") {
        img
          .decode()
          .then(() => {
            imageCache.current.set(index, img);
          })
          .catch(() => {
            imageCache.current.set(index, img);
          });
      } else {
        imageCache.current.set(index, img);
      }
    };
    img.onerror = () => {
      loadingSet.current.delete(index);
    };
  }, []);

  // Pre-warm window around current playhead
  const warmWindow = useCallback(
    (centerIndex: number) => {
      const radius = 12;
      requestFrame(centerIndex);
      for (let r = 1; r <= radius; r++) {
        if (centerIndex + r <= TOTAL_FRAMES) requestFrame(centerIndex + r);
        if (centerIndex - r >= 1) requestFrame(centerIndex - r);
      }
    },
    [requestFrame]
  );

  // Draw frame to canvas with aspect preservation
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imageCache.current.get(frameIndex);
    if (!img) {
      // Find closest cached frame
      let closestDist = Infinity;
      for (const [k, v] of imageCache.current.entries()) {
        const dist = Math.abs(k - frameIndex);
        if (dist < closestDist) {
          closestDist = dist;
          img = v;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;

    if (canvasRatio > imgRatio) {
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * imgRatio;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // Desktop experience only

    const canvas = canvasRef.current;
    if (!canvas) return;

    // High performance resolution cap (max 1280px wide)
    const handleResize = () => {
      const scale = Math.min(1.2, 1280 / window.innerWidth);
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      if (lastDrawnFrameRef.current > 0) {
        drawFrame(lastDrawnFrameRef.current);
      }
    };
    handleResize();

    // Warm first frame immediately
    const f1 = new Image();
    f1.decoding = "async";
    f1.src = getOriginalFrameUrl(1);
    f1.onload = () => {
      imageCache.current.set(1, f1);
      drawFrame(1);
    };

    // Warm first 15 frames
    for (let i = 2; i <= 15; i++) {
      requestFrame(i);
    }

    // ScrollTrigger: Map scrubbed playback strictly to Hero pin
    const heroEl = document.getElementById("cinematic-experience");
    let st: ScrollTrigger | null = null;

    if (heroEl) {
      st = ScrollTrigger.create({
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          heroProgressRef.current = self.progress;
          if (containerRef.current) {
            // Fade out smoothly as hero leaves view
            const fadeProgress = Math.max(0, (self.progress - 0.75) / 0.25);
            containerRef.current.style.opacity = `${1 - fadeProgress}`;
          }
        },
        onEnter: () => {
          isHeroInViewRef.current = true;
          if (containerRef.current) containerRef.current.style.visibility = "visible";
        },
        onLeave: () => {
          isHeroInViewRef.current = false;
          if (containerRef.current) containerRef.current.style.visibility = "hidden";
        },
        onEnterBack: () => {
          isHeroInViewRef.current = true;
          if (containerRef.current) containerRef.current.style.visibility = "visible";
        },
        onLeaveBack: () => {
          isHeroInViewRef.current = true;
          if (containerRef.current) containerRef.current.style.visibility = "visible";
        },
      });
    }

    // Bottom progress line tracking entire document scroll
    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const docProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${docProgress})`;
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Render Loop: Runs ONLY while Hero is in view
    isLoopActiveRef.current = true;

    const renderLoop = () => {
      if (!isLoopActiveRef.current) return;

      if (isHeroInViewRef.current) {
        const targetFrame = Math.min(
          TOTAL_FRAMES,
          Math.max(1, Math.round(heroProgressRef.current * (TOTAL_FRAMES - 1) + 1))
        );

        warmWindow(targetFrame);

        if (targetFrame !== lastDrawnFrameRef.current) {
          drawFrame(targetFrame);
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isLoopActiveRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (st) st.kill();
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, requestFrame, warmWindow]);

  return (
    <>
      {/* 1. HERO BOUNDED CANVAS BACKGROUND (Desktop >= 768px) */}
      <div
        ref={containerRef}
        className={`hidden md:block fixed inset-0 w-full h-[100dvh] overflow-hidden select-none pointer-events-none z-0 bg-obsidian-950 transition-opacity duration-300 ${className}`}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          id="cinematic-background-canvas"
          className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1]"
        />

        {/* Rich obsidian & gold gradient veils for high legibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/65 via-black/40 to-black/85" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.75)_100%)]" />
      </div>

      {/* 2. Global Scroll Progress Line along viewport bottom */}
      <div className="hidden md:block fixed bottom-0 left-0 w-full h-[2px] bg-obsidian-900/60 z-40 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-champagne-400 origin-left will-change-transform shadow-[0_0_10px_rgba(200,162,82,0.85)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}

export default CinematicBackground;
