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
  Clock,
  Star,
  MapPin,
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
      // Gentle parallax fade on headline as user scrolls into the studio
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -80,
          opacity: 0.15,
          ease: "none",
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
          y: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "20% top",
            end: "60% top",
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
        className="hidden md:block relative w-full text-ivory-50 select-none min-h-[100dvh] flex flex-col justify-between py-16 px-8 md:px-14 lg:px-20 max-w-7xl mx-auto"
      >
        {/* Top Luxury Atelier Badge Bar */}
        <div className="flex items-center justify-between pt-6 pointer-events-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-champagne-500/30 shadow-xl backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-champagne-200 font-medium">
              Bhanu&apos;s The Hair Studio · Palsikar Colony
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-champagne-300 tracking-wider uppercase">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/20">
              <Clock className="w-3.5 h-3.5 text-champagne-400" />
              <span>Open Daily 10 AM – 10 PM</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/20">
              <MapPin className="w-3.5 h-3.5 text-champagne-400" />
              <span>Manik Bagh Rd, Indore</span>
            </div>
          </div>
        </div>

        {/* Central Editorial Haute Coiffure Masterpiece */}
        <div className="my-auto space-y-7 max-w-4xl pointer-events-auto pt-6">
          <div className="inline-flex items-center gap-3">
            <span className="w-10 h-[1px] bg-champagne-400 inline-block" />
            <span className="text-xs uppercase tracking-[0.25em] text-champagne-300 font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              HAUTE COIFFURE & UNISEX ATELIER
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-ivory-50 tracking-tight leading-[0.93] drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] will-change-transform"
          >
            WHERE STYLE <br />
            BECOMES{" "}
            <span className="italic font-normal text-champagne-300 font-serif">
              ART.
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="text-base md:text-lg text-ivory-100/90 font-light max-w-2xl drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] leading-relaxed"
          >
            Indore&apos;s premier unisex salon for precision haircutting, customized balayage, keratin smoothing, and restorative head spa rituals in Palsikar Colony.
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_35px_rgba(200,162,82,0.7)] transition-all transform hover:scale-105 active:scale-95"
            >
              Book Appointment
            </a>

            <a
              href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SALON_CONFIG.contact.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-50 border border-champagne-500/35 glass-card hover:border-champagne-300 hover:bg-champagne-500/10 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              type="button"
              onClick={scrollToStudio}
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
