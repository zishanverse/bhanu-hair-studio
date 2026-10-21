"use client";

import React, { useState } from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { MapPin, Phone, Clock, ArrowUpRight, Navigation, Sparkles } from "lucide-react";

export function OutletsSection() {
  const { outlets } = SALON_CONFIG;
  const [activeOutletId, setActiveOutletId] = useState<string>(outlets[0]?.id || "palsikar");

  const activeOutlet = outlets.find((o) => o.id === activeOutletId) || outlets[0];

  return (
    <section
      id="studios"
      className="relative w-full bg-obsidian-950 text-ivory-50 py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Decorative Gold Glow Veil */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-champagne-500/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-champagne-500/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-sans font-medium">
                3 LOCATIONS ACROSS INDORE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ivory-50">
              OUR ATELIER <span className="italic text-champagne-300 font-serif">STUDIOS.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-ivory-200/80 font-light max-w-md leading-relaxed">
            Choose your preferred studio in Indore. Every location provides identical unisex standards, Master stylists, and Japanese shear precision.
          </p>
        </div>

        {/* 3-Column Studio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {outlets.map((outlet, idx) => {
            const isFeatured = idx === 0; // Palsikar Colony is the founding atelier
            return (
              <div
                key={outlet.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 glass-card group hover:border-champagne-400/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.85)] ${
                  isFeatured
                    ? "border-champagne-500/35 bg-gradient-to-b from-surface/90 to-obsidian-900/95"
                    : "border-champagne-500/20 bg-surface/60"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 pb-5 border-b border-champagne-500/15">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-950/80 border border-champagne-500/30 text-[10px] tracking-wider uppercase text-champagne-300 font-sans">
                    <Sparkles className="w-3 h-3 text-champagne-400" />
                    <span>{idx === 0 ? "Flagship Atelier" : `Studio 0${idx + 1}`}</span>
                  </div>

                  <span className="text-xs uppercase font-mono tracking-widest text-champagne-400/70">
                    {outlet.area}
                  </span>
                </div>

                {/* Studio Details */}
                <div className="py-6 space-y-4">
                  <h3 className="font-serif text-2xl text-ivory-50 group-hover:text-champagne-300 transition-colors">
                    {outlet.name}
                  </h3>

                  <div className="space-y-3 text-xs text-ivory-200/80 font-light">
                    {/* Address with Landmark */}
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <span>{outlet.address}</span>
                        {outlet.landmark && (
                          <span className="block text-[11px] text-muted mt-0.5">
                            Landmark: {outlet.landmark}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300/90 font-medium">{outlet.hours}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-champagne-400 shrink-0" />
                      <a
                        href={`tel:${outlet.phone}`}
                        className="hover:text-champagne-300 transition-colors font-mono"
                      >
                        {outlet.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-champagne-500/15 flex items-center gap-3">
                  <a
                    href={outlet.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full text-xs uppercase tracking-wider font-medium text-ivory-100 bg-obsidian-950/80 border border-champagne-500/30 hover:border-champagne-400 hover:text-white transition-all min-h-[44px]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/60" />
                  </a>

                  <a
                    href="#book"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full text-xs uppercase tracking-wider font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 to-champagne-400 hover:shadow-[0_0_20px_rgba(200,162,82,0.5)] transition-all min-h-[44px]"
                  >
                    <span>Reserve</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OutletsSection;
