"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SALON_CONFIG, ServiceCategory } from "@/config/salon.config";
import { ArrowUpRight, Scissors, X, CheckCircle2, Clock } from "lucide-react";

export function ServicesSection() {
  const { servicesCatalog, contact } = SALON_CONFIG;
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-obsidian-950 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-500/80 inline-block" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                {servicesCatalog.sectionNum} / {servicesCatalog.sectionLabel}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.96]">
              {servicesCatalog.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {servicesCatalog.headingLine2}
              </span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-muted max-w-md font-light leading-relaxed">
            {servicesCatalog.description}
          </p>
        </div>

        {/* Asymmetric Editorial Grid (Not 4 identical cards) */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {servicesCatalog.categories.map((cat, idx) => {
            // Asymmetric layout spans
            const isSpan7 = idx === 0 || idx === 3;
            const colSpan = isSpan7 ? "md:col-span-7" : "md:col-span-5";

            return (
              <div
                key={cat.id}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.title} services`}
                onClick={() => setSelectedCategory(cat)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCategory(cat);
                  }
                }}
                className={`group relative rounded-3xl overflow-hidden glass-card border border-champagne-500/15 hover:border-champagne-400/50 transition-all duration-700 cursor-pointer ${colSpan} min-h-[400px] sm:min-h-[460px] md:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 md:p-10 transform hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-1 focus:ring-champagne-400`}
              >
                {/* Background Image with Zoom & Dark Vignette */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-obsidian-900">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-center filter brightness-[0.78] contrast-[1.12] transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-obsidian-950/30" />
                  <div className="absolute inset-0 bg-obsidian-950/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Card Top: Number & Eyebrow */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs tracking-widest text-champagne-400 font-semibold">
                      {cat.num}
                    </span>
                    <span className="w-4 h-[1px] bg-champagne-500/50" />
                    <span className="text-[10px] tracking-ultra uppercase text-champagne-300/90 font-medium">
                      {cat.eyebrow}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-champagne-300 group-hover:bg-champagne-400 group-hover:text-obsidian-950 transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Bottom: Content & Service List Summary */}
                <div className="relative z-10 space-y-4 pt-20">
                  <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50 group-hover:text-champagne-100 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory-200/80 font-light leading-relaxed max-w-lg">
                    {cat.description}
                  </p>

                  {/* Service Mini Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.services.map((s) => (
                      <span
                        key={s.id}
                        className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full glass-pill border border-champagne-500/20 text-champagne-200 font-sans"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-400 font-medium group-hover:text-champagne-300">
                    <span>Explore Treatment Rituals</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Category Details Modal / Drawer */}
      {selectedCategory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-obsidian-950/80 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl glass-card border border-champagne-500/30 p-6 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-8 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-champagne-500/20 pb-6">
              <div className="space-y-1">
                <div className="text-[10px] tracking-ultra uppercase text-champagne-400 font-medium">
                  {selectedCategory.num} / {selectedCategory.eyebrow}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-ivory-50">
                  {selectedCategory.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/20 transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Services Detailed List */}
            <div className="space-y-4">
              {selectedCategory.services.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl glass-panel border border-champagne-500/15 hover:border-champagne-400/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Scissors className="w-3.5 h-3.5 text-champagne-400" />
                      <h4 className="font-serif text-xl text-ivory-100">{item.name}</h4>
                    </div>
                    {item.duration && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-champagne-400 tracking-wider">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted leading-relaxed font-light pl-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer / Direct Booking CTA */}
            <div className="pt-4 border-t border-champagne-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-muted font-light">
                * Individual consultation conducted prior to service execution.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Bhanu Hair Studio, I would like to book an appointment for ${selectedCategory.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_25px_rgba(197,164,119,0.5)] transition-all text-center"
                >
                  Reserve Session
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
