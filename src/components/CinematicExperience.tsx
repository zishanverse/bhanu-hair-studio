"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MobileHero3D } from "@/components/MobileHero3D";
import { useMagnetic } from "@/lib/useMagnetic";
import {
  Scissors,
  Sparkles,
  MessageCircle,
  Star,
} from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);
  const reserveBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const mm = gsap.matchMedia();

    // Only apply animations when screen >= 768px and user does not prefer reduced motion
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // 1. Initial hidden state set by GSAP (not CSS, preventing invisible text bugs)
      gsap.set(".hero-clip-inner", { yPercent: 120 });
      gsap.set(".hero-gold-rule", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero-eyebrow-text", { opacity: 0, x: -12 });
      if (subtextRef.current) gsap.set(subtextRef.current, { opacity: 0, y: 16 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "luxe" }, delay: 0.1 });

      tl.to(".hero-clip-inner", {
        yPercent: 0,
        duration: 1.25,
        stagger: 0.12,
      })
        .to(".hero-gold-rule", {
          scaleX: 1,
          duration: 1.0,
          ease: "power2.out",
        }, 0.25)
        .to(".hero-eyebrow-text", {
          opacity: 1,
          x: 0,
          duration: 0.8,
        }, 0.35)
        .to(subtextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
        }, 0.5)
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, 0.65);

      // 2. Parallax exit with subtle focal defocus on scroll
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -18,
          scale: 1.02,
          opacity: 0.15,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (trustBarRef.current) {
        gsap.to(trustBarRef.current, {
          y: -24,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "35% top",
            end: "80% top",
            scrub: 1,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="cinematic-experience" className="relative w-full">
      {/* 1. DEDICATED MOBILE HERO (< 768px) */}
      <div className="block md:hidden">
        <MobileHero3D />
      </div>

      {/* 2. WORLD-CLASS EDITORIAL LUXURY DESKTOP HERO (>= 768px) */}
      <div
        ref={containerRef}
        className="hidden md:flex relative w-full text-ivory-50 select-none min-h-[100dvh] flex-col justify-between pt-32 pb-16 px-8 md:px-14 lg:px-20 max-w-7xl mx-auto"
      >
        {/* Central Editorial Haute Coiffure Masterpiece */}
        <div className="my-auto space-y-7 max-w-4xl pointer-events-auto">
          <div className="inline-flex items-center gap-3">
            <span className="hero-gold-rule w-12 h-[1px] bg-champagne-400 inline-block will-change-transform" />
            <span className="hero-eyebrow-text text-xs uppercase tracking-[0.28em] text-champagne-300 font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              HAUTE COIFFURE & UNISEX ATELIER · INDORE
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-serif text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-light text-ivory-50 tracking-tight leading-[0.92] drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] will-change-transform text-balance"
          >
            <span className="clip-line">
              <span className="clip-line-inner hero-clip-inner">WHERE STYLE</span>
            </span>
            <span className="clip-line">
              <span className="clip-line-inner hero-clip-inner">
                BECOMES{" "}
                <span className="italic font-normal text-champagne-300 font-serif">
                  ART.
                </span>
              </span>
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="text-base md:text-lg text-ivory-100/90 font-light max-w-2xl drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] leading-relaxed"
          >
            Indore&apos;s premier unisex salon for precision haircutting, customized balayage, keratin smoothing, and restorative head spa rituals in Palsikar Colony.
          </p>

          {/* Action CTAs with contextual cursor labels */}
          <div ref={ctaRef} className="pt-2 flex flex-wrap items-center gap-4">
            <a
              ref={reserveBtnRef}
              href="#book"
              data-cursor="Reserve Seat"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_35px_rgba(200,162,82,0.7)] transition-all transform active:scale-95 cursor-pointer"
            >
              Book Appointment
            </a>

            <a
              href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SALON_CONFIG.contact.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WhatsApp"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-50 border border-champagne-500/35 glass-card hover:border-champagne-300 hover:bg-champagne-500/10 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Inquiry</span>
            </a>

            <a
              href="#studio"
              data-cursor="Atelier"
              className="px-6 py-4 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 hover:text-white transition-colors cursor-pointer"
            >
              Explore Studio ↓
            </a>
          </div>
        </div>

        {/* Bottom Social Proof & Trust Bar */}
        <div
          ref={trustBarRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-champagne-500/20 pt-6 pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
              <Star className="w-4 h-4 fill-champagne-400" />
            </div>
            <div>
              <div className="text-sm font-serif text-ivory-50">4.9 Star Rating</div>
              <div className="text-[11px] text-muted font-sans">Over 500+ Verified Clients in Indore</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-serif text-ivory-50">30+ Bespoke Rituals</div>
              <div className="text-[11px] text-muted font-sans">Haircut, Hair Color, Rebonding & Spa</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-serif text-ivory-50">Master Stylists</div>
              <div className="text-[11px] text-muted font-sans">Personalized Consultations Every Session</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CinematicExperience;
