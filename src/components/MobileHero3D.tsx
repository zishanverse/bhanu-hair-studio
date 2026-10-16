"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Scissors, Sparkles, MessageCircle, ArrowDown, Star, Phone, CheckCircle2 } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function MobileHero3D() {
  const [activePill, setActivePill] = useState(0);

  const pillars = [
    {
      id: "cut",
      title: "Architectural Cut",
      tag: "HAUTE PRECISION",
      desc: "Japanese shear geometry, structural face-framing & bespoke weight removal.",
      image: "/images/cat-men.jpg",
      highlight: "Custom Face-Framing",
    },
    {
      id: "color",
      title: "French Balayage",
      tag: "PARISIAN ARTISTRY",
      desc: "Seamless hand-painted dimensional highlights, gloss toners & root melts.",
      image: "/images/cat-color.jpg",
      highlight: "Zero-Stripe Blending",
    },
    {
      id: "spa",
      title: "Silk Spa Ritual",
      tag: "SCALP SANCTUARY",
      desc: "Deep purifying scalp detox, hot steam infusion & restorative massage.",
      image: "/images/cat-spa.jpg",
      highlight: "Sensory Calm & Detox",
    },
    {
      id: "styling",
      title: "Bespoke Styling",
      tag: "SIGNATURE FINISH",
      desc: "Keratin silk smoothing, red-carpet blowouts & high-shine aesthetic finishes.",
      image: "/images/sig-transform.jpg",
      highlight: "Liquid Mirror Shine",
    },
  ];

  const current = pillars[activePill];

  const handleScrollToStudio = () => {
    const studio = document.getElementById("studio");
    if (studio) {
      studio.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="mobile-hero-section"
      className="md:hidden relative w-full h-[100dvh] min-h-[100dvh] bg-obsidian-950 text-ivory-50 overflow-hidden flex flex-col justify-between pt-20 pb-5 px-4 select-none"
    >
      {/* 1. Dynamic Editorial Background with Smooth Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {pillars.map((pillar, idx) => (
          <div
            key={pillar.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              activePill === idx ? "opacity-35 scale-105" : "opacity-0 scale-100"
            } transform transition-transform duration-1000`}
          >
            <Image
              src={pillar.image}
              alt={pillar.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.75] contrast-[1.1]"
            />
          </div>
        ))}

        {/* Ambient Dark Obsidian Gradients for Magazine Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/75 to-obsidian-950/85" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />

        {/* Luminous Champagne Atmosphere Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-champagne-500/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[220px] h-[220px] bg-champagne-400/10 blur-[80px] rounded-full" />
      </div>

      {/* 2. Top Header Brand Crest */}
      <div className="relative z-10 pt-2 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-champagne-500/30 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-3 h-3 text-champagne-400 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.24em] text-champagne-300 font-mono font-medium">
            INDORE HAUTE COIFFURE ATELIER
          </span>
        </div>
      </div>

      {/* 3. Center Editorial Masterpiece Typography */}
      <div className="relative z-10 my-auto text-center px-2 space-y-3.5">
        {/* Main Headline */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-champagne-400/90 font-mono font-medium">
            BHANU&apos;S THE HAIR STUDIO
          </div>
          <h1 className="font-serif text-[2.75rem] leading-[1.02] font-light text-ivory-50 tracking-tight drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
            WHERE STYLE <br />
            BECOMES{" "}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 font-serif">
              ART.
            </span>
          </h1>
        </div>

        {/* Dynamic Pillar Description */}
        <div className="min-h-[50px] flex flex-col items-center justify-center">
          <p className="text-[11px] uppercase tracking-[0.15em] text-ivory-100 font-light max-w-[280px] mx-auto leading-relaxed">
            {current.desc}
          </p>
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-champagne-300">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <span>{current.highlight}</span>
          </div>
        </div>

        {/* Quick Trust Badges Strip */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <div className="flex items-center gap-1 text-[10px] text-ivory-200">
            <Star className="w-3 h-3 text-champagne-400 fill-champagne-400" />
            <span className="font-semibold text-ivory-50">4.9</span>
            <span className="text-muted">(500+ Reviews)</span>
          </div>
          <span className="text-champagne-500/40">·</span>
          <div className="text-[10px] text-ivory-200">
            <span className="text-champagne-300 font-medium">3 Studios</span>
            <span className="text-muted"> in Indore</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Controls: Interactive Pill Selector & Action CTAs */}
      <div className="relative z-10 space-y-3.5 pb-2">
        {/* Interactive Discipline Horizontal Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePill(idx)}
              className={`shrink-0 px-3 py-2 rounded-full border text-[10px] uppercase tracking-wider font-mono transition-all duration-300 min-h-[36px] flex items-center gap-1.5 ${
                activePill === idx
                  ? "bg-champagne-400 text-obsidian-950 font-bold border-champagne-300 shadow-[0_0_20px_rgba(197,164,119,0.55)] scale-[1.02]"
                  : "glass-panel border-champagne-500/25 text-ivory-200 hover:text-white"
              }`}
            >
              {activePill === idx && <Scissors className="w-2.5 h-2.5" />}
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
            className="group relative flex items-center justify-center gap-2 py-3.5 rounded-full overflow-hidden text-[11px] uppercase tracking-wider font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 shadow-[0_0_25px_rgba(197,164,119,0.5)] active:scale-95 transition-all text-center min-h-[46px]"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian-950" />
            <span>Book Session</span>
          </a>

          <button
            type="button"
            onClick={handleScrollToStudio}
            className="flex items-center justify-center gap-1.5 py-3.5 rounded-full text-[11px] uppercase tracking-wider font-light text-champagne-200 border border-champagne-500/35 glass-panel active:bg-champagne-500/10 active:scale-95 transition-all cursor-pointer min-h-[46px]"
          >
            <span>Explore Studio</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-champagne-400" />
          </button>
        </div>

        {/* Quick Contact & Address Footer Line */}
        <div className="flex items-center justify-between text-[10px] text-muted font-mono px-1 pt-1 border-t border-champagne-500/15">
          <span>Palsikar Colony & Indore Outlets</span>
          <a
            href={`tel:${SALON_CONFIG.contact.phone}`}
            className="text-champagne-300 hover:underline flex items-center gap-1"
          >
            <Phone className="w-2.5 h-2.5" />
            <span>Direct Call</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default MobileHero3D;
