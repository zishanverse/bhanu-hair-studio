"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Scissors, Sparkles, MessageCircle, ArrowDown, Star, Phone } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";
import { stageState } from "@/lib/stageState";

export function MobileHero3D() {
  const [activePill, setActivePill] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const pillars = [
    {
      id: "cut",
      title: "Precision Cut",
      tag: "HAUTE GEOMETRY",
      desc: "Japanese shear architecture, structural face-framing & bespoke weight removal.",
      highlight: "Japanese Shears",
    },
    {
      id: "color",
      title: "French Balayage",
      tag: "PARISIAN ARTISTRY",
      desc: "Hand-painted dimensional ribbons, liquid glass gloss & seamless root melts.",
      highlight: "Liquid Mirror Gloss",
    },
    {
      id: "spa",
      title: "Silk Spa Ritual",
      tag: "SCALP SANCTUARY",
      desc: "Deep purifying scalp detox, hot steam infusion & restorative pressure-point massage.",
      highlight: "Japanese Scalp Detox",
    },
    {
      id: "styling",
      title: "Royal Grooming",
      tag: "SIGNATURE FINISH",
      desc: "Keratin silk smoothing, red-carpet blowouts & bespoke executive aesthetics.",
      highlight: "Bespoke Finish",
    },
  ];

  const current = pillars[activePill];

  // Adjust shears position specifically for mobile portrait viewport
  useEffect(() => {
    stageState.shears.x = 0;
    stageState.shears.y = -0.15;
    stageState.shears.scale = 0.68;
    stageState.shears.rx = 0.25;
    stageState.shears.ry = 0.2;
  }, []);

  // Ensure continuous video background autoplay across mobile browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const attemptPlay = () => {
      video.play().catch(() => {});
    };

    attemptPlay();

    const handleFirstTouch = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
      window.removeEventListener("touchstart", handleFirstTouch);
    };

    window.addEventListener("touchstart", handleFirstTouch, { passive: true, once: true });
    return () => window.removeEventListener("touchstart", handleFirstTouch);
  }, []);

  const handlePillClick = (idx: number) => {
    setActivePill(idx);
    stageState.snip(); // Trigger tactile 3D shears mechanical snip on mobile!
  };

  const handleScrollToStudio = () => {
    const studio = document.getElementById("studio");
    if (studio) {
      studio.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="mobile-hero-section"
      className="md:hidden relative w-full h-[100dvh] min-h-[100dvh] bg-transparent text-ivory-50 overflow-hidden flex flex-col justify-between pt-20 pb-5 px-4 select-none"
    >
      {/* 1. CINEMATIC VIDEO BACKGROUND (Subtle backdrop allowing 3D shears to shine) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Poster / Fallback High-Resolution Image for Instant Paint */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/sequence/frame_0001.webp"
            alt="Bhanu's The Hair Studio Atelier"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.55] contrast-[1.1]"
          />
        </div>

        {/* Looping Commercial Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="/sequence/frame_0001.webp?v=v900"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-[0.6] contrast-[1.15]"
        >
          <source src="/bhanu-hero.mp4?v=current-scene-v2" type="video/mp4" />
        </video>

        {/* Editorial Gradients for Deep Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-obsidian-950/70" />
      </div>

      {/* 2. TOP HEADER STATUS */}
      <div className="relative z-10 pt-2 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/35 backdrop-blur-2xl shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse shrink-0" />
          <span className="text-[9px] uppercase tracking-[0.24em] text-champagne-300 font-mono font-medium">
            HAUTE COIFFURE ATELIER · INDORE
          </span>
        </div>
      </div>

      {/* 3. CENTER EDITORIAL TYPOGRAPHY & INTERACTIVE 3D SNIP PROMPT */}
      <div
        onClick={() => stageState.snip()}
        className="relative z-10 my-auto text-center px-2 space-y-3 cursor-pointer active:scale-[0.99] transition-transform"
      >
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 mx-auto">
          <span className="w-5 h-[1px] bg-champagne-400/60 inline-block" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-champagne-300 font-mono font-semibold drop-shadow-md">
            BHANU&apos;S THE HAIR STUDIO
          </span>
          <span className="w-5 h-[1px] bg-champagne-400/60 inline-block" />
        </div>

        {/* Monumental Headline */}
        <h1 className="font-serif text-[clamp(2.15rem,8.5vw,2.85rem)] leading-[0.98] font-light text-ivory-50 tracking-tight drop-shadow-[0_15px_40px_rgba(0,0,0,0.98)] text-balance">
          WHERE STYLE <br />
          BECOMES{" "}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 font-serif drop-shadow-[0_0_25px_rgba(200,162,82,0.6)]">
            ART.
          </span>
        </h1>

        {/* Tap to Snip Shears Prompt */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-950/80 border border-champagne-500/35 backdrop-blur-md text-[9px] font-mono text-champagne-300 shadow-md">
          <Scissors className="w-3 h-3 text-champagne-400" />
          <span>Tap anywhere to snip 3D shears</span>
        </div>

        {/* Dynamic Pillar Description */}
        <div className="min-h-[46px] flex flex-col items-center justify-center">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ivory-100 font-light max-w-[290px] mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {current.desc}
          </p>
        </div>

        {/* Trust Badges Strip */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-panel border border-champagne-500/20 backdrop-blur-md text-[10px]">
            <Star className="w-3 h-3 text-champagne-400 fill-champagne-400" />
            <span className="font-semibold text-ivory-50">4.9★</span>
            <span className="text-muted">(500+ Verified)</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-panel border border-champagne-500/20 backdrop-blur-md text-[10px]">
            <span className="text-champagne-300 font-medium">3 Studios</span>
            <span className="text-muted"> in Indore</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM CONTROLS & ACTIONS */}
      <div className="relative z-10 space-y-3 pb-2">
        {/* Interactive Discipline Horizontal Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePillClick(idx)}
              className={`shrink-0 px-3 py-2 rounded-full border text-[10px] uppercase tracking-wider font-mono transition-all duration-300 min-h-[36px] flex items-center gap-1.5 backdrop-blur-xl ${
                activePill === idx
                  ? "bg-gradient-to-r from-champagne-300 to-champagne-400 text-obsidian-950 font-bold border-champagne-200 shadow-[0_0_22px_rgba(197,164,119,0.65)] scale-[1.02]"
                  : "glass-panel border-champagne-500/25 text-ivory-200 hover:text-white"
              }`}
            >
              {activePill === idx ? (
                <Scissors className="w-2.5 h-2.5" />
              ) : (
                <Sparkles className="w-2.5 h-2.5 text-champagne-400/70" />
              )}
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Primary Booking & Discovery Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-0.5">
          <a
            href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              `Hello Bhanu's The Hair Studio, I would like to reserve a luxury salon session for ${current.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2 py-3.5 rounded-full overflow-hidden text-[11px] uppercase tracking-wider font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 shadow-[0_0_25px_rgba(197,164,119,0.55)] active:scale-95 transition-all text-center min-h-[46px]"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian-950" />
            <span>Book Session</span>
          </a>

          <button
            type="button"
            onClick={handleScrollToStudio}
            className="flex items-center justify-center gap-1.5 py-3.5 rounded-full text-[11px] uppercase tracking-wider font-light text-champagne-200 border border-champagne-500/40 glass-panel backdrop-blur-xl active:bg-champagne-500/10 active:scale-95 transition-all cursor-pointer min-h-[46px]"
          >
            <span>Explore Studio</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-champagne-400" />
          </button>
        </div>

        {/* Quick Contact & Address Footer Line */}
        <div className="flex items-center justify-between text-[10px] text-muted font-mono px-1 pt-1 border-t border-champagne-500/20">
          <span>Palsikar Colony & Indore Studios</span>
          <a
            href={`tel:${SALON_CONFIG.contact.phone}`}
            className="text-champagne-300 hover:underline flex items-center gap-1"
          >
            <Phone className="w-2.5 h-2.5 text-champagne-400" />
            <span>{SALON_CONFIG.contact.displayPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default MobileHero3D;
