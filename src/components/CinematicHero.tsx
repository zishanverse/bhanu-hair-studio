"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONFIG } from "@/config/scenes";
import { MobileHero3D } from "@/components/MobileHero3D";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Cached DOM element refs to eliminate React 19 60fps re-rendering during scroll
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const actButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeSceneIndexRef = useRef<number>(0);

  // High-performance animation & seek tracking refs
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Coalesced Hardware Video Seeking Engine (Strict Single-Flight Seek Lock)
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);
  const lastRequestedTimeRef = useRef<number>(-1);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (window.innerWidth < 768) return; // Dedicated WebGL Mobile Engine for < 768px

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = videoRef.current;

    // 1. Strict Video Initialization: Hardware Paused at all times
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      v.playsInline = true;
      v.pause();
    }

    // 2. Coalesced Video Seek Handler (Eliminates decoder queue stalls & freezes)
    const requestSeek = (time: number) => {
      const video = videoRef.current;
      if (!video || video.readyState < 1) return;

      // Skip negligible micro-jitter (< 1/120th of a second)
      if (Math.abs(time - lastRequestedTimeRef.current) < 0.008) return;
      lastRequestedTimeRef.current = time;

      // If a hardware seek is currently in flight, coalesce and queue the latest time
      if (isSeekingRef.current) {
        pendingTimeRef.current = time;
        return;
      }

      // No seek in flight: issue immediately
      isSeekingRef.current = true;
      pendingTimeRef.current = null;

      try {
        if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(time);
        } else {
          video.currentTime = time;
        }
      } catch {
        video.currentTime = time;
      }
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      // If a newer scroll position arrived while the decoder was processing the previous frame:
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        requestSeek(nextTime);
      }
    };

    if (v) {
      v.addEventListener("seeked", onSeeked);
    }

    // 3. Fast, Responsive Unified Lenis Smooth Wheel Engine
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Deterministic GSAP ScrollTrigger Pinning
    const scrollLength = 3200; // Calibrated virtual scroll distance for 44-second film

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.05,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
      onRefresh: (self) => {
        targetProgressRef.current = self.progress;
      },
    });
    stRef.current = st;

    // Refresh ScrollTrigger once video metadata loads to ensure precise dimensions
    const onMeta = () => {
      if (v) {
        requestSeek(0);
      }
      ScrollTrigger.refresh();
    };

    if (v) {
      if (v.readyState >= 1) {
        onMeta();
      } else {
        v.addEventListener("loadedmetadata", onMeta, { once: true });
      }
    }

    // 5. Unified 60/120fps Animation Loop (Zero React re-renders)
    isLoopActiveRef.current = true;
    const lerpFactor = prefersReducedMotion ? 1 : 0.14;

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      // Smoothly converge currentProgress toward targetProgress (Apple-style sub-pixel inertia)
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00008) {
        currentProgressRef.current += diff * lerpFactor;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const progress = Math.max(0, Math.min(1, currentProgressRef.current));

      // 5a. Deterministic Hardware Video Sync
      if (v && v.duration) {
        const dur = v.duration || 44.011;
        const targetTime = Math.max(0, Math.min(dur - 0.05, progress * dur));
        requestSeek(targetTime);
      }

      // 5b. Update Bottom Progress Bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // 5c. Update Centered Scene Overlays with Sine Easing
      const scenes = HERO_CONFIG.scenes;
      let activeIdx = 0;

      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        let opacity = 0;
        let translateY = 16;

        if (progress >= scene.start && progress <= scene.end) {
          if (progress < scene.peak) {
            const t = (progress - scene.start) / Math.max(0.001, scene.peak - scene.start);
            opacity = Math.sin((t * Math.PI) / 2);
            translateY = (1 - t) * 16;
          } else {
            const t = (progress - scene.peak) / Math.max(0.001, scene.end - scene.peak);
            opacity = Math.cos((t * Math.PI) / 2);
            translateY = -t * 16;
          }
        }

        const node = sceneRefs.current[i];
        if (node) {
          if (opacity > 0.02) {
            node.style.opacity = opacity.toFixed(3);
            node.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
            node.style.visibility = "visible";
          } else {
            node.style.opacity = "0";
            node.style.visibility = "hidden";
          }
        }

        // Active Act calculation
        if (progress >= scene.start && progress <= scene.end) {
          activeIdx = i;
        } else if (progress > scene.end && i === scenes.length - 1) {
          activeIdx = i;
        }
      }

      // 5d. Update Fixed Bottom Act Buttons
      if (activeIdx !== activeSceneIndexRef.current) {
        const prevBtn = actButtonsRef.current[activeSceneIndexRef.current];
        const nextBtn = actButtonsRef.current[activeIdx];

        if (prevBtn) {
          prevBtn.className =
            "px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap text-muted hover:text-ivory-100";
        }
        if (nextBtn) {
          nextBtn.className =
            "px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.45)]";
        }
        activeSceneIndexRef.current = activeIdx;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    // 6. Comprehensive React Strict Mode Cleanup
    return () => {
      isLoopActiveRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (v) {
        v.removeEventListener("seeked", onSeeked);
        v.removeEventListener("loadedmetadata", onMeta);
      }
      gsap.ticker.remove(tickerCallback);
      st.kill();
      lenis.destroy();
    };
  }, []);

  // Jump to Scene Handler (Desktop)
  const jumpToScene = (targetProgress: number) => {
    if (stRef.current && lenisRef.current) {
      const targetScroll =
        stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);
      lenisRef.current.scrollTo(targetScroll, { duration: 0.8 });
    }
  };

  // Continue to The Studio
  const handleExploreStudio = () => {
    if (lenisRef.current) {
      const studioEl = document.getElementById("studio");
      if (studioEl) {
        lenisRef.current.scrollTo(studioEl, { duration: 1.0 });
      }
    }
  };

  return (
    <div id="cinematic-hero-section">
      {/* 1. DEDICATED 3D LUXURY HERO SECTION FOR MOBILE DEVICES (< 768px) */}
      <div className="block md:hidden">
        <MobileHero3D />
      </div>

      {/* 2. PINNED GSAP SCROLL-CONTROLLED DETERMINISTIC VIDEO HERO (DESKTOP >= 768px) */}
      <div className="hidden md:block">
        <section
          ref={containerRef}
          className="relative z-10 w-full h-[100dvh] min-h-[100dvh] bg-obsidian-950 text-ivory-50 select-none overflow-hidden"
        >
          {/* Fullscreen Pure Cinematic Video */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-obsidian-950">
            <video
              ref={videoRef}
              src={HERO_CONFIG.videoSrc}
              muted
              playsInline
              preload="auto"
              webkit-playsinline="true"
              x5-playsinline="true"
              id="cinematic-hero-video"
              className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.06]"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />

            {/* Subtle Luxury Vignettes */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-obsidian-950/90 via-transparent to-obsidian-950/50 opacity-80" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-obsidian-950/35 via-transparent to-obsidian-950/35 opacity-50" />
          </div>

          {/* Centered Editorial Scene Overlays */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center p-6 md:p-12">
            <div className="relative w-full max-w-4xl min-h-[300px] sm:min-h-[340px] flex items-center justify-center text-center">
              {HERO_CONFIG.scenes.map((scene, i) => (
                <div
                  key={scene.id}
                  ref={(el) => {
                    sceneRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none will-change-transform"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    transform: "translate3d(0, 0, 0)",
                    visibility: i === 0 ? "visible" : "hidden",
                  }}
                >
                  <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto px-4">
                    {/* Chapter Label with flanking gold lines */}
                    <div className="inline-flex items-center justify-center gap-3">
                      <span className="w-6 sm:w-8 h-[1px] bg-champagne-500 inline-block" />
                      <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-semibold drop-shadow-md">
                        {scene.chapter}
                      </span>
                      <span className="w-6 sm:w-8 h-[1px] bg-champagne-500 inline-block" />
                    </div>

                    {/* Main Scene Title */}
                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[1.02] drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
                      {scene.italicWord ? (
                        scene.title.split(scene.italicWord).map((part, pIdx, arr) => (
                          <React.Fragment key={pIdx}>
                            <span>{part}</span>
                            {pIdx < arr.length - 1 && (
                              <span className="italic font-normal text-champagne-400 font-serif px-1">
                                {scene.italicWord}
                              </span>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <span>{scene.title}</span>
                      )}
                    </h1>

                    {/* Subtext */}
                    {scene.subtext && (
                      <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-champagne-300 font-medium max-w-xl mx-auto drop-shadow-md">
                        {scene.subtext}
                      </p>
                    )}

                    {/* Final Act Booking Actions */}
                    {scene.id === "finale" && (
                      <div className="pt-6 pointer-events-auto flex flex-wrap gap-4 justify-center items-center w-full max-w-md mx-auto">
                        <a
                          href="#book"
                          className="px-7 sm:px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-500 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all transform hover:scale-105 active:scale-95"
                        >
                          Reserve Your Session
                        </a>
                        <button
                          type="button"
                          onClick={handleExploreStudio}
                          className="px-7 sm:px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 border border-champagne-500/40 glass-panel hover:border-champagne-400 hover:text-white transition-all cursor-pointer"
                        >
                          Explore The Studio ↓
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constant Fixed Bottom Act Selector (Never jumps or shifts position) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center justify-center px-2">
            <div className="flex items-center gap-1.5 glass-panel px-3.5 py-1.5 rounded-full border border-champagne-500/25 backdrop-blur-md shadow-lg">
              {HERO_CONFIG.scenes.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    actButtonsRef.current[i] = el;
                  }}
                  type="button"
                  onClick={() => jumpToScene(s.start)}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap ${
                    i === 0
                      ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.45)]"
                      : "text-muted hover:text-ivory-100"
                  }`}
                >
                  ACT 0{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-900/60 z-20 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-champagne-400 origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
