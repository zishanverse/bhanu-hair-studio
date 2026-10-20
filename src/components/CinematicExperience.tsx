"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileHero3D } from "@/components/MobileHero3D";
import {
  Scissors,
  Sparkles,
  MessageCircle,
  ArrowDown,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance choreography: Clipped-line reveal & gold rule expansion
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

      tl.fromTo(
        ".hero-clip-inner",
        { yPercent: 130 },
        { yPercent: 0, duration: 1.35, stagger: 0.14 }
      )
        .fromTo(
          ".hero-gold-rule",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.1, ease: "power2.out" },
          0.3
        )
        .fromTo(
          ".hero-eyebrow-text",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.9 },
          0.4
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.0 },
          0.6
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.75
        );

      // 2. Parallax exit with subtle focal defocus matching Reposé reference
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -18,
          scale: 1.02,
          opacity: 0.12,
          filter: "blur(5px)",
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (trustBarRef.current) {
        gsap.to(trustBarRef.current, {
          y: -30,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "45% top",
            end: "85% top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToStudio = () => {
    const el = document.getElementById("studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="cinematic-experience" className="relative w-full">
      {/* 1. DEDICATED 3D ENGINE FOR MOBILE (< 768px) */}
      <div className="block md:hidden">
        <MobileHero3D />
      </div>

      {/* 2. WORLD-CLASS EDITORIAL LUXURY DESKTOP HERO (>= 768px) */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full text-ivory-50 select-none min-h-[100dvh] flex flex-col justify-between pt-32 pb-16 px-8 md:px-14 lg:px-20 max-w-7xl mx-auto"
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
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-ivory-50 tracking-tight leading-[0.9] drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] will-change-transform"
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
              href="#book"
              data-cursor="Reserve Seat"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_35px_rgba(200,162,82,0.7)] transition-all transform hover:scale-105 active:scale-95"
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

            <button
              type="button"
              onClick={scrollToStudio}
              data-cursor="Atelier"
              className="px-6 py-4 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 hover:text-white transition-colors cursor-pointer"
            >
              Explore Studio ↓
            </button>
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
