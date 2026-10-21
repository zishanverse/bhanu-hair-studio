"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import { stageState } from "@/lib/stageState";
import { Check, Scissors, Sparkles, ArrowDown } from "lucide-react";

export function SignatureExperience() {
  const { signatureExperience, contact } = SALON_CONFIG;
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [snipCount, setSnipCount] = useState(0);
  const [snipFlashed, setSnipFlashed] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const activeChapter = signatureExperience.chapters[activeChapterIndex];

  const handleTriggerSnip = useCallback(() => {
    stageState.snip();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
    setSnipCount((prev) => prev + 1);
    setSnipFlashed(true);
    setTimeout(() => setSnipFlashed(false), 350);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);

    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Scroll-Driven Pinned Chapter Timeline
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !pinWrapperRef.current) return;
    if (isReducedMotion) {
      stageState.explode = 0;
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px): True Pinned Scroll Progression
    mm.add("(min-width: 768px)", () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinWrapperRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          // Map scroll scrub directly to stageState 3D explode and rotation
          stageState.explode = Math.min(1, Math.max(0, p * 1.15));
          stageState.shears.ry = 0.2 + p * 1.8;
          stageState.shears.rx = 0.15 + Math.sin(p * Math.PI) * 0.12;

          // Chapter resolution
          if (p < 0.35) {
            setActiveChapterIndex(0);
          } else if (p < 0.7) {
            setActiveChapterIndex(1);
          } else {
            setActiveChapterIndex(2);
          }
        },
      });

      scrollTriggerRef.current = pinTrigger;
    });

    // Mobile (< 768px): Lighter scrub without sticky pin lock
    mm.add("(max-width: 767px)", () => {
      const mobileTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1.0,
        onUpdate: (self) => {
          const p = self.progress;
          stageState.explode = p * 0.8;
          if (p < 0.35) setActiveChapterIndex(0);
          else if (p < 0.7) setActiveChapterIndex(1);
          else setActiveChapterIndex(2);
        },
      });

      scrollTriggerRef.current = mobileTrigger;
    });

    return () => mm.revert();
  }, [isReducedMotion]);

  // Secondary Tab Click Navigation: Smoothly scrolls to target chapter in pinned timeline
  const handleTabClick = (idx: number) => {
    setActiveChapterIndex(idx);
    handleTriggerSnip();

    if (scrollTriggerRef.current && !isReducedMotion) {
      const st = scrollTriggerRef.current;
      const targetP = idx === 0 ? 0.05 : idx === 1 ? 0.5 : 0.88;
      const targetScroll = st.start + (st.end - st.start) * targetP;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-stage="experience"
      aria-label="The Signature 3D Experience"
      className="relative z-10 w-full bg-obsidian-950/50 text-ivory-200 border-t border-champagne-500/15"
    >
      {/* Pinned Stage Container */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-[100dvh] flex flex-col justify-center py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden relative"
      >
        {/* Ambient Gold Radial Flare */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-champagne-500/5 blur-[140px] pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-12 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-champagne-500/15">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-sans font-medium">
                  {signatureExperience.sectionNum} / {signatureExperience.sectionLabel}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-50 tracking-tight leading-[1.0]">
                {signatureExperience.headingLine1} <br />
                <span className="italic font-normal text-champagne-300 font-serif">
                  {signatureExperience.headingLine2}
                </span>
              </h2>
            </div>

            {/* Chapter Indicator Tabs (Secondary Nav) */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-surface/80 border border-champagne-500/20 max-w-full overflow-x-auto no-scrollbar">
              {signatureExperience.chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleTabClick(idx)}
                    className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap cursor-pointer min-h-[44px] ${
                      isActive
                        ? "text-obsidian-950 bg-champagne-400 font-bold shadow-[0_0_20px_rgba(200,162,82,0.4)]"
                        : "text-muted hover:text-ivory-100"
                    }`}
                  >
                    <span>{ch.num} · {ch.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Chapter & 3D Shears Exploded Anatomy Portal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Chapter Editorial Narrative */}
            <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#ECE4D6] border border-[#C8A252]/40 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 shadow-[0_24px_60px_rgba(0,0,0,0.7)] text-[#161410]">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-[#7A5B20] font-bold">
                    CHAPTER {activeChapter.num} / 03
                  </span>
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-[#C8A252]/40 text-[#7A5B20] font-sans font-semibold bg-white/70 shadow-sm">
                    SCROLL DRIVEN 3D PIN
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#110F0C] leading-tight font-medium">
                  {activeChapter.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#7A5B20] font-medium tracking-wide">
                  {activeChapter.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#3E3A32] font-normal leading-relaxed">
                  {activeChapter.description}
                </p>

                {/* Ritual Discipline Key Points */}
                <div className="pt-4 space-y-2.5 border-t border-[#C8A252]/25">
                  {activeChapter.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-[#2E2A24] font-normal">
                      <div className="w-4 h-4 rounded-full border border-[#C8A252]/50 bg-white/80 flex items-center justify-center shrink-0 mt-0.5 text-[#7A5B20]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Scroll Prompt & Reserve CTA */}
              <div className="pt-5 border-t border-[#C8A252]/25 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-[#5C5547] font-sans font-medium">
                  <span>Scroll to advance chapters</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#7A5B20] animate-bounce" />
                </div>

                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Bhanu's The Hair Studio, I would like to reserve the Signature ${activeChapter.title} Experience.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#181613] hover:bg-[#7A5B20] transition-all min-h-[44px] shadow-md active:scale-95"
                >
                  <span>Reserve</span>
                  <Scissors className="w-3.5 h-3.5 text-champagne-300" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Exploded Shears Inspection Window with Active Annotations */}
            <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#ECE4D6] border border-[#C8A252]/40 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[440px] shadow-[0_24px_60px_rgba(0,0,0,0.7)] text-[#161410]">
              {/* Subtle Ambient Pearl/Gold Glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#C8A252]/15 blur-3xl pointer-events-none rounded-full"
                aria-hidden="true"
              />

              {/* Header: Metallurgy Info + Interactive Snip Button */}
              <div className="flex items-center justify-between z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] tracking-widest uppercase text-[#7A5B20] font-bold block">
                    MASTER METALLURGY
                  </span>
                  <span className="text-[10px] text-[#5C5547] tracking-wider uppercase font-sans font-medium">
                    Hitachi 440C · Honed Convex Hamaguri Edge
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleTriggerSnip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold text-white bg-[#181613] hover:bg-[#7A5B20] active:scale-95 transition-all shadow-md min-h-[44px] cursor-pointer"
                  aria-label="Snip 3D Japanese Shears"
                >
                  <Scissors className="w-3.5 h-3.5 text-champagne-300" />
                  <span>Snip Shears</span>
                  {snipCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#7A5B20] text-white text-[9px] font-mono">
                      {snipCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Exploded View Anatomy Annotation Overlays (Fading dynamically with active chapter) */}
              <div
                onClick={handleTriggerSnip}
                className="relative my-auto w-full h-[260px] flex items-center justify-center cursor-pointer pointer-events-auto"
                title="Click to actuate Japanese steel shears"
              >
                {/* Chapter 0 Annotation: Hamaguri Blade */}
                <div
                  className={`absolute top-6 left-4 transition-all duration-500 flex items-center gap-2 bg-white/95 border border-[#C8A252]/60 px-3.5 py-1.5 rounded-full text-[10px] font-sans text-[#181613] font-semibold backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.12)] ${
                    activeChapterIndex === 0 ? "opacity-100 scale-100 ring-2 ring-[#C8A252]/40" : "opacity-35 scale-95"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A5B20] animate-ping" />
                  <span>01. Convex Hamaguri Blade</span>
                </div>

                {/* Chapter 1 Annotation: Pivot Bearing */}
                <div
                  className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all duration-500 flex items-center gap-2 bg-white/95 border border-[#C8A252]/60 px-3.5 py-1.5 rounded-full text-[10px] font-sans text-[#181613] font-semibold backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.12)] ${
                    activeChapterIndex === 1 ? "opacity-100 scale-100 ring-2 ring-[#C8A252]/50" : "opacity-35 scale-95"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>02. Micro-Ball Bearing Pivot ({Math.round(stageState.explode * 100)}% Explode)</span>
                </div>

                {/* Chapter 2 Annotation: Crane Offset Handle */}
                <div
                  className={`absolute bottom-6 left-6 transition-all duration-500 flex items-center gap-2 bg-white/95 border border-[#C8A252]/60 px-3.5 py-1.5 rounded-full text-[10px] font-sans text-[#181613] font-semibold backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.12)] ${
                    activeChapterIndex === 2 ? "opacity-100 scale-100 ring-2 ring-[#C8A252]/40" : "opacity-35 scale-95"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A5B20]" />
                  <span>03. Anatomical Crane Offset Shank</span>
                </div>
              </div>

              {/* Bottom Anatomy Metadata Strip */}
              <div className="pt-4 border-t border-[#C8A252]/25 flex flex-wrap items-center justify-between text-[11px] text-[#5C5547] gap-2 z-10 font-medium">
                <span className="font-sans text-[#7A5B20]">
                  Precision calibrated to 0.01mm tolerance
                </span>
                <span className="font-mono text-[#110F0C] font-semibold">
                  Exploded State: {Math.round(stageState.explode * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignatureExperience;
