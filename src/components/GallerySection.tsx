"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SALON_CONFIG, GalleryItem } from "@/config/salon.config";
import { X, ZoomIn, ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";

export function GallerySection() {
  const { gallery } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // for before/after comparison slider

  const categories = [
    { id: "all", label: "All Looks" },
    { id: "mens", label: "Men's Hair" },
    { id: "womens", label: "Women's Hair" },
    { id: "colour", label: "Hair Colour" },
    { id: "treatments", label: "Treatments" },
  ];

  const filteredItems =
    activeTab === "all"
      ? gallery.items
      : gallery.items.filter((item) => item.category === activeTab);

  const selectedItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="relative z-10 w-full bg-obsidian-950/20 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-500/80 inline-block" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                {gallery.sectionNum} / {gallery.sectionLabel}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.96]">
              {gallery.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {gallery.headingLine2}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-muted max-w-md font-light leading-relaxed">
            {gallery.description}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 border-b border-champagne-500/15 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveTab(cat.id);
                setActiveLightboxIndex(null);
              }}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-champagne-400 text-obsidian-950 shadow-[0_0_20px_rgba(197,164,119,0.35)]"
                  : "text-muted hover:text-ivory-100 hover:bg-surface"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const isTall = item.aspect === "tall";
            const isWide = item.aspect === "wide";

            return (
              <div
                key={item.id}
                tabIndex={0}
                role="button"
                data-cursor="INSPECT"
                aria-label={`View look: ${item.title}`}
                onClick={() => setActiveLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveLightboxIndex(index);
                  }
                }}
                className={`group relative rounded-3xl overflow-hidden glass-card border border-champagne-500/15 hover:border-champagne-400/50 transition-all duration-700 cursor-pointer ${
                  isWide ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
                } flex flex-col justify-end p-6 md:p-8 transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-1 focus:ring-champagne-400`}
              >
                {/* Background Image with Unified Champagne Tone Grading */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.85] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Film Grade Duotone Overlay to eliminate stock photo temperature clash */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-champagne-900/10 pointer-events-none" />

                {/* Top Corner Badge & Editorial Plate Number */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-ultra uppercase px-3 py-1 rounded-full glass-pill border border-champagne-500/25 text-champagne-300 font-mono">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-champagne-400/70 uppercase hidden sm:inline">
                      PLATE 0{index + 1}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-champagne-300 group-hover:bg-champagne-400 group-hover:text-obsidian-950 transition-all">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory-50 group-hover:text-champagne-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed max-w-md">
                    {item.description}
                  </p>
                  {item.transformation && (
                    <div className="pt-2 flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-champagne-400 font-mono">
                      <Sparkles className="w-3 h-3" />
                      <span>Before / After Transformation Available</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-obsidian-950/90 backdrop-blur-2xl animate-in fade-in duration-300"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl glass-card border border-champagne-500/30 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full glass-panel border border-champagne-500/40 text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/20 transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Interactive Media Area (Image or Before/After slider) */}
            <div className="lg:w-7/12 relative min-h-[350px] lg:min-h-[550px] bg-obsidian-900 overflow-hidden select-none">
              {selectedItem.transformation ? (
                /* Interactive Before & After Comparison Slider */
                <div
                  className="relative w-full h-full min-h-[400px] cursor-ew-resize group select-none touch-none"
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) { // Left mouse button held down (drag)
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                      setSliderPosition((x / rect.width) * 100);
                    }
                  }}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }}
                >
                  {/* After Image (Full width background) */}
                  <Image
                    src={selectedItem.transformation.afterImage}
                    alt={`${selectedItem.title} After`}
                    fill
                    draggable={false}
                    className="object-cover object-center pointer-events-none select-none"
                  />
                  <div className="absolute top-4 right-4 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 font-mono">
                    AFTER
                  </div>

                  {/* Before Image (Clean uncompressed clip-path overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <Image
                      src={selectedItem.transformation.beforeImage}
                      alt={`${selectedItem.title} Before`}
                      fill
                      draggable={false}
                      className="object-cover object-center pointer-events-none select-none"
                    />
                    <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 font-mono">
                      BEFORE
                    </div>
                  </div>

                  {/* Draggable Divider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-champagne-400 pointer-events-none shadow-[0_0_15px_rgba(197,164,119,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-champagne-400 text-obsidian-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Subtle Drag Prompt Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-champagne-500/20 text-champagne-200/80 font-mono pointer-events-none">
                    DRAG TO REVEAL TRANSFORMATION
                  </div>
                </div>
              ) : (
                /* Standard High-Res Image */
                <div className="relative w-full h-full">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover object-center filter brightness-[0.9] contrast-[1.05]"
                  />
                </div>
              )}
            </div>

            {/* Right: Editorial Details & Navigation */}
            <div className="lg:w-5/12 p-8 md:p-10 flex flex-col justify-between space-y-6 bg-surface">
              <div className="space-y-4">
                <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-medium">
                  {selectedItem.categoryLabel}
                </span>

                <h3 className="font-serif text-3xl md:text-4xl text-ivory-50 leading-tight">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-muted font-light leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.transformation && (
                  <div className="p-4 rounded-xl glass-panel border border-champagne-500/20 text-xs text-ivory-200/90 font-light space-y-1">
                    <div className="text-[10px] tracking-widest uppercase text-champagne-400 font-medium">
                      Transformation Protocol
                    </div>
                    <div>{selectedItem.transformation.details}</div>
                  </div>
                )}
              </div>

              {/* Lightbox Footer & Navigation */}
              <div className="pt-6 border-t border-champagne-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLightboxIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                      )
                    }
                    className="p-2 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLightboxIndex((prev) =>
                        prev !== null && prev + 1 < filteredItems.length ? prev + 1 : 0
                      )
                    }
                    className="p-2 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href="#book"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-all"
                >
                  Book This Look
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
