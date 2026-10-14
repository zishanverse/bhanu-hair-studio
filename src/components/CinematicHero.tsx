"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONFIG } from "@/config/scenes";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Throttled UI state to protect decoder performance
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

  // 1. Strict Mute & Video Metadata Initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.pause();

    const onMeta = () => {
      // Warm up ready state
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

  // 2. Hardware-Accelerated Non-Blocking Video Scrub Loop
  // Fixes video freezing/stuttering by never interrupting in-flight hardware decodes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    isLoopActiveRef.current = true;
    let isSeeking = false;
    let pendingSeekTime: number | null = null;
    let seekTimeout: ReturnType<typeof setTimeout> | null = null;

    const performSeek = (time: number) => {
      if (!v || isNaN(time)) return;
      const dur = v.duration || 44.011;
      const clamped = Math.max(0, Math.min(dur, time));

      // If hardware decoder is busy seeking, queue the newest target
      if (v.seeking || isSeeking) {
        pendingSeekTime = clamped;
        return;
      }

      isSeeking = true;
      try {
        v.currentTime = clamped;
      } catch (e) {
        isSeeking = false;
      }

      // Safety watchdog: if seeked event doesn't fire within 100ms, unlock seeking
      if (seekTimeout) clearTimeout(seekTimeout);
      seekTimeout = setTimeout(() => {
        isSeeking = false;
        if (pendingSeekTime !== null) {
          const next = pendingSeekTime;
          pendingSeekTime = null;
          performSeek(next);
        }
      }, 100);
    };

    const onSeeked = () => {
      isSeeking = false;
      if (seekTimeout) clearTimeout(seekTimeout);
      if (pendingSeekTime !== null) {
        const next = pendingSeekTime;
        pendingSeekTime = null;
        performSeek(next);
      }
    };

    v.addEventListener("seeked", onSeeked);

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      if (v && v.readyState >= 1 && v.duration) {
        const targetTime = targetTimeRef.current;
        const currentTime = v.currentTime;
        const diff = targetTime - currentTime;

        // Bidirectional lerp (forward & reverse)
        if (Math.abs(diff) > 0.02) {
          const step = Math.max(Math.min(0.45 * diff, 1.0), -1.0);
          performSeek(currentTime + step);
        }

        const progress = Math.max(0, Math.min(1, v.currentTime / v.duration));

        // 60fps direct DOM progress bar (Zero React re-render overhead)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }

        // Throttle React state update for editorial text opacity (renders at ~30fps when scrolling)
        if (Math.abs(progress - lastProgressRef.current) > 0.003) {
          lastProgressRef.current = progress;
          setCurrentProgress(progress);
        }

        // Active scene check
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
      if (seekTimeout) clearTimeout(seekTimeout);
      v.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // 3. GSAP ScrollTrigger Pinned Scrubbing + Lenis Engine
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize Lenis Smooth Scrolling Engine
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Responsive scroll length for natural scrubbing feel
    const isMobile = window.innerWidth < 768;
    const scrollLength = isMobile ? 6500 : 9000;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const video = videoRef.current;
        const dur = video?.duration || 44.011;
        targetTimeRef.current = self.progress * dur;

        // When scrolled past hero, pause video
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

  // Jump to Scene Handler
  const jumpToScene = (targetProgress: number) => {
    if (stRef.current && lenisRef.current) {
      const targetScroll = stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);
      lenisRef.current.scrollTo(targetScroll, { duration: 1.0 });
    }
  };

  // Continue to The Studio
  const handleExploreStudio = () => {
    if (lenisRef.current) {
      const studioEl = document.getElementById("studio");
      if (studioEl) {
        lenisRef.current.scrollTo(studioEl, { duration: 1.2 });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="cinematic-hero-section"
      className="relative z-10 w-full h-[100dvh] min-h-[100dvh] bg-obsidian-950 text-ivory-50 select-none overflow-hidden"
    >
      {/* FULLSCREEN PURE CINEMATIC VIDEO */}
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

        {/* Minimal Subtle Edge Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-obsidian-950/85 via-transparent to-obsidian-950/40 opacity-70" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-obsidian-950/30 via-transparent to-obsidian-950/30 opacity-40" />
      </div>

      {/* EDITORIAL FLOATING TYPOGRAPHY OVERLAY */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Top spacer to accommodate fixed Navbar */}
        <div className="pt-16 sm:pt-20 md:pt-24" />

        {/* Center Dynamic Typography Overlays */}
        <div className="relative w-full max-w-5xl mx-auto my-auto py-8 sm:py-12 pointer-events-none">
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
                <div className="space-y-3 sm:space-y-4 max-w-3xl inline-block px-2">
                  {/* Chapter Eyebrow */}
                  <div className="inline-flex items-center gap-2 sm:gap-3">
                    <span className="w-4 sm:w-6 h-[1px] bg-champagne-400 inline-block" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-ultra text-champagne-400 font-semibold drop-shadow-md">
                      {scene.chapter}
                    </span>
                    <span className="w-4 sm:w-6 h-[1px] bg-champagne-400 inline-block" />
                  </div>

                  {/* Main Editorial Headline */}
                  <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[1.06] sm:leading-[1.02] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
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

                  {/* Tagline */}
                  {scene.subtext && (
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.25em] uppercase text-ivory-100 font-light max-w-xl drop-shadow-md">
                      {scene.subtext}
                    </p>
                  )}

                  {/* Scene 4 Finale CTA */}
                  {scene.id === "finale" && (
                    <div className="pt-4 sm:pt-6 pointer-events-auto flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto">
                      <a
                        href="#book"
                        className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_35px_rgba(197,164,119,0.7)] transition-all transform hover:scale-105 active:scale-95"
                      >
                        Reserve Your Session
                      </a>
                      <button
                        type="button"
                        onClick={handleExploreStudio}
                        className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-light text-champagne-200 border border-champagne-500/40 glass-panel hover:border-champagne-400 hover:text-white transition-all cursor-pointer"
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

        {/* Minimal Bottom Chapter Navigation Selector */}
        <div className="flex items-center justify-center pointer-events-auto pb-4 sm:pb-6 px-2">
          <div className="flex items-center gap-1 sm:gap-1.5 glass-panel px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-champagne-500/20 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar">
            {HERO_CONFIG.scenes.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpToScene(s.start)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap ${
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

      {/* Subtle Progress Bar at the very bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-900/40 z-20 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-champagne-400/80 transition-all duration-75"
          style={{ width: "0%" }}
        />
      </div>
    </section>
  );
}
