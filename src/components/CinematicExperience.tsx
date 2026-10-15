"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONFIG } from "@/config/scenes";
import { SALON_CONFIG } from "@/config/salon.config";
import { MobileHero3D } from "@/components/MobileHero3D";
import {
  CinematicBackground,
  CinematicBackgroundHandle,
} from "@/components/CinematicBackground";
import {
  Scissors,
  Sparkles,
  MessageCircle,
  ArrowDown,
  ArrowUpRight,
  Compass,
  CheckCircle2,
} from "lucide-react";

export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<CinematicBackgroundHandle>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const actSelectorRef = useRef<HTMLDivElement>(null);

  // Parallax refs for pseudo-3D layers
  const scene1HeadlineRef = useRef<HTMLHeadingElement>(null);
  const scene2CardRef = useRef<HTMLDivElement>(null);
  const scene2LineRef = useRef<HTMLDivElement>(null);
  const scene3HeaderRef = useRef<HTMLDivElement>(null);
  const scene3CardsRef = useRef<HTMLDivElement>(null);
  const scene4CardRef = useRef<HTMLDivElement>(null);

  // Act buttons refs
  const actButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeActIndexRef = useRef<number>(0);

  // Smooth scroll & animation tracking
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isLoopActiveRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (window.innerWidth < 768) return; // Dedicated Mobile 3D Engine for < 768px

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Unified Responsive Lenis Smooth Wheel Engine
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Continuous Natural Scroll Measurement over the Multi-Scene Container
    const container = containerRef.current;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: prefersReducedMotion ? 0 : 0.05,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
      onRefresh: (self) => {
        targetProgressRef.current = self.progress;
      },
    });
    stRef.current = st;

    // 3. Subtle GSAP Pseudo-3D Parallax on Foreground Layers
    const ctx = gsap.context(() => {
      // Scene 1: Headline float with perspective depth
      if (scene1HeadlineRef.current) {
        gsap.to(scene1HeadlineRef.current, {
          y: -120,
          scale: 0.96,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: "#cinematic-act-1",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Scene 2: Expanding gold rule & craft card entrance
      if (scene2LineRef.current) {
        gsap.fromTo(
          scene2LineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#cinematic-act-2",
              start: "top 75%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      if (scene2CardRef.current) {
        gsap.fromTo(
          scene2CardRef.current,
          { y: 80, opacity: 0.2 },
          {
            y: -40,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#cinematic-act-2",
              start: "top 80%",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Scene 3: Staggered floating cards
      if (scene3CardsRef.current && scene3CardsRef.current.children) {
        const cards = Array.from(scene3CardsRef.current.children);
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { y: 60 + idx * 30, opacity: 0.4 },
            {
              y: -30 - idx * 20,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }

      // Scene 4: Invitation fade & scale
      if (scene4CardRef.current) {
        gsap.fromTo(
          scene4CardRef.current,
          { scale: 0.94, opacity: 0.3, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#cinematic-act-4",
              start: "top 70%",
              end: "top 25%",
              scrub: true,
            },
          }
        );
      }
    }, container);

    // 4. High-Performance RAF Loop for Video Sync and Act Tracking (Zero React re-renders)
    isLoopActiveRef.current = true;
    const lerpFactor = prefersReducedMotion ? 1 : 0.14;

    const loop = () => {
      if (!isLoopActiveRef.current) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00008) {
        currentProgressRef.current += diff * lerpFactor;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const progress = Math.max(0, Math.min(1, currentProgressRef.current));

      // 4a. Synchronize background video frame
      if (backgroundRef.current) {
        backgroundRef.current.seekToProgress(progress);
      }

      // 4b. Update bottom progress indicator
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // 4c. Calculate active Act based on normalized progress
      // Act 1: 0.0 - 0.25 | Act 2: 0.25 - 0.50 | Act 3: 0.50 - 0.75 | Act 4: 0.75 - 1.0
      let activeIdx = 0;
      if (progress < 0.25) activeIdx = 0;
      else if (progress < 0.50) activeIdx = 1;
      else if (progress < 0.75) activeIdx = 2;
      else activeIdx = 3;

      if (activeIdx !== activeActIndexRef.current) {
        const prevBtn = actButtonsRef.current[activeActIndexRef.current];
        const nextBtn = actButtonsRef.current[activeIdx];

        if (prevBtn) {
          prevBtn.className =
            "px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap text-muted hover:text-ivory-100";
        }
        if (nextBtn) {
          nextBtn.className =
            "px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.45)]";
        }
        activeActIndexRef.current = activeIdx;
      }

      // 4d. Hide floating Act selector if user has scrolled past into TheStudio
      if (actSelectorRef.current) {
        if (progress > 0.98) {
          actSelectorRef.current.style.opacity = "0";
          actSelectorRef.current.style.pointerEvents = "none";
        } else {
          actSelectorRef.current.style.opacity = "1";
          actSelectorRef.current.style.pointerEvents = "auto";
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isLoopActiveRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      st.kill();
      lenis.destroy();
    };
  }, []);

  // Jump to specific Act via smooth Lenis scroll
  const scrollToAct = (actId: string) => {
    if (lenisRef.current) {
      const el = document.getElementById(actId);
      if (el) {
        lenisRef.current.scrollTo(el, { duration: 1.0, offset: 0 });
      }
    } else {
      const el = document.getElementById(actId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToStudio = () => {
    if (lenisRef.current) {
      const studio = document.getElementById("studio");
      if (studio) {
        lenisRef.current.scrollTo(studio, { duration: 1.1 });
      }
    } else {
      const studio = document.getElementById("studio");
      if (studio) studio.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="cinematic-experience" className="relative w-full">
      {/* 1. DEDICATED 3D WEBGL ENGINE FOR MOBILE (< 768px) */}
      <div className="block md:hidden">
        <MobileHero3D />
      </div>

      {/* 2. LUXURY NATURAL SCROLLING DESKTOP EXPERIENCE (>= 768px) */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full bg-obsidian-950 text-ivory-50 select-none"
      >
        {/* A. STICKY BACKGROUND SYSTEM (Fixed in viewport, progresses with scroll) */}
        <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden -z-10 pointer-events-none">
          <CinematicBackground
            ref={backgroundRef}
            videoSrc={HERO_CONFIG.videoSrc}
          />

          {/* Real-time Cinematic Progress Bar along the bottom of the sticky frame */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-900/60 z-30 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-champagne-400 origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* B. FOREGROUND CONTENT (Naturally scrolls on top of sticky video) */}
        <div className="relative -mt-[100dvh] z-10 w-full pointer-events-auto">
          {/* ========================================================================= */}
          {/* SCENE 01 — THE LUXURY ENTRANCE */}
          {/* ========================================================================= */}
          <section
            id="cinematic-act-1"
            className="min-h-[100dvh] flex flex-col justify-between py-24 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto"
          >
            {/* Top Eyebrow Badge */}
            <div className="flex items-center justify-between pt-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-champagne-500/30 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
                <span className="text-[11px] tracking-ultra uppercase text-champagne-300 font-mono font-medium">
                  ACT I · THE GENESIS OF FORM · PALSIKAR ATELIER
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-champagne-400/80 tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5 text-champagne-400" />
                <span>22.7196° N, 75.8577° E · INDORE</span>
              </div>
            </div>

            {/* Asymmetrical Main Headline */}
            <div className="my-auto space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                <span className="text-xs uppercase tracking-ultra text-champagne-400 font-semibold drop-shadow-md">
                  HAUTE COIFFURE & UNISEX ATELIER · INDORE
                </span>
              </div>

              <h1
                ref={scene1HeadlineRef}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-ivory-50 tracking-tight leading-[0.94] drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)] will-change-transform"
              >
                WHERE STYLE <br />
                BECOMES{" "}
                <span className="italic font-normal text-champagne-400 font-serif">
                  ART.
                </span>
              </h1>

              <p className="text-sm md:text-base tracking-[0.2em] uppercase text-champagne-200/90 font-light max-w-xl drop-shadow-md leading-relaxed">
                Sculptural precision haircuts, bespoke hair coloring, and restorative Japanese head spa rituals in Palsikar Colony.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#book"
                  className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-500 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all transform hover:scale-105 active:scale-95"
                >
                  Reserve Your Session
                </a>
                <button
                  type="button"
                  onClick={() => scrollToAct("cinematic-act-2")}
                  className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 border border-champagne-500/40 glass-panel hover:border-champagne-400 hover:text-white transition-all cursor-pointer"
                >
                  Discover The Craft ↓
                </button>
              </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="flex items-center justify-between border-t border-champagne-500/15 pt-6 text-[10px] font-mono tracking-widest text-champagne-400/80 uppercase">
              <div className="flex items-center gap-2">
                <Scissors className="w-3.5 h-3.5 text-champagne-400" />
                <span>UNISEX HAUTE COIFFURE</span>
              </div>
              <div className="flex items-center gap-2 animate-bounce">
                <span>SCROLL TO ENTER ATELIER</span>
                <ArrowDown className="w-3.5 h-3.5 text-champagne-400" />
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SCENE 02 — THE ART OF PRECISION */}
          {/* ========================================================================= */}
          <section
            id="cinematic-act-2"
            className="min-h-[100dvh] flex items-center py-24 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto relative"
          >
            {/* Background Watermark Roman Numeral */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 text-champagne-500/[0.05] font-serif text-[260px] font-light pointer-events-none select-none">
              II
            </div>

            {/* Left-weighted Craftsmanship Content (Leaves focal point in video visible) */}
            <div
              ref={scene2CardRef}
              className="max-w-xl space-y-6 will-change-transform relative z-10"
            >
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-semibold drop-shadow-md">
                  ACT II — GEOMETRIC DISCIPLINE
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory-50 tracking-tight leading-[1.0] drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
                THE ART OF <br />
                <span className="italic font-normal text-champagne-400 font-serif">
                  PRECISION.
                </span>
              </h2>

              {/* Expanding Horizontal Gold Rule */}
              <div
                ref={scene2LineRef}
                className="w-32 h-[1px] bg-gradient-to-r from-champagne-400 to-transparent"
              />

              {/* Editorial Craft Manifesto Card */}
              <div className="p-7 rounded-2xl glass-card border border-champagne-500/20 backdrop-blur-xl space-y-4 shadow-2xl">
                <p className="text-sm md:text-base text-ivory-100 font-light leading-relaxed">
                  Every contour is engineered with surgical discipline. From razor-sharp tapers to couture scissor texturing, we sculpt hair to reflect your facial architecture and natural presence.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-champagne-500/15">
                  <span className="px-3 py-1 rounded-full text-[9px] uppercase font-mono tracking-wider border border-champagne-500/30 text-champagne-300 bg-champagne-500/5">
                    440C JAPANESE STEEL
                  </span>
                  <span className="px-3 py-1 rounded-full text-[9px] uppercase font-mono tracking-wider border border-champagne-500/30 text-champagne-300 bg-champagne-500/5">
                    ANATOMICAL MAPPING
                  </span>
                  <span className="px-3 py-1 rounded-full text-[9px] uppercase font-mono tracking-wider border border-champagne-500/30 text-champagne-300 bg-champagne-500/5">
                    COUTURE TEXTURING
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToAct("cinematic-act-3")}
                  className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-champagne-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    View Signature Rituals
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne-400 group-hover:w-full transition-all duration-300" />
                  </span>
                  <div className="w-7 h-7 rounded-full border border-champagne-500/40 flex items-center justify-center group-hover:border-champagne-300 group-hover:bg-champagne-500/10 transition-all">
                    <ArrowDown className="w-3.5 h-3.5 transform group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SCENE 03 — SIGNATURE SERVICES */}
          {/* ========================================================================= */}
          <section
            id="cinematic-act-3"
            className="min-h-[110dvh] flex flex-col justify-center py-24 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto relative"
          >
            {/* Header */}
            <div ref={scene3HeaderRef} className="space-y-4 mb-12 max-w-2xl">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-semibold">
                  ACT III — FLUID ELEGANCE
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory-50 tracking-tight leading-[1.0]">
                SIGNATURE <br />
                <span className="italic font-normal text-champagne-400 font-serif">
                  SERVICES.
                </span>
              </h2>

              <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-champagne-300/90 font-light">
                COUTURE TEXTURES, RADIANT COLOUR & TRANQUIL RITUALS
              </p>
            </div>

            {/* 3 Progressive Preview Cards (Generous negative space, glass & gold borders) */}
            <div
              ref={scene3CardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 will-change-transform"
            >
              {/* Card 1 */}
              <div className="p-7 rounded-2xl glass-card border border-champagne-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6 group hover:border-champagne-400/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-champagne-400 tracking-widest uppercase">
                    <span>HAUTE ARCHITECTURE</span>
                    <Scissors className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-serif text-2xl text-ivory-50 font-light group-hover:text-champagne-200 transition-colors">
                    Sculptural Cut & Style
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    Custom anatomical consultation, shampoo ritual, bespoke scissor sculpting, and couture blow-dry finish.
                  </p>
                </div>
                <div className="pt-4 border-t border-champagne-500/15 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-ivory-200">45-60 MIN</span>
                  <span className="text-champagne-300 font-semibold">FROM ₹500</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-7 rounded-2xl glass-card border border-champagne-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 group hover:border-champagne-400/60 transition-all duration-500 hover:-translate-y-2 shadow-2xl bg-gradient-to-b from-champagne-500/5 to-transparent">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-champagne-400 tracking-widest uppercase">
                    <span>COUTURE COLORING</span>
                    <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-ivory-50 font-light group-hover:text-champagne-200 transition-colors">
                    French Balayage & Gloss
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    Hand-painted dimensional lighting with custom tone formulation and Plex bond protection for silky reflection.
                  </p>
                </div>
                <div className="pt-4 border-t border-champagne-500/15 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-ivory-200">120-180 MIN</span>
                  <span className="text-champagne-300 font-semibold">FROM ₹2,500</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-7 rounded-2xl glass-card border border-champagne-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6 group hover:border-champagne-400/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-champagne-400 tracking-widest uppercase">
                    <span>RESTORATIVE SPA</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-serif text-2xl text-ivory-50 font-light group-hover:text-champagne-200 transition-colors">
                    Liquid Silk & Scalp Rebirth
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    Japanese head spa massage, deep follicle steam infusion, and intensive keratin smoothening treatment.
                  </p>
                </div>
                <div className="pt-4 border-t border-champagne-500/15 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-ivory-200">60-90 MIN</span>
                  <span className="text-champagne-300 font-semibold">FROM ₹1,200</span>
                </div>
              </div>
            </div>

            {/* Bridge CTA into Full Treatment Directory */}
            <div className="pt-10 flex items-center justify-center">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium text-champagne-300 border border-champagne-500/35 glass-panel hover:border-champagne-300 hover:text-white transition-all shadow-lg"
              >
                <span>View Complete 30-Ritual Directory</span>
                <ArrowUpRight className="w-4 h-4 text-champagne-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SCENE 04 — THE FINAL INVITATION */}
          {/* ========================================================================= */}
          <section
            id="cinematic-act-4"
            className="min-h-[100dvh] flex flex-col items-center justify-center text-center py-24 px-6 md:px-14 lg:px-20 max-w-4xl mx-auto relative"
          >
            <div
              ref={scene4CardRef}
              className="space-y-7 will-change-transform max-w-3xl mx-auto"
            >
              {/* Flanking Gold Lines Label */}
              <div className="inline-flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                <span className="text-xs uppercase tracking-ultra text-champagne-400 font-semibold">
                  ACT IV — SIGNATURE IDENTITY
                </span>
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              </div>

              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-ivory-50 tracking-tight leading-[0.96] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                CRAFTED FOR <br />
                YOUR{" "}
                <span className="italic font-normal text-champagne-400 font-serif">
                  STYLE.
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-champagne-300 font-medium max-w-xl mx-auto drop-shadow-md">
                INDULGE IN BESPOKE UNISEX LUXURY AT BHANU&apos;S PALSIKAR
              </p>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#book"
                  className="px-9 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-500 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all transform hover:scale-105 active:scale-95"
                >
                  Reserve Your Session
                </a>

                <a
                  href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                    "Hello Bhanu's The Hair Studio Palsikar, I would like to reserve a luxury appointment."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-emerald-300 border border-emerald-500/40 glass-panel hover:border-emerald-400 hover:bg-emerald-950/20 transition-all flex items-center gap-2.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>

                <button
                  type="button"
                  onClick={scrollToStudio}
                  className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 border border-champagne-500/40 glass-panel hover:border-champagne-400 hover:text-white transition-all cursor-pointer"
                >
                  Explore The Atelier ↓
                </button>
              </div>

              {/* Sanctuary Meta */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] font-mono text-champagne-400/80 tracking-widest uppercase">
                <span>MANIK BAGH RD, PALSIKAR COLONY</span>
                <span className="hidden sm:inline">·</span>
                <span>OPEN DAILY 10:00 AM — 10:00 PM</span>
              </div>
            </div>
          </section>
        </div>

        {/* C. CONSTANT FLOATING ACT SELECTOR (Stays comfortably visible on desktop) */}
        <div
          ref={actSelectorRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto transition-opacity duration-500"
        >
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-champagne-500/30 backdrop-blur-xl shadow-2xl">
            {[
              { id: "cinematic-act-1", label: "ACT 01", title: "ENTRANCE" },
              { id: "cinematic-act-2", label: "ACT 02", title: "PRECISION" },
              { id: "cinematic-act-3", label: "ACT 03", title: "SERVICES" },
              { id: "cinematic-act-4", label: "ACT 04", title: "INVITATION" },
            ].map((act, i) => (
              <button
                key={act.id}
                ref={(el) => {
                  actButtonsRef.current[i] = el;
                }}
                type="button"
                onClick={() => scrollToAct(act.id)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  i === 0
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.45)]"
                    : "text-muted hover:text-ivory-100"
                }`}
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
