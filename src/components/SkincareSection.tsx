"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import { stageState } from "@/lib/stageState";
import { ChevronDown, Droplets } from "lucide-react";

export function SkincareSection() {
  const { skincare, contact } = SALON_CONFIG;
  const [expandedIndex, setExpandedIndex] = useState<number>(1); // Default open second (Facials)

  const sectionRef = useRef<HTMLElement>(null);
  const sanctuaryBoxRef = useRef<HTMLDivElement>(null);

  const activeTreatment = skincare.services[expandedIndex] || skincare.services[0];

  // Update 3D stage pearl tint
  useEffect(() => {
    stageState.pearl.tint = expandedIndex === 1 ? "#FFF5EB" : "#F4F0E6";
  }, [expandedIndex]);

  // Ivory Pavilion Entrance Animation
  useEffect(() => {
    if (typeof window === "undefined" || !sanctuaryBoxRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Scale and soft bloom expansion for the ivory pavilion
      gsap.fromTo(
        sanctuaryBoxRef.current,
        { scale: 0.94, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "luxe",
          scrollTrigger: {
            trigger: sanctuaryBoxRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      // Staggered reveal for right-side ritual cards
      gsap.fromTo(
        ".sanctuary-card-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sanctuary-card-list",
            start: "top 75%",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skincare"
      data-stage="skincare"
      className="relative z-10 w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Calm ambient background blur */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-champagne-500/10 blur-[180px] pointer-events-none" />

      {/* Ivory Alabaster Sanctuary Pavilion */}
      <div
        ref={sanctuaryBoxRef}
        className="max-w-7xl mx-auto rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-[#F8F5EE] via-[#F4F0E6] to-[#EBE6D8] text-[#1B1914] p-6 sm:p-10 md:p-14 lg:p-16 border border-champagne-400/40 shadow-[0_40px_120px_rgba(0,0,0,0.85)] relative overflow-hidden space-y-12 sm:space-y-16 will-change-transform"
      >
        {/* Subtle Decorative Botanical Watermark */}
        <div className="absolute -top-12 -right-12 w-64 h-64 opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1B1914" strokeWidth="2" className="w-full h-full">
            <path d="M100 10 C 130 60, 170 80, 190 100 C 140 120, 110 160, 100 190 C 80 140, 50 120, 10 100 C 60 80, 80 40, 100 10 Z" />
            <path d="M100 40 C 120 70, 150 90, 170 100 C 130 110, 110 140, 100 160 C 90 130, 70 110, 30 100 C 70 90, 80 60, 100 40 Z" />
          </svg>
        </div>

        {/* Section Header with High Contrast Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 relative z-10 border-b border-[#1B1914]/10 pb-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#967024] inline-block" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-[#2B3521] font-mono font-bold">
                {skincare.sectionNum} / RESTORATIVE SANCTUARY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#110F0C] tracking-tight leading-[1.02] sm:leading-[0.94]">
              {skincare.headingLine1} <br />
              <span className="italic font-normal text-[#7A5B20] font-serif">
                {skincare.headingLine2}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#2E2A24] max-w-md font-light leading-relaxed">
            {skincare.description}
          </p>
        </div>

        {/* Split Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
          {/* Left Column: Semicircular Arched Imagery Frame with Smooth Crossfade */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28">
            <div className="relative rounded-t-[120px] sm:rounded-t-[150px] rounded-b-3xl overflow-hidden border border-[#C8A252]/40 aspect-[3.8/5] bg-[#1E1C17] shadow-2xl">
              {skincare.services.map((svc, i) => (
                <div
                  key={svc.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    (expandedIndex >= 0 ? expandedIndex : 0) === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={svc.image}
                    alt={svc.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center filter brightness-[0.92] contrast-[1.04]"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1914]/90 via-[#1B1914]/30 to-transparent pointer-events-none z-20" />

              {/* Floating Treatment Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C8A252]/30 space-y-2 text-[#1B1914] shadow-xl z-30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase text-[#7A5B20] font-mono font-bold">
                    RITUAL {activeTreatment.num}
                  </span>
                  <Droplets className="w-4 h-4 text-[#7A5B20]" />
                </div>
                <h4 className="font-serif text-2xl text-[#110F0C]">
                  {activeTreatment.name}
                </h4>
                <p className="text-xs text-[#3E3A32] font-light leading-relaxed">
                  {activeTreatment.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Height Accordion & Protocols */}
          <div className="sanctuary-card-list lg:col-span-7 space-y-3.5">
            {skincare.services.map((svc, idx) => {
              const isOpen = expandedIndex === idx;

              return (
                <div
                  key={svc.id}
                  className={`sanctuary-card-item rounded-2xl transition-all duration-500 border overflow-hidden ${
                    isOpen
                      ? "bg-white/95 border-[#C8A252] shadow-[0_15px_35px_rgba(40,36,28,0.12)]"
                      : "bg-white/60 border-[#C8A252]/20 hover:border-[#C8A252]/50 hover:bg-white/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#7A5B20] font-bold">
                        {svc.num}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#110F0C]">
                          {svc.name}
                        </h3>
                        <p className="text-xs text-[#2B3521] font-semibold mt-0.5">
                          {svc.tagline}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border border-[#C8A252]/40 flex items-center justify-center text-[#7A5B20] transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#7A5B20] text-white" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth Fluid Accordion Height via CSS Grid Rows */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 space-y-4 border-t border-[#C8A252]/15 pt-4">
                        <p className="text-xs sm:text-sm text-[#2E2A24] font-normal leading-relaxed">
                          {svc.description}
                        </p>

                        {/* Clinical Protocol Details */}
                        <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C8A252]/30 space-y-1.5">
                          <div className="text-[10px] tracking-ultra uppercase text-[#7A5B20] font-mono font-bold">
                            Clinical Dermal & Scalp Protocol
                          </div>
                          <div className="text-xs text-[#2E2A24] font-light leading-relaxed">
                            {svc.protocol}
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-[11px] text-[#484338] tracking-wide font-medium">
                            Personalized botanical sensitivity testing & scalp camera mapping included.
                          </span>

                          <a
                            href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                              `Hello Bhanu's The Hair Studio Palsikar, I would like to consult and book for: ${svc.name}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="WhatsApp"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#7A5B20] hover:bg-[#634918] transition-all shadow-md shrink-0 cursor-pointer"
                          >
                            Reserve Ritual
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkincareSection;
