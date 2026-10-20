"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SALON_CONFIG, GalleryItem } from "@/config/salon.config";
import { X, ZoomIn, ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";

export function GallerySection() {
  const { gallery } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // for before/after comparison slider

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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

  // Reposé-Inspired GSAP Pinned Horizontal Reel Animation (Video 01:21 – 01:33)
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;
    if (window.innerWidth < 1024) return; // Dedicated mobile/tablet swipe layout

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 160);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 1200)}`,
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Internal multi-plane parallax for each arched card's image
      const cards = track.querySelectorAll(".gallery-card-inner-img");
      cards.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 1200)}`,
              scrub: 1.1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative z-10 w-full bg-obsidian-950/20 text-ivory-200 py-16 sm:py-24 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center border-t border-champagne-500/15 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 w-full mb-8 lg:mb-10">
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

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-xs sm:text-sm text-muted max-w-md font-light leading-relaxed">
              {gallery.description}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-champagne-400/80">
              <span className="hidden lg:inline">SCROLL DOWN TO EXPLORE REEL</span>
              <span className="lg:hidden">SWIPE TO EXPLORE ARCHIVE</span>
              <span className="text-base leading-none">→</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 border-b border-champagne-500/15 pb-4 mt-6">
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
      </div>

      {/* Reposé-Style Horizontal Reel Track on Desktop, Swipe Track on Mobile */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 overflow-visible">
        <div
          ref={trackRef}
          className="flex flex-row overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none gap-5 sm:gap-6 lg:gap-8 w-auto lg:w-max lg:will-change-transform pb-6 pt-1 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
        >
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
                className={`group relative rounded-t-[100px] sm:rounded-t-[140px] rounded-b-2xl md:rounded-b-3xl overflow-hidden glass-card border border-champagne-500/20 hover:border-champagne-400/60 transition-all duration-700 cursor-pointer snap-start shrink-0 ${
                  isWide
                    ? "w-[290px] xs:w-[340px] sm:w-[440px] lg:w-[540px] aspect-[16/11]"
                    : "w-[240px] xs:w-[280px] sm:w-[340px] lg:w-[380px] aspect-[3.5/5]"
                } flex flex-col justify-between p-5 md:p-7 transform hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.85)] focus:outline-none focus:ring-1 focus:ring-champagne-400`}
              >
                {/* Background Image with Multi-Plane Parallax Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="gallery-card-inner-img relative w-[120%] h-[120%] -left-[10%] -top-[10%]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 320px, 450px"
                      className="object-cover object-center filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Film Grade Duotone Overlay to eliminate stock photo temperature clash */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/25 to-champagne-900/10 pointer-events-none" />

                {/* Top Corner Badge & Editorial Plate Number */}
                <div className="relative flex items-center justify-between z-10">
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

                {/* Center Hover Halo Play/Inspect Badge (Reposé Pattern) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-champagne-400/40 animate-ping absolute inset-0 pointer-events-none" />
                    <div className="w-16 h-16 rounded-full bg-champagne-400/95 text-obsidian-950 flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-widest font-bold shadow-[0_0_35px_rgba(200,162,82,0.7)] backdrop-blur-md">
                      <span>INSPECT</span>
                      <span className="text-[7px] tracking-normal font-sans text-obsidian-950/70 font-semibold">TAP / VIEW</span>
                    </div>
                  </div>
                </div>

                {/* Clean Bottom Plate Identifier (Text removed from inside card to prevent border radius overlap) */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-300 font-medium px-2.5 py-1 rounded-full glass-panel border border-champagne-500/20">
                    {item.title}
                  </span>
                  {item.transformation && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-champagne-300 px-2 py-0.5 rounded-full bg-champagne-500/20 border border-champagne-500/30">
                      <Sparkles className="w-2.5 h-2.5 text-champagne-400" />
                      <span>B/A</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrub Progress Track (Desktop >=1024px) */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-20 mt-8">
        <div className="w-full h-[2px] bg-champagne-500/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-gradient-to-r from-champagne-400 to-champagne-200 origin-left scale-x-0 transition-transform duration-75"
          />
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
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
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

                {/* Craft Specifications Grid (Reposé Architecture Pattern) */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl glass-panel border border-champagne-500/15">
                    <div className="text-[9px] uppercase tracking-widest text-champagne-400 font-mono">
                      Craft Discipline
                    </div>
                    <div className="text-xs text-ivory-100 font-medium mt-0.5">
                      Haute Coiffure Precision
                    </div>
                  </div>
                  <div className="p-3 rounded-xl glass-panel border border-champagne-500/15">
                    <div className="text-[9px] uppercase tracking-widest text-champagne-400 font-mono">
                      Maintenance Cycle
                    </div>
                    <div className="text-xs text-ivory-100 font-medium mt-0.5">
                      4 – 6 Weeks
                    </div>
                  </div>
                </div>

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
              <div className="pt-6 border-t border-champagne-500/20 flex items-center justify-between gap-4">
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

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello Bhanu's The Hair Studio, I would like to book an appointment for "${selectedItem.title}" (${selectedItem.categoryLabel}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-all shadow-[0_0_20px_rgba(200,162,82,0.4)]"
                  >
                    Book on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
