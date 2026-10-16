"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SALON_CONFIG } from "@/config/salon.config";
import { Sparkles, ChevronDown, CheckCircle2, Feather, Droplets } from "lucide-react";

export function SkincareSection() {
  const { skincare, contact } = SALON_CONFIG;
  const [expandedIndex, setExpandedIndex] = useState<number>(1); // Default open second (Facial)

  const activeTreatment = skincare.services[expandedIndex];

  return (
    <section
      id="skincare"
      className="relative z-10 w-full bg-obsidian-950/20 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Calm ambient background blur */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-champagne-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-500/80 inline-block" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                {skincare.sectionNum} / {skincare.sectionLabel}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.96]">
              {skincare.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {skincare.headingLine2}
              </span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-muted max-w-md font-light leading-relaxed">
            {skincare.description}
          </p>
        </div>

        {/* Split Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Calming Texture & Botanical Treatment Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-champagne-500/20 aspect-[4/5] bg-obsidian-900 group shadow-2xl">
              <Image
                src={activeTreatment.image}
                alt={activeTreatment.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[0.88] contrast-[1.06] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent pointer-events-none" />

              {/* Floating Treatment Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel border border-champagne-500/30 space-y-2 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase text-champagne-400 font-mono">
                    RITUAL {activeTreatment.num}
                  </span>
                  <Droplets className="w-4 h-4 text-champagne-400" />
                </div>
                <h4 className="font-serif text-2xl text-ivory-50">
                  {activeTreatment.name}
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {activeTreatment.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Expandable Treatment Details & Protocols */}
          <div className="lg:col-span-7 space-y-4">
            {skincare.services.map((svc, idx) => {
              const isOpen = expandedIndex === idx;

              return (
                <div
                  key={svc.id}
                  className={`rounded-2xl transition-all duration-500 border overflow-hidden ${
                    isOpen
                      ? "glass-card border-champagne-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                      : "bg-surface/50 border-champagne-500/10 hover:border-champagne-500/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isOpen ? -1 : idx)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-champagne-400 font-semibold">
                        {svc.num}
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl text-ivory-50">
                          {svc.name}
                        </h3>
                        <p className="text-xs text-muted font-light mt-0.5">
                          {svc.tagline}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border border-champagne-500/30 flex items-center justify-center text-champagne-300 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-champagne-400 text-obsidian-950" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 space-y-4 border-t border-champagne-500/10 pt-4 animate-in fade-in duration-300">
                      <p className="text-xs sm:text-sm text-ivory-200/90 font-light leading-relaxed">
                        {svc.description}
                      </p>

                      {/* Treatment Protocol */}
                      <div className="p-4 rounded-xl glass-panel border border-champagne-500/20 space-y-1.5">
                        <div className="text-[10px] tracking-ultra uppercase text-champagne-400 font-medium">
                          Clinical Dermal Protocol
                        </div>
                        <div className="text-xs text-muted font-light">
                          {svc.protocol}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-muted tracking-wider">
                          * Personalized botanical sensitivity patch testing included
                        </span>

                        <a
                          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                            `Hello Bhanu Hair Studio, I would like to consult and book for ${svc.name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-all"
                        >
                          Reserve Ritual
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
