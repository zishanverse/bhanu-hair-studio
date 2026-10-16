"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

export interface CinematicBackgroundProps {
  className?: string;
  totalFrames?: number;
}

const TOTAL_FRAMES = 900;
const CACHE_KEY = "v900";

// Module-level persistent cache across React remounts / StrictMode / Fast-Refresh
const globalImageCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null);
const globalLoadingStatus: boolean[] = new Array(TOTAL_FRAMES + 1).fill(false);

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/sequence/frame_${padded}.webp?v=${CACHE_KEY}`;
}

export function CinematicBackground({
  className = "",
  totalFrames = TOTAL_FRAMES,
}: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Smooth scroll momentum tracking directly synced with Lenis
  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgressRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Helper: Get loaded image or nearest available fallback
  const getLoadedImage = useCallback((index: number): HTMLImageElement | null => {
    const exact = globalImageCache[index];
    if (exact && exact.complete && exact.naturalWidth > 0) {
      return exact;
    }
    // Search nearby loaded frame so screen never flashes blank
    let closestDist = Infinity;
    let closest: HTMLImageElement | null = null;
    for (let i = 1; i <= totalFrames; i++) {
      const candidate = globalImageCache[i];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        const dist = Math.abs(i - index);
        if (dist < closestDist) {
          closestDist = dist;
          closest = candidate;
        }
      }
    }
    return closest;
  }, [totalFrames]);

  // Request a frame from network with off-thread GPU decode to eliminate main-thread stutter
  const requestFrame = useCallback((index: number) => {
    if (index < 1 || index > totalFrames) return;
    if (globalImageCache[index] || globalLoadingStatus[index]) return;

    globalLoadingStatus[index] = true;
    const img = new Image();
    img.src = getFrameUrl(index);
    img.onload = () => {
      if ("decode" in img) {
        img
          .decode()
          .then(() => {
            globalImageCache[index] = img;
          })
          .catch(() => {
            globalImageCache[index] = img;
          });
      } else {
        globalImageCache[index] = img;
      }
    };
    img.onerror = () => {
      globalLoadingStatus[index] = false;
    };
  }, [totalFrames]);

  // Priority window around current scroll
  const prioritizeWindow = useCallback((centerIndex: number, radius = 32) => {
    const min = Math.max(1, centerIndex - radius);
    const max = Math.min(totalFrames, centerIndex + radius);
    requestFrame(centerIndex);
    for (let r = 1; r <= radius; r++) {
      if (centerIndex + r <= max) requestFrame(centerIndex + r);
      if (centerIndex - r >= min) requestFrame(centerIndex - r);
    }
  }, [totalFrames, requestFrame]);

  // Solid, Crisp Single-Frame Canvas Renderer (100% sharp single frames)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const img = getLoadedImage(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

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
    ctx.imageSmoothingQuality = "high";
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnFrameRef.current = frameIndex;
  }, [getLoadedImage]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // Desktop experience >= 768px

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize canvas resolution matching DPR (capped at 2 for max performance)
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      if (lastDrawnFrameRef.current > 0) {
        drawFrame(lastDrawnFrameRef.current);
      }
    };
    handleResize();

    // 2. High-Speed Preloader
    // Load frame 1 immediately and draw
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      globalImageCache[1] = frame1;
      drawFrame(1);
    };

    // Preload initial 120 frames for instant hero fluidity
    for (let i = 2; i <= Math.min(120, totalFrames); i++) {
      requestFrame(i);
    }

    // Stream remaining frames in background
    const streamRest = () => {
      for (let i = 121; i <= totalFrames; i++) {
        requestFrame(i);
      }
    };
    if (typeof window.requestIdleCallback !== "undefined") {
      window.requestIdleCallback(streamRest);
    } else {
      setTimeout(streamRest, 60);
    }

    // 3. Apple-Grade Lenis Smooth Scrolling Engine (Flywheel Luxury Inertia)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.1 : 1.4,
      easing: prefersReducedMotion ? (t) => t : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgressRef.current = Math.max(0, Math.min(1, scrollY / maxScroll));
    };

    lenis.on("scroll", (e: any) => {
      if (typeof e.progress === "number") {
        scrollProgressRef.current = Math.max(0, Math.min(1, e.progress));
      } else {
        updateScrollProgress();
      }
    });

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateScrollProgress();

    // GSAP Ticker synchronization for Lenis
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Synchronous Momentum-Synced Render Loop (60/120fps)
    isLoopActiveRef.current = true;

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      const progress = Math.max(0, Math.min(1, scrollProgressRef.current));
      
      // Calculate target integer frame index (1 to 900)
      const targetFrame = Math.min(
        totalFrames,
        Math.max(1, Math.round(progress * (totalFrames - 1)) + 1)
      );

      // Prioritize buffer around current frame
      prioritizeWindow(targetFrame, 32);

      // Only repaint if frame index changed
      if (targetFrame !== lastDrawnFrameRef.current) {
        drawFrame(targetFrame);
      }

      // Update bottom gold progress line
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isLoopActiveRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [totalFrames, drawFrame, requestFrame, prioritizeWindow]);

  return (
    <>
      {/* 1. FIXED FULL-PAGE CINEMATIC CANVAS BACKGROUND (Desktop >= 768px) */}
      <div
        className={`hidden md:block fixed inset-0 w-full h-[100dvh] overflow-hidden select-none pointer-events-none z-0 bg-black ${className}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          id="cinematic-background-canvas"
          className="w-full h-full object-cover filter brightness-[1.0] contrast-[1.04]"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Luxury editorial grading veil: perfectly balances light video background with crisp text contrast */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.5)_100%)]" />
      </div>

      {/* 2. Global Scroll Progress Line along the bottom of the viewport */}
      <div className="hidden md:block fixed bottom-0 left-0 w-full h-[2px] bg-obsidian-900/60 z-40 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-champagne-400 origin-left will-change-transform shadow-[0_0_8px_rgba(200,162,82,0.8)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}

export default CinematicBackground;
