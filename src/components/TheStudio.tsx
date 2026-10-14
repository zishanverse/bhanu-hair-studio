"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SALON_CONFIG } from "@/config/salon.config";
import { ArrowUpRight, Compass, MapPin } from "lucide-react";

export function TheStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { theStudio, identity } = SALON_CONFIG;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Horizontal expanding gold rule
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax for the right side image composition
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { y: 40 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Staggered lines for the heading
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Content fade up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative z-20 w-full bg-obsidian-950 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden border-t border-champagne-500/15"
    >
      {/* Visual Bridge & Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[250px] bg-champagne-500/5 blur-[140px] pointer-events-none -translate-y-1/2" />
      
      {/* Background Architectural Monogram Watermark */}
      <div className="absolute right-0 top-1/4 select-none pointer-events-none text-[15vw] font-serif font-light text-champagne-500/[0.025] leading-none tracking-tighter whitespace-nowrap z-0">
        PALSIKAR
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Architectural Header */}
        <div className="flex items-center justify-between border-b border-champagne-500/15 pb-6 mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="w-6 sm:w-8 h-[1px] bg-champagne-500/80 inline-block" />
            <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-medium">
              {theStudio.sectionNum} / {theStudio.sectionLabel}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-muted uppercase hidden sm:inline">
              — INDORE ATELIER
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-champagne-400/80 tracking-widest uppercase">
            <span>ELEV: 553M MSL</span>
            <span>·</span>
            <span>MMXXIV ARCHIVE</span>
          </div>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Typography & Philosophy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2
              ref={headlineRef}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.96]"
            >
              <div className="overflow-hidden">
                <span>{theStudio.headingLine1}</span>
              </div>
              <div className="overflow-hidden">
                <span className="italic font-normal text-champagne-300 font-serif">
                  {theStudio.headingLine2}
                </span>
              </div>
            </h2>

            {/* Expanding Fine Divider */}
            <div
              ref={dividerRef}
              className="w-24 h-[1px] bg-gradient-to-r from-champagne-400 to-champagne-600/30"
            />

            <div ref={contentRef} className="space-y-6 max-w-xl">
              <p className="text-base md:text-lg text-ivory-100 font-light leading-relaxed">
                {theStudio.description}
              </p>

              {/* Master Stylist's Manifesto Blockquote */}
              <div className="p-6 rounded-2xl glass-card border-l-2 border-champagne-400 border-t border-r border-b border-champagne-500/15 space-y-3 relative overflow-hidden">
                <div className="text-champagne-400/20 font-serif text-5xl absolute -top-1 right-3 leading-none select-none">
                  “
                </div>
                <p className="font-serif italic text-base sm:text-lg text-champagne-100/90 leading-relaxed relative z-10">
                  Precision cutting is not merely subtracting length; it is sculpting light, anatomy, and personality into organic harmony.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-champagne-500/10">
                  <div>
                    <div className="font-medium text-xs tracking-wider uppercase text-ivory-100">
                      Bhanu
                    </div>
                    <div className="text-[10px] tracking-widest text-muted font-mono uppercase">
                      Master Stylist & Atelier Founder
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-champagne-400/40 flex items-center justify-center text-[10px] font-serif italic text-champagne-300">
                    B
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-sm text-muted font-light leading-relaxed">
                {theStudio.philosophy.map((para, i) => (
                  <p key={i} className="border-l border-champagne-500/25 pl-4 py-0.5">
                    {para}
                  </p>
                ))}
              </div>

              {/* Studio Coordinates & Heritage */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-champagne-400/80 tracking-widest uppercase font-mono">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-champagne-400" />
                  <span>{identity.coordinates.lat}, {identity.coordinates.lng}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-champagne-400" />
                  <span>MANIK BAGH RD, PALSIKAR COLONY</span>
                </div>
              </div>

              {/* Explore Link */}
              <div className="pt-2">
                <a
                  href="#services"
                  className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-champagne-300 hover:text-ivory-50 transition-colors"
                >
                  <span className="relative">
                    Explore The 30 Disciplines
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne-400 group-hover:w-full transition-all duration-300" />
                  </span>
                  <div className="w-7 h-7 rounded-full border border-champagne-500/40 flex items-center justify-center group-hover:border-champagne-300 group-hover:bg-champagne-500/10 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography & Overlapping Detail Card */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <div ref={imageWrapperRef} className="relative z-10">
              {/* Primary Architectural Image */}
              <div className="relative rounded-3xl overflow-hidden border border-champagne-500/20 shadow-2xl aspect-[4/5] bg-obsidian-900 group">
                <Image
                  src={theStudio.featuredImage}
                  alt="Bhanu's The Hair Studio Palsikar Interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.92] contrast-[1.04] transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-6 left-6 text-[10px] tracking-widest uppercase px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 font-mono">
                  FIG 01 // INTERIOR SANCTUARY
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel border border-champagne-500/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] tracking-widest uppercase text-champagne-400 font-mono">
                      INDORE SANCTUARY
                    </div>
                    <div className="text-sm font-serif text-ivory-100 font-light">
                      Palsikar Colony Atelier Sanctuary
                    </div>
                  </div>
                  <span className="text-xs font-mono text-champagne-300 px-3 py-1 rounded-full bg-champagne-400/10 border border-champagne-400/30">
                    OPEN TILL 10 PM
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Architectural Vignette (Breaks AI Template Symmetry) */}
              <div className="hidden sm:flex absolute -bottom-8 -left-8 lg:-bottom-10 lg:-left-12 z-20 w-64 rounded-2xl glass-card border border-champagne-400/40 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex-col gap-2.5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-champagne-400 uppercase">
                  <span>DISCIPLINE PRECISION</span>
                  <span>440C HITACHI</span>
                </div>
                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-champagne-500/20">
                  <Image
                    src="/images/gallery/mens-fade.jpg"
                    alt="Precision Master Craftsmanship"
                    fill
                    className="object-cover filter contrast-[1.08] brightness-[0.88]"
                  />
                  <div className="absolute inset-0 bg-champagne-950/20 mix-blend-color" />
                </div>
                <div className="text-[11px] font-serif text-ivory-100 font-light leading-snug">
                  Artisanal taper & organic texture sculpting in Palsikar.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
