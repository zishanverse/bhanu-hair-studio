"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const TOTAL_FRAMES = 150;
const FRAME_STEP = 6;
const CACHE_KEY = "v150_cinema";

function getOriginalFrameUrl(sampledIndex: number): string {
  const originalIndex = Math.min(900, Math.max(1, (sampledIndex - 1) * FRAME_STEP + 1));
  const padded = String(originalIndex).padStart(4, "0");
  return `/sequence/frame_${padded}.webp?v=${CACHE_KEY}`;
}

const CHAPTERS = [
  {
    range: [0, 0.25],
    num: "01",
    eyebrow: "ANATOMY & SECTIONING",
    title: "Cranial Topography Mapping",
    desc: "Every cut begins with parietal ridge sectioning to sculpt organic movement aligned with natural cranial contours.",
    position: "left" as const,
  },
  {
    range: [0.25, 0.55],
    num: "02",
    eyebrow: "PRECISION METALLURGY",
    title: "Damascus Scissor Artistry",
    desc: "Hand-forged Japanese VG-10 convex blades execute micro-point calibration without strand friction or structural trauma.",
    position: "right" as const,
  },
  {
    range: [0.55, 0.82],
    num: "03",
    eyebrow: "DIMENSIONAL COLOUR",
    title: "French Balayage & Gloss",
    desc: "Seamless sunlight reflections painted by hand, infused with botanical lipid reconstruction for sustained luster.",
    position: "center" as const,
  },
  {
    range: [0.82, 1.0],
    num: "04",
    eyebrow: "THE ATELIER SILHOUETTE",
    title: "Weightless Kinetic Finish",
    desc: "Bespoke styling and blow-dry rituals customized to individual lifestyle, texture, and natural fall.",
    position: "left" as const,
  },
];

function getChapterStyle(
  progress: number,
  start: number,
  end: number,
  isFirst: boolean,
  isLast: boolean
) {
  const ramp = 0.04;

  if (progress < start - (isFirst ? 0 : ramp)) {
    return { opacity: 0, translateY: 32, pointerEvents: "none" as const };
  }
  if (progress > end + (isLast ? 0 : ramp)) {
    return { opacity: 0, translateY: -32, pointerEvents: "none" as const };
  }

  let opacity = 1;
  let translateY = 0;

  // Entry ramp
  if (!isFirst && progress < start + ramp) {
    const p = Math.max(0, Math.min(1, (progress - (start - ramp)) / (ramp * 2)));
    opacity = p;
    translateY = (1 - p) * 32;
  }
  // Exit ramp
  else if (!isLast && progress > end - ramp) {
    const p = Math.max(0, Math.min(1, (end + ramp - progress) / (ramp * 2)));
    opacity = p;
    translateY = (1 - p) * -32;
  }

  return {
    opacity: Math.max(0, Math.min(1, opacity)),
    translateY,
    pointerEvents: opacity > 0.15 ? ("auto" as const) : ("none" as const),
  };
}

export function ScrollCinemaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSet = useRef<Set<number>>(new Set());
  const lastDrawnFrameRef = useRef<number>(-1);

  const requestFrame = useCallback((index: number) => {
    if (index < 1 || index > TOTAL_FRAMES) return;
    if (imageCache.current.has(index) || loadingSet.current.has(index)) return;

    if (imageCache.current.size >= 45) {
      const keys = Array.from(imageCache.current.keys());
      let maxDist = -1;
      let evictKey = keys[0];
      for (const k of keys) {
        const d = Math.abs(k - index);
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
        img.decode().then(() => imageCache.current.set(index, img)).catch(() => imageCache.current.set(index, img));
      } else {
        imageCache.current.set(index, img);
      }
    };
    img.onerror = () => {
      loadingSet.current.delete(index);
    };
  }, []);

  const warmWindow = useCallback((centerIndex: number) => {
    const radius = 10;
    requestFrame(centerIndex);
    for (let r = 1; r <= radius; r++) {
      if (centerIndex + r <= TOTAL_FRAMES) requestFrame(centerIndex + r);
      if (centerIndex - r >= 1) requestFrame(centerIndex - r);
    }
  }, [requestFrame]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imageCache.current.get(frameIndex);
    if (!img) {
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
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const scale = Math.min(1.2, 1280 / window.innerWidth);
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      if (lastDrawnFrameRef.current > 0) {
        drawFrame(lastDrawnFrameRef.current);
      }
    };
    handleResize();

    // Preload initial window
    for (let i = 1; i <= 15; i++) {
      requestFrame(i);
    }

    const firstImg = new Image();
    firstImg.src = getOriginalFrameUrl(1);
    firstImg.onload = () => {
      imageCache.current.set(1, firstImg);
      drawFrame(1);
    };

    let st: ScrollTrigger | null = null;

    if (sectionRef.current && pinContainerRef.current) {
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        pin: pinContainerRef.current,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          const frame = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(p * (TOTAL_FRAMES - 1) + 1))
          );
          warmWindow(frame);
          drawFrame(frame);
        },
      });
    }

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (st) st.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, requestFrame, warmWindow]);

  return (
    <section
      id="cinema-experience"
      ref={sectionRef}
      className="relative w-full bg-obsidian-950 text-ivory-50 select-none overflow-hidden"
    >
      <div
        ref={pinContainerRef}
        className="relative w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-black"
      >
        {/* 1. Master Video Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.78] contrast-[1.05]"
        />

        {/* Quiet Velvet Gradients for text legibility without blocking the video */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-obsidian-950/80 via-transparent to-obsidian-950/60" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75)_100%)]" />

        {/* 2. Minimalist Editorial Landmark Top Bar */}
        <header className="relative z-10 w-full px-6 sm:px-12 md:px-16 pt-8 flex items-center justify-between border-b border-champagne-500/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
            <span className="text-[10px] uppercase tracking-ultra text-champagne-300 font-mono font-medium">
              02 / THE TRANSFORMATION IN MOTION
            </span>
          </div>

          <div className="text-[10px] font-mono text-champagne-400/80 tracking-widest uppercase hidden sm:block">
            ATELIER CRAFT · INDORE
          </div>
        </header>

        {/* 3. Frameless Editorial Chapter Transitions (No Heavy Box, Smooth Continuous Section Changes) */}
        <div className="relative z-10 w-full flex-1 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-8 flex items-center pointer-events-none">
          <div className="relative w-full h-full min-h-[360px] flex items-center">
            {CHAPTERS.map((chapter, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === CHAPTERS.length - 1;
              const style = getChapterStyle(
                scrollProgress,
                chapter.range[0],
                chapter.range[1],
                isFirst,
                isLast
              );

              if (style.opacity <= 0.005) return null;

              return (
                <div
                  key={chapter.num}
                  style={{
                    opacity: style.opacity,
                    transform: `translate3d(0, ${style.translateY}px, 0)`,
                    pointerEvents: style.pointerEvents,
                  }}
                  className={`absolute inset-0 flex items-center transition-opacity duration-100 will-change-[transform,opacity] ${
                    chapter.position === "left"
                      ? "justify-start text-left"
                      : chapter.position === "right"
                      ? "justify-end text-left sm:text-right"
                      : "justify-center text-center"
                  }`}
                >
                  <div
                    className={`max-w-xl select-none space-y-4 ${
                      chapter.position === "right"
                        ? "sm:items-end flex flex-col"
                        : chapter.position === "center"
                        ? "items-center flex flex-col"
                        : "items-start flex flex-col"
                    }`}
                  >
                    {/* Watermark Section Ghost Numeral */}
                    <div className="font-serif text-6xl sm:text-7xl md:text-8xl text-champagne-400/25 leading-none tracking-tighter select-none -mb-3 sm:-mb-5 font-light drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                      {chapter.num}
                    </div>

                    {/* Monospace Eyebrow with gold accent rule */}
                    <div
                      className={`flex items-center gap-3 text-champagne-300 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
                        chapter.position === "right" ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="w-8 h-[1px] bg-champagne-400/70 shrink-0" />
                      <span>{chapter.eyebrow}</span>
                    </div>

                    {/* Monumental Editorial Headline */}
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory-50 tracking-tight leading-[1.12] font-light drop-shadow-[0_4px_35px_rgba(0,0,0,0.98)]">
                      {chapter.title}
                    </h3>

                    {/* Editorial Description Text */}
                    <p
                      className={`text-sm sm:text-base text-ivory-200/90 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] ${
                        chapter.position === "center" ? "mx-auto" : ""
                      }`}
                    >
                      {chapter.desc}
                    </p>

                    {/* Quiet Section Status Badge */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-champagne-300 uppercase bg-obsidian-950/40 border border-champagne-500/25 backdrop-blur-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                        ACT {chapter.num} OF 04
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Luxury Chapter Navigation Rail (Desktop / Tablet) */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-6 items-end pointer-events-none">
          {CHAPTERS.map((ch, idx) => {
            const isCurrent =
              scrollProgress >= ch.range[0] &&
              scrollProgress < (idx === CHAPTERS.length - 1 ? 1.01 : ch.range[1]);
            return (
              <div
                key={ch.num}
                className="flex items-center gap-3 transition-all duration-300"
              >
                <span
                  className={`font-mono text-[10px] tracking-widest transition-all duration-300 ${
                    isCurrent
                      ? "text-champagne-300 font-semibold opacity-100 scale-105"
                      : "text-ivory-200/35 opacity-40"
                  }`}
                >
                  {ch.num}
                </span>
                <div
                  className={`transition-all duration-500 rounded-full ${
                    isCurrent
                      ? "w-8 h-[2px] bg-champagne-400 shadow-[0_0_12px_rgba(200,162,82,0.8)]"
                      : "w-2.5 h-[1px] bg-champagne-500/30"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Quiet 1px Gold Hairline Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-champagne-500/15 pointer-events-none z-20">
          <div
            className="h-full bg-champagne-400 transition-all duration-75 origin-left shadow-[0_0_8px_rgba(200,162,82,0.6)]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default ScrollCinemaSection;
