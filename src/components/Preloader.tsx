"use client";

import React, { useState, useEffect, useRef } from "react";
import { Scissors } from "lucide-react";
import { stageState } from "@/lib/stageState";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only show on first visit in the current session
    const hasVisited = sessionStorage.getItem("bhanu_visited");
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasVisited && !isReduced) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!lineRef.current || !textRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("bhanu_visited", "true");
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => setVisible(false),
          });
        }
      },
    });

    // 1. Draw gold hairline
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "power2.out" }
    )
      // 2. Reveal wordmark
      .fromTo(
        textRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "luxe" },
        0.3
      )
      // 3. Shears snap audio-visual trigger
      .call(() => {
        stageState.snip();
      }, undefined, 0.9)
      .to({}, { duration: 0.5 }); // Hold briefly

    // Fail-safe max timeout 2.4s
    const timeout = setTimeout(() => {
      sessionStorage.setItem("bhanu_visited", "true");
      setVisible(false);
    }, 2400);

    return () => {
      clearTimeout(timeout);
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-obsidian-950 flex flex-col items-center justify-center p-6 select-none"
      aria-label="Atelier Preloader"
    >
      <div className="space-y-6 text-center max-w-sm w-full">
        <div className="w-12 h-12 mx-auto rounded-full border border-champagne-500/40 flex items-center justify-center bg-surface shadow-[0_0_25px_rgba(200,162,82,0.3)]">
          <Scissors className="w-5 h-5 text-champagne-400 transform -rotate-45" />
        </div>

        <div ref={textRef} className="space-y-1">
          <span className="font-display text-3xl tracking-[0.2em] uppercase text-ivory-50 block font-normal">
            BHANU&apos;S
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-champagne-400 font-mono block">
            THE HAIR STUDIO · INDORE
          </span>
        </div>

        {/* Gold hairline progress indicator */}
        <div className="w-48 h-[1px] bg-champagne-500/20 mx-auto overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full bg-champagne-400 origin-left"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          sessionStorage.setItem("bhanu_visited", "true");
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => setVisible(false),
            });
          }
        }}
        className="absolute bottom-8 text-[10px] uppercase tracking-widest text-muted hover:text-champagne-300 transition-colors font-mono cursor-pointer"
      >
        Skip Intro →
      </button>
    </div>
  );
}

export default Preloader;
