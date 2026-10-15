"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

export interface CinematicBackgroundHandle {
  seekToProgress: (progress: number) => void;
  getVideoElement: () => HTMLVideoElement | null;
  getDuration: () => number;
}

export interface CinematicBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  children?: React.ReactNode;
  activeActIndex?: number;
}

export const CinematicBackground = forwardRef<
  CinematicBackgroundHandle,
  CinematicBackgroundProps
>(function CinematicBackground(
  { videoSrc, posterSrc, className = "", children, activeActIndex = 0 },
  ref
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Status flags
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Coalesced Hardware Video Seeking Engine (Strict Single-Flight Seek Lock)
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);
  const lastRequestedTimeRef = useRef<number>(-1);
  const videoDurationRef = useRef<number>(44.011);

  // Coalesced video seek function
  const requestSeek = (time: number) => {
    const video = videoRef.current;
    if (!video || video.readyState < 1) return;

    const clampedTime = Math.max(0, Math.min(videoDurationRef.current - 0.04, time));

    // Filter out micro-jitter (< 1/120th of a second) to preserve decoder cache
    if (Math.abs(clampedTime - lastRequestedTimeRef.current) < 0.008) return;
    lastRequestedTimeRef.current = clampedTime;

    // Coalesce if hardware is already decoding
    if (isSeekingRef.current) {
      pendingTimeRef.current = clampedTime;
      return;
    }

    isSeekingRef.current = true;
    pendingTimeRef.current = null;

    try {
      if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
        (video as any).fastSeek(clampedTime);
      } else {
        video.currentTime = clampedTime;
      }
    } catch {
      video.currentTime = clampedTime;
    }
  };

  // Expose imperative API for 60/120fps animation loop with zero React re-renders
  useImperativeHandle(ref, () => ({
    seekToProgress: (progress: number) => {
      const dur = videoDurationRef.current || 44.011;
      const targetTime = Math.max(0, Math.min(dur - 0.04, progress * dur));
      requestSeek(targetTime);

      // Subtle hardware-accelerated pseudo-3D parallax zoom
      if (videoRef.current) {
        const subtleScale = 1 + progress * 0.04;
        const subtleTranslateY = -progress * 24;
        videoRef.current.style.transform = `scale(${subtleScale.toFixed(4)}) translate3d(0, ${subtleTranslateY.toFixed(1)}px, 0)`;
      }
    },
    getVideoElement: () => videoRef.current,
    getDuration: () => videoDurationRef.current,
  }));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict video configuration: always paused, hardware muted, inline
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.pause();

    const onSeeked = () => {
      isSeekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        requestSeek(nextTime);
      }
    };

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        videoDurationRef.current = video.duration;
      }
      setIsVideoReady(true);
      // Pre-seek to first frame to eliminate black decoder flashes
      requestSeek(0.001);
    };

    const onError = () => {
      console.warn("CinematicBackground video failed to load, falling back to ambient luxury canvas.");
      setHasError(true);
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("error", onError);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("error", onError);
      video.pause();
      video.src = "";
      video.load();
    };
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-[100dvh] overflow-hidden select-none pointer-events-none -z-10 bg-obsidian-950 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Main Synchronized Video */}
      {!hasError && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          className="w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.06] will-change-transform transition-opacity duration-700"
          style={{
            opacity: isVideoReady ? 1 : 0.4,
            transform: "scale(1) translate3d(0, 0, 0)",
          }}
        />
      )}

      {/* 2. Fallback Ambient Luxury Background (if video fails or is loading) */}
      {(!isVideoReady || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian-950 via-[#0d0d12] to-obsidian-950 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-champagne-500/10 blur-[130px] animate-pulse" />
        </div>
      )}

      {/* 3. Adaptive Readability Overlays: Directed Gradients */}
      {/* Top Header Protection Gradient */}
      <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-obsidian-950/95 via-obsidian-950/50 to-transparent pointer-events-none" />

      {/* Bottom Content & Scene Bridge Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-transparent pointer-events-none" />

      {/* Asymmetric Side Readability Gradient (Darkens text area while leaving salon subject visible) */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-obsidian-950/40 to-transparent pointer-events-none" />

      {/* Soft Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,5,5,0.75)_100%)] pointer-events-none" />

      {/* Subtle Cinematic Film Grain Texture */}
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

      {/* Dynamic Children (e.g. Scene Overlays or additional depth elements) */}
      {children}
    </div>
  );
});
