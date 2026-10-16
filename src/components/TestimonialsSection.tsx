"use client";

import React, { useState, useEffect } from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const { testimonials } = SALON_CONFIG;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.items.length]);

  const current = testimonials.items[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full bg-obsidian-950/20 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-champagne-500/5 blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-500/80 inline-block" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                {testimonials.sectionNum} / {testimonials.sectionLabel}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.96]">
              {testimonials.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {testimonials.headingLine2}
              </span>
            </h2>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-muted font-mono block">
              INDORE GUEST EXPERIENCES
            </span>
            <span className="text-xs text-champagne-400 font-serif">
              Curated Atelier Reviews
            </span>
          </div>
        </div>

        {/* Testimonial Quote Display */}
        <div className="rounded-3xl glass-card border border-champagne-500/20 p-6 sm:p-8 md:p-16 relative space-y-8 sm:space-y-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Gold Quotation Mark Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-champagne-500/30 flex items-center justify-center text-champagne-400 bg-surface">
            <Quote className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
          </div>

          {/* Large Editorial Serif Quote */}
          <div className="min-h-[120px] sm:min-h-[140px] flex items-center">
            <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-ivory-50 leading-[1.3] italic">
              “{current.quote}”
            </blockquote>
          </div>

          {/* Client Details & Star Rating */}
          <div className="pt-6 border-t border-champagne-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="font-serif text-xl text-champagne-200">
                {current.clientName}
              </div>
              <div className="text-xs text-muted font-light tracking-wide">
                {current.clientRole} · <span className="text-champagne-400/90">{current.service}</span>
              </div>
            </div>

            {/* Rating Stars & Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-champagne-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne-400" />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev > 0 ? prev - 1 : testimonials.items.length - 1
                    )
                  }
                  className="p-2.5 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/20 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % testimonials.items.length)
                  }
                  className="p-2.5 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/20 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Progress Indicators */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i ? "w-8 bg-champagne-400" : "w-2 bg-surface hover:bg-muted"
              }`}
              aria-label={`Jump to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
