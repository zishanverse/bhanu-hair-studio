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
  const targetProgressRef = useRef<number>(0);
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0);
  const activeSceneRef = useRef<number>(0);

  // Momentum playback control refs
  const currentPlaybackRateRef = useRef<number>(0);
  const targetPlaybackRateRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Strict Mute & Video Metadata Initialization (Desktop only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.pause();

    const onMeta = () => {
      // Warm ready
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

  // 2. Momentum-Driven Smooth Video Playback Engine (Hardware-Accelerated with Flywheel Deceleration)
  // When scrolling, video plays forward with speed proportional to scroll velocity.
  // When scroll stops, instead of freezing or keyframe-seeking, it gradually slows down
  // its playback rate to 0 like an organic flywheel, coming to a gentle cinematic rest.
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const v = videoRef.current;
    if (!v) return;

    isLoopActiveRef.current = true;

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      if (v && v.readyState >= 1 && v.duration) {
        const dur = v.duration || 44.011;
        const targetProgress = targetProgressRef.current;
        const targetTime = Math.max(0, Math.min(dur - 0.05, targetProgress * dur));
        const currentTime = v.currentTime;
        const timeDelta = targetTime - currentTime;

        let currentRate = currentPlaybackRateRef.current;
        const targetRate = targetPlaybackRateRef.current;

        // If user is actively scrolling forward, ease current rate toward target rate
        if (isScrollingRef.current && targetRate > 0) {
          currentRate += (targetRate - currentRate) * 0.18;
        } else {
          // When scroll stops, apply organic flywheel friction deceleration:
          // smoothly reduce speed frame-by-frame instead of abruptly stopping
          currentRate *= 0.92;
        }

        // Soft drift trimming: gently bias playback rate to keep video aligned with scroll progress
        // This avoids ANY hard currentTime seeking during playback which causes browser decoder stalls!
        if (currentRate > 0.06 && Math.abs(timeDelta) > 0.12) {
          const driftBias = Math.max(-0.4, Math.min(0.6, timeDelta * 0.45));
          currentRate = Math.max(0.1, currentRate + driftBias);
        }

        // Hard boundary protection (prevent video leaking past hero start or end)
        if (targetProgress >= 0.99) {
          currentRate = 0;
          if (!v.paused) v.pause();
          if (Math.abs(v.currentTime - (dur - 0.05)) > 0.2 && !v.seeking) {
            try {
              v.currentTime = dur - 0.05;
            } catch {}
          }
        } else if (targetProgress <= 0.005) {
          currentRate = 0;
          if (!v.paused) v.pause();
          if (v.currentTime > 0.1 && !v.seeking) {
            try {
              v.currentTime = 0;
            } catch {}
          }
        }

        currentPlaybackRateRef.current = currentRate;

        if (currentRate > 0.08) {
          // Video is gliding forward with momentum
          try {
            v.playbackRate = Math.min(2.8, Math.max(0.2, currentRate));
            if (v.paused) {
              v.play().catch(() => {});
            }
          } catch {}
        } else {
          // Momentum has finished decaying: smoothly rest and pause without sudden freezes
          if (!v.paused) {
            v.pause();
          }
          currentPlaybackRateRef.current = 0;
        }

        // Reverse scroll handling (when user scrolls backward smoothly)
        if (targetRate < -0.1 && !isScrollingRef.current) {
          if (!v.paused) v.pause();
          const step = Math.min(0.08, Math.abs(targetRate) * 0.025);
          if (!v.seeking && v.currentTime > 0.05) {
            try {
              v.currentTime = Math.max(0, v.currentTime - step);
            } catch {}
          }
        }

        // Progress indicators & Scene overlay synchronization
        const progress = Math.max(0, Math.min(1, currentTime / dur));

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
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, []);

  // 3. Fast & Responsive GSAP ScrollTrigger Scrubbing + Lenis Engine (Desktop only)
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (window.innerWidth < 768) return; // Skip pinning for mobile

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fast, responsive Lenis smooth wheel
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const scrollLength = 3200;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;

        // Read scroll velocity from ScrollTrigger (pixels/second)
        const velocity = self.getVelocity();

        if (velocity > 20) {
          // Scrolling forward: compute fluid forward rate
          isScrollingRef.current = true;
          targetPlaybackRateRef.current = Math.min(2.6, Math.max(0.6, velocity * 0.0013));
        } else if (velocity < -20) {
          // Scrolling backward: set backward rate indicator
          isScrollingRef.current = false;
          targetPlaybackRateRef.current = Math.max(-2.2, velocity * 0.0013);
        } else {
          // Velocity near zero: trigger smooth deceleration
          isScrollingRef.current = false;
          targetPlaybackRateRef.current = 0;
        }

        // Debounced scroll stop detector: allows continuous wheel ticks without stuttering
        if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
        scrollStopTimerRef.current = setTimeout(() => {
          isScrollingRef.current = false;
          targetPlaybackRateRef.current = 0; // Triggers organic flywheel spin-down
        }, 140);
      },
      onRefresh: (self) => {
        targetProgressRef.current = self.progress;
      },
    });
    stRef.current = st;

    return () => {
      st.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, []);

  // Jump to Scene Handler (Desktop)
  const jumpToScene = (targetProgress: number) => {
    if (stRef.current && lenisRef.current) {
      const targetScroll = stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);
      lenisRef.current.scrollTo(targetScroll, { duration: 0.7 });
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

      {/* 2. PINNED GSAP SCROLL-CONTROLLED MOMENTUM VIDEO HERO (DESKTOP >= 768px) */}
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

          {/* Floating Editorial Overlays - Clean, Bold, Minimal like Reference Image */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12 lg:p-16">
            <div className="pt-20 md:pt-24" />

            <div className="relative w-full max-w-5xl mx-auto my-auto py-10 pointer-events-none">
              {HERO_CONFIG.scenes.map((scene) => {
                const { start, peak, end } = scene;
                let opacity = 0;
                let translateY = 18;

                if (currentProgress >= start && currentProgress <= end) {
                  if (currentProgress < peak) {
                    const t = (currentProgress - start) / Math.max(0.001, peak - start);
                    opacity = Math.sin((t * Math.PI) / 2);
                    translateY = (1 - t) * 18;
                  } else {
                    const t = (currentProgress - peak) / Math.max(0.001, end - peak);
                    opacity = Math.cos((t * Math.PI) / 2);
                    translateY = -t * 18;
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
                        <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                        <span className="text-xs uppercase tracking-ultra text-champagne-400 font-semibold drop-shadow-md">
                          {scene.chapter}
                        </span>
                        <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                      </div>

                      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[1.0] drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
                        {scene.italicWord ? (
                          scene.title.split(scene.italicWord).map((part, i, arr) => (
                            <React.Fragment key={i}>
                              <span>{part}</span>
                              {i < arr.length - 1 && (
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

                      {scene.subtext && (
                        <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-champagne-300 font-medium max-w-xl drop-shadow-md">
                          {scene.subtext}
                        </p>
                      )}

                      {scene.id === "finale" && (
                        <div className="pt-6 pointer-events-auto flex gap-4 justify-center items-center w-full max-w-md mx-auto">
                          <a
                            href="#book"
                            className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-500 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all transform hover:scale-105 active:scale-95"
                          >
                            Reserve Your Session
                          </a>
                          <button
                            type="button"
                            onClick={handleExploreStudio}
                            className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 border border-champagne-500/40 glass-panel hover:border-champagne-400 hover:text-white transition-all cursor-pointer"
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
              <div className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-champagne-500/25 backdrop-blur-md">
                {HERO_CONFIG.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpToScene(s.start)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap ${
                      activeSceneIndex === i
                        ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.45)]"
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
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-900/60 z-20 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-champagne-400 transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
