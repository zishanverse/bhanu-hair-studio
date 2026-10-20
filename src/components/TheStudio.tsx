"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
          { y: 30 },
          {
            y: -25,
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

      // Reposé-Inspired Atelier Standards Grid Reveal
      gsap.fromTo(
        ".atelier-standard-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".atelier-standards-grid",
            start: "top 80%",
          },
        }
      );

      // Reposé-Inspired Urban Reach Commute Tiles Reveal
      gsap.fromTo(
        ".urban-reach-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".urban-reach-grid",
            start: "top 85%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative z-10 w-full bg-obsidian-950/20 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden border-t border-champagne-500/15"
    >
      {/* Visual Bridge & Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[250px] bg-champagne-500/5 blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-champagne-500/15 pb-6 mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
            <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-medium">
              01 / THE ATELIER
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-champagne-400/90 tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-champagne-400" />
            <span>PALSIKAR COLONY · INDORE</span>
          </div>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Typography & Philosophy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[1.0] sm:leading-[0.96]"
            >
              <div className="overflow-hidden">
                <span>{theStudio.headingLine1}</span>
              </div>
              <div className="overflow-hidden">
                <span className="italic font-normal text-champagne-400 font-serif">
                  {theStudio.headingLine2}
                </span>
              </div>
            </h2>

            {/* Expanding Fine Divider */}
            <div
              ref={dividerRef}
              className="w-24 h-[1px] bg-gradient-to-r from-champagne-400 to-transparent"
            />

            <div ref={contentRef} className="space-y-6 max-w-xl">
              <p className="text-base md:text-lg text-ivory-100 font-light leading-relaxed">
                Precision cuts, exceptional styling, and personalized care at Bhanu&apos;s The Hair Studio. Discover an intentional space where individuality inspires every detail.
              </p>

              {/* Master Stylist's Manifesto Blockquote */}
              <div className="p-6 rounded-2xl glass-card border-l-2 border-champagne-400 border-t border-r border-b border-champagne-500/15 space-y-3 relative overflow-hidden">
                <p className="font-serif italic text-base sm:text-lg text-champagne-200 leading-relaxed relative z-10">
                  &ldquo;Precision cutting is not merely subtracting length; it is sculpting light, anatomy, and personality into organic harmony.&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-champagne-500/10">
                  <div>
                    <div className="font-medium text-xs tracking-wider uppercase text-ivory-100 font-sans">
                      Bhanu
                    </div>
                    <div className="text-[10px] tracking-widest text-muted font-mono uppercase">
                      Master Stylist & Atelier Founder
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-champagne-400/50 flex items-center justify-center text-[10px] font-serif italic text-champagne-400">
                    B
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-champagne-500/15">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-champagne-300 font-light">10 PM</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted">Open Daily</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-champagne-300 font-light">30+</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted">Unisex Rituals</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-champagne-300 font-light">4.9 ★</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted">Client Rating</div>
                </div>
              </div>

              {/* Explore Link */}
              <div className="pt-2">
                <a
                  href="#services"
                  data-cursor="All Rituals"
                  className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-champagne-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    Explore All Rituals
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne-400 group-hover:w-full transition-all duration-300" />
                  </span>
                  <div className="w-7 h-7 rounded-full border border-champagne-500/40 flex items-center justify-center group-hover:border-champagne-300 group-hover:bg-champagne-500/10 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <div ref={imageWrapperRef} className="relative z-10">
              <div
                data-cursor="Sanctuary"
                className="relative rounded-3xl overflow-hidden border border-champagne-500/20 shadow-2xl aspect-[4/5] bg-obsidian-900 group"
              >
                <Image
                  src={theStudio.featuredImage}
                  alt="Bhanu's The Hair Studio Palsikar Interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.92] contrast-[1.04] transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel border border-champagne-500/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs uppercase tracking-widest text-champagne-300 font-mono">
                      SANCTUARY
                    </div>
                    <div className="font-serif text-base text-ivory-50 font-light">
                      Manik Bagh Road, Palsikar Colony
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-champagne-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ATELIER CRAFT STANDARDS (Inspired by Reposé Living Essentials) */}
        <div className="pt-16 sm:pt-20 border-t border-champagne-500/15 mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-champagne-400">
                DISCIPLINE & MATERIAL CRAFT
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-ivory-50 font-light tracking-tight">
                Craft, Considered.
              </h3>
            </div>
            <p className="text-xs text-muted max-w-md font-light leading-relaxed">
              Every appointment at Bhanu&apos;s Palsikar Atelier is engineered with surgical toolsets, anatomical diagnostics, and couture chemistry.
            </p>
          </div>

          <div className="atelier-standards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="atelier-standard-card p-6 rounded-2xl glass-card border border-champagne-500/15 space-y-4 hover:border-champagne-400/40 transition-all duration-300 will-change-transform">
              <span className="text-[10px] font-mono text-champagne-400/80 uppercase tracking-widest block">
                01 / STEEL TOOLING
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-champagne-300 font-light">
                440C
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-ivory-100 font-sans">
                Japanese Convex Shears
              </div>
              <p className="text-xs text-muted font-light leading-relaxed">
                Hand-honed convex blades forged for micro-point cutting, scissor-over-comb, and zero follicle split ends.
              </p>
            </div>

            <div className="atelier-standard-card p-6 rounded-2xl glass-card border border-champagne-500/15 space-y-4 hover:border-champagne-400/40 transition-all duration-300 will-change-transform">
              <span className="text-[10px] font-mono text-champagne-400/80 uppercase tracking-widest block">
                02 / ARCHITECTURE
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-champagne-300 font-light">
                Anatomical
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-ivory-100 font-sans">
                Follicle & Bone Mapping
              </div>
              <p className="text-xs text-muted font-light leading-relaxed">
                Every fade, bob, and layer is mapped to head shape, parietal ridge, and growth direction for effortless growth.
              </p>
            </div>

            <div className="atelier-standard-card p-6 rounded-2xl glass-card border border-champagne-500/15 space-y-4 hover:border-champagne-400/40 transition-all duration-300 will-change-transform">
              <span className="text-[10px] font-mono text-champagne-400/80 uppercase tracking-widest block">
                03 / COLOR FORMULA
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-champagne-300 font-light">
                Bespoke
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-ivory-100 font-sans">
                Ammonia-Free French Gloss
              </div>
              <p className="text-xs text-muted font-light leading-relaxed">
                Dimensional balayage, babylights, and custom toners formulated to enrich Indian hair textures with radiant shine.
              </p>
            </div>

            <div className="atelier-standard-card p-6 rounded-2xl glass-card border border-champagne-500/15 space-y-4 hover:border-champagne-400/40 transition-all duration-300 will-change-transform">
              <span className="text-[10px] font-mono text-champagne-400/80 uppercase tracking-widest block">
                04 / PRIVACY & RITUAL
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-champagne-300 font-light">
                Quietude
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-ivory-100 font-sans">
                Head Spa & VIP Suites
              </div>
              <p className="text-xs text-muted font-light leading-relaxed">
                Dedicated sound-softened suites with warm ultrasonic mist therapy for restorative scalp care and bridal preparations.
              </p>
            </div>
          </div>
        </div>

        {/* 3. URBAN CONNECTEDNESS & COMMUTE (Inspired by Reposé Connectedness Map) */}
        <div className="pt-16 sm:pt-20 border-t border-champagne-500/15 mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-champagne-400">
                LOCATION & URBAN REACH · INDORE
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-ivory-50 font-light tracking-tight">
                Your sanctuary. Within reach.
              </h3>
            </div>
            <div className="text-xs text-muted font-mono tracking-widest uppercase">
              Shop No. 4, Sewak Avenue, Manik Bagh Rd, Palsikar
            </div>
          </div>

          <div className="urban-reach-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="urban-reach-card p-5 rounded-2xl glass-card border border-champagne-500/15 will-change-transform hover:border-champagne-400/40 transition-all">
              <div className="font-serif text-3xl sm:text-4xl text-ivory-50 font-light">
                05 <span className="text-xs font-mono text-champagne-400 uppercase">MIN</span>
              </div>
              <div className="text-xs font-medium text-ivory-100 uppercase tracking-wider font-sans mt-2">
                Tower Square
              </div>
              <div className="text-[10px] text-muted font-mono uppercase tracking-widest mt-0.5">
                Central Arterial Junction
              </div>
            </div>

            <div className="urban-reach-card p-5 rounded-2xl glass-card border border-champagne-500/15 will-change-transform hover:border-champagne-400/40 transition-all">
              <div className="font-serif text-3xl sm:text-4xl text-ivory-50 font-light">
                08 <span className="text-xs font-mono text-champagne-400 uppercase">MIN</span>
              </div>
              <div className="text-xs font-medium text-ivory-100 uppercase tracking-wider font-sans mt-2">
                Chhappan Dukan
              </div>
              <div className="text-[10px] text-muted font-mono uppercase tracking-widest mt-0.5">
                Central City Landmark
              </div>
            </div>

            <div className="urban-reach-card p-5 rounded-2xl glass-card border border-champagne-500/15 will-change-transform hover:border-champagne-400/40 transition-all">
              <div className="font-serif text-3xl sm:text-4xl text-ivory-50 font-light">
                15 <span className="text-xs font-mono text-champagne-400 uppercase">MIN</span>
              </div>
              <div className="text-xs font-medium text-ivory-100 uppercase tracking-wider font-sans mt-2">
                Vijay Nagar
              </div>
              <div className="text-[10px] text-muted font-mono uppercase tracking-widest mt-0.5">
                AB Road Luxury Corridor
              </div>
            </div>

            <div className="urban-reach-card p-5 rounded-2xl glass-card border border-champagne-500/15 will-change-transform hover:border-champagne-400/40 transition-all">
              <div className="font-serif text-3xl sm:text-4xl text-ivory-50 font-light">
                25 <span className="text-xs font-mono text-champagne-400 uppercase">MIN</span>
              </div>
              <div className="text-xs font-medium text-ivory-100 uppercase tracking-wider font-sans mt-2">
                Devi Ahilyabai Airport
              </div>
              <div className="text-[10px] text-muted font-mono uppercase tracking-widest mt-0.5">
                Domestic & Regional Hub
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
