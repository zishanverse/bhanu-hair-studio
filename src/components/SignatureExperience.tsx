"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import { stageState } from "@/lib/stageState";
import { Check, ChevronRight, Scissors, Sparkles } from "lucide-react";

export function SignatureExperience() {
  const { signatureExperience } = SALON_CONFIG;
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [snipCount, setSnipCount] = useState(0);
  const [snipFlashed, setSnipFlashed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const activeChapter = signatureExperience.chapters[activeChapterIndex];

  const handleTriggerSnip = () => {
    stageState.snip();
    setSnipCount((prev) => prev + 1);
    setSnipFlashed(true);
    setTimeout(() => setSnipFlashed(false), 450);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Staggered reveal for chapter container
      gsap.fromTo(
        ".chapter-reveal-item",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Scanning Laser Beam Animation across Biometric Anatomy Grid
      if (laserBeamRef.current && cardsGridRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          laserBeamRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          { scaleX: 1, opacity: 1, duration: 1, ease: "power2.inOut" }
        );

        const zoneCards = cardsGridRef.current.querySelectorAll(".biometric-zone-card");
        tl.fromTo(
          zoneCards,
          { opacity: 0.35, y: 20 },
          { opacity: 1, y: 0, stagger: 0.2, ease: "power2.out" },
          0.2
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-stage="experience"
      className="relative z-10 w-full bg-obsidian-950/40 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Background ambient gold gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-champagne-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-500/80 inline-block" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                {signatureExperience.sectionNum} / {signatureExperience.sectionLabel}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.96]">
              {signatureExperience.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {signatureExperience.headingLine2}
              </span>
            </h2>
          </div>

          {/* Chapter Selector Tabs / Progress Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 bg-surface p-1.5 rounded-full border border-champagne-500/20 max-w-full overflow-x-auto no-scrollbar">
            {signatureExperience.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                data-cursor="Select Ritual"
                onClick={() => {
                  setActiveChapterIndex(idx);
                  handleTriggerSnip();
                }}
                className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeChapterIndex === idx
                    ? "text-obsidian-950 bg-champagne-400 shadow-[0_0_20px_rgba(197,164,119,0.4)]"
                    : "text-muted hover:text-ivory-100"
                }`}
              >
                <span>{ch.num} / {ch.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Chapter Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Chapter Editorial Narrative */}
          <div className="chapter-reveal-item lg:col-span-5 rounded-3xl glass-card border border-champagne-500/15 p-6 sm:p-8 md:p-12 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-champagne-400 font-semibold">
                  CHAPTER {activeChapter.num}
                </span>
                <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-champagne-500/25 text-champagne-300 font-mono">
                  ACTIVE ATELIER RITUAL
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-ivory-50 leading-tight">
                {activeChapter.title}
              </h3>

              <p className="text-sm text-champagne-300/90 font-light tracking-wide">
                {activeChapter.subtitle}
              </p>

              <p className="text-sm text-muted font-light leading-relaxed">
                {activeChapter.description}
              </p>

              {/* Ritual Discipline Checklist */}
              <div className="pt-4 space-y-3 border-t border-champagne-500/15">
                {activeChapter.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-ivory-200/90 font-light">
                    <div className="w-4 h-4 rounded-full border border-champagne-400/50 flex items-center justify-center shrink-0 mt-0.5 text-champagne-300">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-champagne-500/15 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-widest text-muted">
                0{activeChapterIndex + 1} OF 0{signatureExperience.chapters.length} CHAPTERS
              </div>
              <button
                type="button"
                data-cursor="Next Chapter"
                onClick={() => {
                  setActiveChapterIndex((prev) =>
                    prev + 1 < signatureExperience.chapters.length ? prev + 1 : 0
                  );
                  handleTriggerSnip();
                }}
                className="group flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-400 hover:text-ivory-50 transition-colors cursor-pointer"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center/Right Column: 3D Inspection Portal & Cinematic Visual */}
          <div className="chapter-reveal-item lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Interactive 3D Japanese Barber Shears Inspection Card */}
            <div
              className={`rounded-3xl glass-card border p-6 flex flex-col justify-between relative overflow-hidden min-h-[420px] bg-gradient-to-b from-surface/60 via-obsidian-950/80 to-obsidian-950 transition-all duration-300 ${
                snipFlashed
                  ? "border-champagne-300 shadow-[0_0_35px_rgba(200,162,82,0.4)]"
                  : "border-champagne-500/20"
              }`}
            >
              <div className="flex items-center justify-between z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] tracking-widest uppercase text-champagne-300 font-medium block">
                    MASTER METALLURGY
                  </span>
                  <span className="text-[10px] text-muted tracking-wider uppercase font-sans">
                    Hitachi 440C · Honed Hamaguri Edge
                  </span>
                </div>

                {/* Snip Action Button */}
                <button
                  type="button"
                  data-cursor="Snip Blades"
                  onClick={handleTriggerSnip}
                  className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 active:scale-95 transition-all shadow-md cursor-pointer"
                  aria-label="Trigger mechanical snip"
                >
                  <Scissors className="w-3 h-3 text-obsidian-950" />
                  <span>Snip Shears</span>
                  {snipCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-obsidian-950 text-champagne-300 text-[9px] font-mono">
                      {snipCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Exploded View Anatomy Annotation Overlays */}
              <div
                onClick={handleTriggerSnip}
                data-cursor="Click / Snip"
                className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer p-6"
              >
                {/* Floating Callout Labels (Hairline pointers) */}
                <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
                  {/* Callout 1: Hamaguri Blade */}
                  <div className="absolute top-14 left-4 flex items-center gap-2 bg-obsidian-950/80 border border-champagne-500/30 px-2.5 py-1 rounded-full text-[9px] font-mono text-champagne-300 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-ping" />
                    <span>Convex Clamshell Blade</span>
                  </div>

                  {/* Callout 2: Gold Tension Screw */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-2 bg-obsidian-950/80 border border-champagne-500/30 px-2.5 py-1 rounded-full text-[9px] font-mono text-champagne-300 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                    <span>Micro-Click Tension Dial</span>
                  </div>

                  {/* Callout 3: Ergonomic Tang */}
                  <div className="absolute bottom-16 left-6 flex items-center gap-2 bg-obsidian-950/80 border border-champagne-500/30 px-2.5 py-1 rounded-full text-[9px] font-mono text-champagne-300 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                    <span>Anatomical Pinky Tang</span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Dial & Feedback */}
              <div className="relative z-20 pt-4 flex items-center justify-between text-[10px] text-muted tracking-widest uppercase border-t border-champagne-500/15">
                <span className="text-champagne-300">Tap / Click anywhere to snip</span>
                <span className="text-champagne-400 font-mono text-[9px]">
                  Real-time 3D Physics
                </span>
              </div>
            </div>

            {/* Chapter Photographic Visual */}
            <div
              data-cursor="Ritual"
              className="rounded-3xl overflow-hidden border border-champagne-500/20 relative aspect-square sm:aspect-auto min-h-[380px] bg-obsidian-900 group"
            >
              <Image
                src={activeChapter.image}
                alt={activeChapter.title}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center filter brightness-[0.85] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-champagne-500/25">
                <div className="text-[10px] tracking-widest uppercase text-champagne-400 font-mono">
                  ATELIER RITUAL
                </div>
                <div className="text-sm font-serif text-ivory-100">
                  {activeChapter.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anatomical Hair Architecture & Laser Mapping Console */}
        <div className="rounded-3xl glass-card border border-champagne-500/20 p-6 sm:p-8 md:p-10 relative overflow-hidden space-y-8 bg-gradient-to-b from-surface/40 via-obsidian-950/60 to-obsidian-950">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-champagne-500/15 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
                <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                  BIOMETRIC ANATOMY & SECTIONING
                </span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-ivory-50">
                Architectural Head Mapping & Shear Geometry
              </h4>
            </div>
            <p className="text-xs text-muted max-w-md font-light leading-relaxed">
              Every cut at Bhanu's is calibrated against cranial topography, bone structure, and natural whorl directional growth using custom Japanese metallurgy.
            </p>
          </div>

          {/* Active Scanning Laser Beam */}
          <div className="relative pt-2">
            <div
              ref={laserBeamRef}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-300 to-transparent shadow-[0_0_20px_rgba(200,162,82,0.9)] z-20 pointer-events-none will-change-transform"
            />

            {/* Interactive Laser Hotspot Grid */}
            <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  zone: "01 / VERTEX & CROWN",
                  title: "Directional Growth Flow",
                  spec: "Weight Dispersal & Volume Lift",
                  technique: "Convex Slide Cutting · 45°",
                  steel: "Hitachi 440C Japanese Steel",
                  elevation: "Zero Drag, Natural Fall",
                },
                {
                  zone: "02 / TEMPLE & PARIETAL",
                  title: "Biometric Face Framing",
                  spec: "Zygomatic Bone Contour Alignment",
                  technique: "Point Slicing & Channeling",
                  steel: "Hand-Honed Convex Edge",
                  elevation: "Adaptive 15° Elevation",
                },
                {
                  zone: "03 / OCCIPITAL & NAPE",
                  title: "Structural Weight Line",
                  spec: "Cervical Spine Ergonomics",
                  technique: "Scissor-Over-Comb Tapering",
                  steel: "Micro-Serrated Shear Teeth",
                  elevation: "Graduated Perimeter Tension",
                },
                {
                  zone: "04 / CHEEKBONE & JAW",
                  title: "Facial Proportion Anchor",
                  spec: "Symmetry & Jawline Sculpting",
                  technique: "Dry-Sculpting & Texturizing",
                  steel: "Cryogenic Hardened Cobalt",
                  elevation: "Bespoke Density Calibration",
                },
              ].map((hotspot, idx) => (
                <div
                  key={idx}
                  data-cursor="Map Zone"
                  className="biometric-zone-card group relative rounded-2xl p-5 border border-champagne-500/15 bg-surface/30 hover:bg-surface/70 hover:border-champagne-400/50 transition-all duration-500 cursor-pointer flex flex-col justify-between space-y-4 will-change-transform"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-widest text-champagne-400 uppercase font-semibold">
                        {hotspot.zone}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/40 group-hover:bg-champagne-400 group-hover:scale-125 transition-all" />
                    </div>
                    <h5 className="font-serif text-lg text-ivory-100 group-hover:text-champagne-300 transition-colors">
                      {hotspot.title}
                    </h5>
                    <p className="text-[11px] text-muted font-light leading-relaxed">
                      {hotspot.spec}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-champagne-500/10 space-y-1 font-mono text-[9px]">
                    <div className="flex items-center justify-between text-ivory-200/80">
                      <span className="text-muted">Protocol:</span>
                      <span className="text-champagne-300 font-medium">{hotspot.technique}</span>
                    </div>
                    <div className="flex items-center justify-between text-ivory-200/80">
                      <span className="text-muted">Tooling:</span>
                      <span>{hotspot.steel}</span>
                    </div>
                    <div className="flex items-center justify-between text-ivory-200/80">
                      <span className="text-muted">Elevation:</span>
                      <span>{hotspot.elevation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignatureExperience;
