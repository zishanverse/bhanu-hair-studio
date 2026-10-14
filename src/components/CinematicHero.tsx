"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONFIG } from "@/config/scenes";
import { MobileHero3D } from "@/components/MobileHero3D";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // UI state for scene captions and progress
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Internal high-performance tracking refs
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0);
  const activeSceneRef = useRef<number>(0);

  // 1. Strict Mute & Video Metadata Initialization (Desktop only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.pause();

    const onMeta = () => {
      // video is ready
    };

    if (video.readyState >= 1) {
      onMeta();
    }

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("canplay", onMeta);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplay", onMeta);
    };
  }, []);

  // 2. Hardware-Accelerated Smooth Non-Blocking Video Scrub Loop (Desktop only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const v = videoRef.current;
    if (!v) return;

    isLoopActiveRef.current = true;
    let isSeeking = false;
    let pendingSeekTime: number | null = null;
    let lerpedTime = 0;
    let seekWatchdog: ReturnType<typeof setTimeout> | null = null;

    // Strict non-blocking seek dispatcher:
    // Never calls fastSeek (which snaps to sparse keyframes and stutters);
    // Directly seeks to exact frame without stalling decoder queues.
    const dispatchSeek = (targetTime: number) => {
      if (!v || isNaN(targetTime)) return;
      const dur = v.duration || 44.011;
      const clamped = Math.max(0, Math.min(dur - 0.04, targetTime));
      const diff = Math.abs(clamped - v.currentTime);

      // Skip negligible micro deltas below 1 frame (~16ms)
      if (diff < 0.016) return;

      if (isSeeking || v.seeking) {
        pendingSeekTime = clamped;
        return;
      }

      isSeeking = true;
      if (seekWatchdog) clearTimeout(seekWatchdog);

      try {
        v.currentTime = clamped;
      } catch {
        isSeeking = false;
      }

      // Safety watchdog: ensure decoder lock is cleared even if browser drops event
      seekWatchdog = setTimeout(() => {
        isSeeking = false;
        if (pendingSeekTime !== null) {
          const next = pendingSeekTime;
          pendingSeekTime = null;
          dispatchSeek(next);
        }
      }, 45);
    };

    const onSeeked = () => {
      isSeeking = false;
      if (seekWatchdog) clearTimeout(seekWatchdog);
      if (pendingSeekTime !== null) {
        const next = pendingSeekTime;
        pendingSeekTime = null;
        dispatchSeek(next);
      }
    };

    v.addEventListener("seeked", onSeeked);

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      if (v && v.readyState >= 1 && v.duration) {
        const rawTarget = targetTimeRef.current;

        // Smooth exponential lerp towards targetTime for silky interpolation even during fast wheel turns
        lerpedTime += (rawTarget - lerpedTime) * 0.35;
        dispatchSeek(lerpedTime);

        const current = v.currentTime;
        const dur = v.duration;
        const progress = Math.max(0, Math.min(1, current / dur));

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }

        if (Math.abs(progress - lastProgressRef.current) > 0.002) {
          lastProgressRef.current = progress;
          setCurrentProgress(progress);
        }

        const scenes = HERO_CONFIG.scenes;
        let found = 0;
        for (let i = 0; i < scenes.length; i++) {
          if (progress >= scenes[i].start && progress <= scenes[i].end) {
            found = i;
            break;
          } else if (progress > scenes[i].end) {
            found = i;
          }
        }
        if (found !== activeSceneRef.current) {
          activeSceneRef.current = found;
          setActiveSceneIndex(found);
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isLoopActiveRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (seekWatchdog) clearTimeout(seekWatchdog);
      v.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // 3. Fast & Responsive GSAP ScrollTrigger Scrubbing + Lenis Engine (Desktop only)
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (window.innerWidth < 768) return; // Skip pinning for mobile

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fast, crisp Lenis smooth wheel configuration
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.14,
      smoothWheel: true,
      wheelMultiplier: 1.25, // Snappy response to wheel turns
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Optimized scroll length: 3800px instead of 8000px so scrolling is 2x+ faster & natural
    const scrollLength = 3800;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.18, // Fast, direct tracking with minimal sluggish lag
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const video = videoRef.current;
        const dur = video?.duration || 44.011;
        targetTimeRef.current = self.progress * dur;

        if (self.progress >= 1.0) {
          if (video && !video.paused) {
            video.pause();
          }
        }
      },
      onRefresh: (self) => {
        const video = videoRef.current;
        const dur = video?.duration || 44.011;
        targetTimeRef.current = self.progress * dur;
      },
    });
    stRef.current = st;

    return () => {
      st.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Jump to Scene Handler (Desktop)
  const jumpToScene = (targetProgress: number) => {
    if (stRef.current && lenisRef.current) {
      const targetScroll = stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);
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
      {/* ============================================================== */}
      {/* 1. DEDICATED 3D LUXURY HERO SECTION FOR MOBILE DEVICES (< 768px) */}
      {/* ============================================================== */}
      <div className="block md:hidden">
        <MobileHero3D />
      </div>

      {/* ============================================================== */}
      {/* 2. PINNED GSAP SCROLL-CONTROLLED VIDEO HERO (DESKTOP >= 768px)  */}
      {/* ============================================================== */}
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
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04]"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />

            {/* Subtle Vignettes */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-obsidian-950/85 via-transparent to-obsidian-950/40 opacity-70" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-obsidian-950/30 via-transparent to-obsidian-950/30 opacity-40" />
          </div>

          {/* Floating Editorial Overlays */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12 lg:p-16">
            <div className="pt-20 md:pt-24" />

            <div className="relative w-full max-w-5xl mx-auto my-auto py-12 pointer-events-none">
              {HERO_CONFIG.scenes.map((scene) => {
                const { start, peak, end } = scene;
                let opacity = 0;
                let translateY = 20;

                if (currentProgress >= start && currentProgress <= end) {
                  if (currentProgress < peak) {
                    const t = (currentProgress - start) / Math.max(0.001, peak - start);
                    opacity = Math.sin((t * Math.PI) / 2);
                    translateY = (1 - t) * 20;
                  } else {
                    const t = (currentProgress - peak) / Math.max(0.001, end - peak);
                    opacity = Math.cos((t * Math.PI) / 2);
                    translateY = -t * 20;
                  }
                }

                const isVisible = opacity > 0.03;
                const isLeft = scene.position.desktop.align === "left";
                const isRight = scene.position.desktop.align === "right";

                return (
                  <div
                    key={scene.id}
                    className={`transition-opacity duration-300 ${
                      isVisible ? "block" : "hidden"
                    } ${isLeft ? "text-left" : isRight ? "text-right ml-auto" : "text-center mx-auto"}`}
                    style={{
                      opacity: isVisible ? opacity : 0,
                      transform: `translateY(${translateY}px)`,
                    }}
                  >
                    <div className="space-y-4 max-w-3xl inline-block px-2">
                      <div className="inline-flex items-center gap-3">
                        <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
                        <span className="text-xs uppercase tracking-ultra text-champagne-400 font-semibold drop-shadow-md">
                          {scene.chapter}
                        </span>
                        <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
                      </div>

                      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[1.02] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                        {scene.italicWord ? (
                          scene.title.split(scene.italicWord).map((part, i, arr) => (
                            <React.Fragment key={i}>
                              <span>{part}</span>
                              {i < arr.length - 1 && (
                                <span className="italic font-normal text-champagne-300 font-serif px-1">
                                  {scene.italicWord}
                                </span>
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <span>{scene.title}</span>
                        )}
                      </h1>

                      {scene.subtext && (
                        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-ivory-100 font-light max-w-xl drop-shadow-md">
                          {scene.subtext}
                        </p>
                      )}

                      {scene.id === "finale" && (
                        <div className="pt-6 pointer-events-auto flex gap-4 justify-center items-center w-full max-w-md mx-auto">
                          <a
                            href="#book"
                            className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_35px_rgba(197,164,119,0.7)] transition-all transform hover:scale-105 active:scale-95"
                          >
                            Reserve Your Session
                          </a>
                          <button
                            type="button"
                            onClick={handleExploreStudio}
                            className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-light text-champagne-200 border border-champagne-500/40 glass-panel hover:border-champagne-400 hover:text-white transition-all cursor-pointer"
                          >
                            Explore The Studio ↓
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Minimal Bottom Act Selector */}
            <div className="flex items-center justify-center pointer-events-auto pb-6 px-2">
              <div className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-champagne-500/20 backdrop-blur-md">
                {HERO_CONFIG.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpToScene(s.start)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap ${
                      activeSceneIndex === i
                        ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(197,164,119,0.4)]"
                        : "text-muted hover:text-ivory-100"
                    }`}
                  >
                    ACT 0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-900/40 z-20 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-champagne-400/80 transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
