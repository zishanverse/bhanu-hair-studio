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

// Persistent image cache across React remounts
const globalImageCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null);
const globalLoadingStatus: boolean[] = new Array(TOTAL_FRAMES + 1).fill(false);

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/sequence/frame_${padded}.webp?v=${CACHE_KEY}`;
}

/**
 * Adaptive hardware & network budgeting inspired by Reposé Residence
 */
function getDeviceBudget() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return { stride: 1, concurrency: 10, warmAhead: 30 };
  }
  const nav = navigator as any;
  const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : null;
  const cores = typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : null;
  const conn = nav.connection;
  const isSlowNetwork =
    conn?.saveData === true ||
    conn?.effectiveType === "2g" ||
    conn?.effectiveType === "slow-2g" ||
    conn?.effectiveType === "3g";

  const isConstrained =
    (memory !== null && memory <= 4) ||
    (cores !== null && cores <= 4) ||
    isSlowNetwork;

  return {
    stride: isConstrained ? 2 : 1,
    concurrency: isConstrained ? 4 : 10,
    warmAhead: isConstrained ? 16 : 32,
  };
}

export function CinematicBackground({
  className = "",
  totalFrames = TOTAL_FRAMES,
}: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgressRef = useRef<number>(0);
  const lastStateRef = useRef<{ a: number; b: number; mix: number }>({ a: -1, b: -1, mix: 0 });
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Helper: Get loaded image or nearest available frame
  const getLoadedImage = useCallback((index: number): HTMLImageElement | null => {
    const exact = globalImageCache[index];
    if (exact && exact.complete && exact.naturalWidth > 0) {
      return exact;
    }
    // Search nearby loaded frame to prevent any blank flashing
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

  // Request a frame from network with async GPU off-thread decode
  const requestFrame = useCallback((index: number) => {
    if (index < 1 || index > totalFrames) return;
    if (globalImageCache[index] || globalLoadingStatus[index]) return;

    globalLoadingStatus[index] = true;
    const img = new Image();
    img.decoding = "async";
    img.src = getFrameUrl(index);
    img.onload = () => {
      if ("decode" in img && typeof img.decode === "function") {
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

  // Prioritize window around current scroll with hardware stride budgeting
  const prioritizeWindow = useCallback((centerIndex: number) => {
    const budget = getDeviceBudget();
    const radius = budget.warmAhead;
    const min = Math.max(1, centerIndex - radius);
    const max = Math.min(totalFrames, centerIndex + radius);

    requestFrame(centerIndex);
    for (let r = 1; r <= radius; r += budget.stride) {
      if (centerIndex + r <= max) requestFrame(centerIndex + r);
      if (centerIndex - r >= min) requestFrame(centerIndex - r);
    }
  }, [totalFrames, requestFrame]);

  /**
   * Dual-Buffer Smooth Frame Renderer:
   * Cross-dissolves frame A and frame B when scrubbed between integer frames,
   * eliminating stepping artifacts and providing continuous fluid cinema playback.
   */
  const drawDualBuffer = useCallback((frameAIndex: number, frameBIndex: number, mix: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const imgA = getLoadedImage(frameAIndex);
    if (!imgA || !imgA.complete || imgA.naturalWidth === 0) return;

    const imgRatio = imgA.naturalWidth / imgA.naturalHeight;
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

    // 1. Draw base frame A
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgA, dx, dy, dw, dh);

    // 2. Cross-dissolve frame B if between frames and frame B is ready
    if (mix > 0.001 && frameBIndex !== frameAIndex) {
      const imgB = globalImageCache[frameBIndex];
      if (imgB && imgB.complete && imgB.naturalWidth > 0) {
        ctx.globalAlpha = Math.min(1.0, mix);
        ctx.drawImage(imgB, dx, dy, dw, dh);
        ctx.globalAlpha = 1.0;
      }
    }

    lastStateRef.current = { a: frameAIndex, b: frameBIndex, mix };
  }, [getLoadedImage]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // Desktop experience >= 768px

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Set canvas resolution to DPR (capped at 1.8 for maximum GPU performance & clarity)
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      const st = lastStateRef.current;
      if (st.a > 0) {
        drawDualBuffer(st.a, st.b, st.mix);
      }
    };
    handleResize();

    // 2. Immediate Prime: First frame warmup
    const frame1 = new Image();
    frame1.decoding = "async";
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      globalImageCache[1] = frame1;
      drawDualBuffer(1, 1, 0);
    };

    // Preload initial warmup chunk for immediate fluidity
    const budget = getDeviceBudget();
    for (let i = 2; i <= Math.min(60, totalFrames); i += budget.stride) {
      requestFrame(i);
    }

    // Stream remaining frames in idle slices
    const streamRest = () => {
      for (let i = 61; i <= totalFrames; i += budget.stride) {
        requestFrame(i);
      }
    };
    if (typeof window.requestIdleCallback !== "undefined") {
      window.requestIdleCallback(streamRest, { timeout: 1200 });
    } else {
      setTimeout(streamRest, 80);
    }

    // 3. Ultra-Smooth Lenis Inertia Engine (aligned to Reposé reference specs)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1.0 : 0.08,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: false,
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

    // GSAP Ticker Synchronization with zero lag smoothing
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Bi-Directional Dual-Buffer Render Loop
    isLoopActiveRef.current = true;

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      const progress = Math.max(0, Math.min(1, scrollProgressRef.current));
      
      // Calculate continuous float target frame position
      const exactFrameFloat = progress * (totalFrames - 1) + 1;
      const frameA = Math.min(totalFrames, Math.max(1, Math.floor(exactFrameFloat)));
      const frameB = Math.min(totalFrames, frameA + 1);
      const mix = exactFrameFloat - Math.floor(exactFrameFloat);

      // Prioritize buffer around current frame
      prioritizeWindow(frameA);

      // Repaint if frame or mix changed
      const prev = lastStateRef.current;
      if (
        frameA !== prev.a ||
        frameB !== prev.b ||
        Math.abs(mix - prev.mix) > 0.02
      ) {
        drawDualBuffer(frameA, frameB, mix);
      }

      // Update bottom champagne progress line
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
  }, [totalFrames, drawDualBuffer, requestFrame, prioritizeWindow]);

  return (
    <>
      {/* 1. FIXED FULL-PAGE CINEMATIC DUAL-BUFFER CANVAS BACKGROUND (Desktop >= 768px) */}
      <div
        className={`hidden md:block fixed inset-0 w-full h-[100dvh] overflow-hidden select-none pointer-events-none z-0 bg-obsidian-950 ${className}`}
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
          className="w-full h-full object-cover filter brightness-[1.0] contrast-[1.05]"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Luxury editorial grading veil: balances video with high-contrast typography */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,5,0.6)_100%)]" />
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

