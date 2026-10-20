"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";

export function TheStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { theStudio } = SALON_CONFIG;

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 1. Horizontal hairline draw
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "luxe",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Parallax for architectural imagery
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { y: 35 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 3. Staggered reveal for headline lines
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "luxe",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 4. Staggered card reveals
      gsap.fromTo(
        ".studio-standard-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".studio-standards-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      data-stage="studio"
      aria-labelledby="studio-heading"
      className="relative z-10 w-full bg-obsidian-950/60 text-ivory-200 py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden border-t border-champagne-500/15"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-20 sm:space-y-28">
        {/* Section Landmark Header */}
        <div className="flex items-center justify-between border-b border-champagne-500/15 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
            <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-mono font-medium">
              01 / THE ATELIER & PHILOSOPHY
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-champagne-400/90 tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-champagne-400" />
            <span>PALSIKAR COLONY · INDORE</span>
          </div>
        </div>

        {/* Minimalist Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Pure Serif Typography & Philosophy */}
          <div className="lg:col-span-6 space-y-8">
            <h2
              id="studio-heading"
              ref={headlineRef}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[0.98]"
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

            {/* Delicate Gold Hairline */}
            <div
              ref={dividerRef}
              className="w-24 h-[1px] bg-gradient-to-r from-champagne-400 to-transparent"
            />

            <div ref={contentRef} className="space-y-6 max-w-xl">
              <p className="text-base sm:text-lg text-ivory-100/90 font-light leading-relaxed">
                Indore&apos;s premier unisex hair and beauty sanctuary on Manik Bagh Road, Palsikar Colony. We unite anatomical precision haircutting, customized balayage toning, and restorative Japanese head spa therapy.
              </p>

              {/* Master Stylist's Minimalist Quote */}
              <div className="p-6 rounded-2xl bg-surface/50 border-l border-champagne-400 border-t border-r border-b border-white/5 space-y-3 backdrop-blur-md">
                <p className="font-serif italic text-base sm:text-lg text-champagne-200/95 leading-relaxed">
                  &ldquo;Precision cutting is not merely subtracting length; it is sculpting light, anatomy, and personality into organic harmony.&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <div className="font-medium text-xs tracking-wider uppercase text-ivory-100 font-sans">
                      Bhanu
                    </div>
                    <div className="text-[10px] tracking-widest text-muted font-mono uppercase">
                      Master Stylist & Atelier Founder · Indore
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-champagne-400/40 flex items-center justify-center text-[10px] font-serif italic text-champagne-400">
                    B
                  </div>
                </div>
              </div>

              {/* Minimalist Tabular Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-champagne-500/15">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-champagne-300 font-light tabular-nums">10 PM</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted mt-1">Open Daily</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-champagne-300 font-light tabular-nums">30+</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted mt-1">Unisex Disciplines</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-champagne-300 font-light tabular-nums">4.9 ★</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted mt-1">500+ Reviews</div>
                </div>
              </div>

              {/* Minimalist Explore Action */}
              <div className="pt-2">
                <a
                  href="#services"
                  data-cursor="Rituals"
                  className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-champagne-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="relative">
                    Explore Atelier Disciplines
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne-400 group-hover:w-full transition-all duration-300" />
                  </span>
                  <div className="w-7 h-7 rounded-full border border-champagne-500/40 flex items-center justify-center group-hover:border-champagne-300 group-hover:bg-champagne-500/10 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography with Refined Frame */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div ref={imageWrapperRef} className="relative z-10">
              <div
                data-cursor="Atelier"
                className="relative rounded-3xl overflow-hidden border border-champagne-500/20 shadow-2xl aspect-[4/5] bg-obsidian-900 group"
              >
                <Image
                  src={theStudio.featuredImage}
                  alt="Bhanu's The Hair Studio Atelier Interior, Palsikar Colony, Indore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.9] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel border border-champagne-500/25 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-widest text-champagne-300 font-mono">
                      FLAGSHIP SANCTUARY
                    </div>
                    <div className="font-serif text-sm text-ivory-50 font-light">
                      Manik Bagh Road, Palsikar Colony, Indore
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-champagne-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Discipline & Craft Standards Grid */}
        <div className="pt-12 border-t border-champagne-500/15 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-champagne-400">
                DISCIPLINE & METALLURGY
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-ivory-50 font-light tracking-tight">
                Craft, Considered.
              </h3>
            </div>
            <p className="text-xs text-muted max-w-md font-light leading-relaxed">
              Every salon session at Bhanu&apos;s Palsikar Atelier combines calibrated surgical steel, cranial diagnostics, and couture hair smoothing chemistry.
            </p>
          </div>

          <div className="studio-standards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                num: "01",
                label: "STEEL TOOLING",
                metric: "440C",
                title: "Japanese Convex Shears",
                desc: "Hitachi 440C convex blades forged for micro-point cutting, scissor-over-comb, and zero split ends.",
              },
              {
                num: "02",
                label: "ARCHITECTURE",
                metric: "Biometric",
                title: "Cranial Bone Mapping",
                desc: "Every cut is calibrated against cranial topography, parietal ridge, and natural hair whorl flow.",
              },
              {
                num: "03",
                label: "CHEMISTRY",
                metric: "Couture",
                title: "French Gloss & Keratin",
                desc: "Multi-dimensional balayage, nano-keratin infusions, and ammonia-free French toners for radiant shine.",
              },
              {
                num: "04",
                label: "SERENITY",
                metric: "Quietude",
                title: "Head Spa Suites",
                desc: "Acoustically softened treatment suites with ultrasonic micro-mist therapy for deep scalp wellness.",
              },
            ].map((std) => (
              <div
                key={std.num}
                className="studio-standard-item p-6 rounded-2xl bg-surface/40 border border-champagne-500/15 hover:border-champagne-400/40 transition-all duration-300 space-y-3 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-champagne-400">
                  <span>{std.num} / {std.label}</span>
                </div>
                <div className="font-serif text-3xl text-champagne-300 font-light">
                  {std.metric}
                </div>
                <div className="text-xs uppercase tracking-wider font-medium text-ivory-100 font-sans">
                  {std.title}
                </div>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TheStudio;
