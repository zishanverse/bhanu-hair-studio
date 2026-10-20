"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { SALON_CONFIG } from "@/config/salon.config";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { X, ZoomIn, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowRight } from "lucide-react";

export function GallerySection() {
  const { gallery } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // for before/after comparison slider
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => [
    { id: "all", label: "All Looks" },
    { id: "mens", label: "Men's Hair" },
    { id: "womens", label: "Women's Hair" },
    { id: "colour", label: "Hair Colour" },
    { id: "treatments", label: "Treatments" },
  ], []);

  const filteredItems = useMemo(() => {
    return activeTab === "all"
      ? gallery.items
      : gallery.items.filter((item) => item.category === activeTab);
  }, [activeTab, gallery.items]);

  const selectedItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  // Staggered Entrance Animation with GSAP
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".gallery-card-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "luxe",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    });

    return () => mm.revert();
  }, [filteredItems]);

  // Track horizontal reel scroll progress
  const updateScrollProgress = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
  };

  useEffect(() => {
    const el = reelRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => el.removeEventListener("scroll", updateScrollProgress);
  }, [filteredItems]);

  const scrollReel = (direction: "left" | "right") => {
    if (!reelRef.current) return;
    const amount = reelRef.current.clientWidth * 0.75;
    reelRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      data-stage="gallery"
      aria-labelledby="gallery-heading"
      className="relative z-10 w-full bg-obsidian-950/60 text-ivory-200 py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header with Responsive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-mono font-medium">
                {gallery.sectionNum} / {gallery.sectionLabel}
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.0]"
            >
              {gallery.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {gallery.headingLine2}
              </span>
            </h2>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-lg">
              {gallery.description}
            </p>
          </div>

          {/* Glide Navigation Controls */}
          <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-champagne-400">
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
              <span>SWIPE / GLIDE LOOKS</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollReel("left")}
                className="w-10 h-10 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 hover:text-champagne-400 hover:border-champagne-400 transition-colors cursor-pointer"
                aria-label="Previous looks"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollReel("right")}
                className="w-10 h-10 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 hover:text-champagne-400 hover:border-champagne-400 transition-colors cursor-pointer"
                aria-label="Next looks"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-champagne-500/15">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-cursor={cat.label}
              onClick={() => {
                setActiveTab(cat.id);
                setActiveLightboxIndex(null);
              }}
              className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_20px_rgba(200,162,82,0.35)]"
                  : "glass-panel border-champagne-500/20 text-muted hover:text-ivory-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Visual Reel */}
        <div className="space-y-5">
          <div
            ref={reelRef}
            data-cursor="Inspect Look"
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredItems.map((item, index) => {
              const isWide = item.aspect === "wide";

              return (
                <div
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  data-cursor="View"
                  aria-label={`View look ${index + 1}: ${item.title}`}
                  onClick={() => setActiveLightboxIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveLightboxIndex(index);
                    }
                  }}
                  style={{ scrollSnapAlign: "start" }}
                  className={`gallery-card-item group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-champagne-500/20 hover:border-champagne-400/60 transition-all duration-500 cursor-pointer shrink-0 will-change-transform ${
                    isWide
                      ? "w-[280px] xs:w-[320px] sm:w-[400px] md:w-[480px] aspect-[16/11]"
                      : "w-[220px] xs:w-[260px] sm:w-[300px] md:w-[340px] aspect-[4/5]"
                  } p-4 flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] focus:outline-none focus:ring-1 focus:ring-champagne-400`}
                >
                  {/* Clean High-Resolution Hair Imagery */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`Bhanu's The Hair Studio Atelier Look: ${item.title}`}
                      fill
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 480px"
                      className="object-cover object-center filter brightness-[0.92] contrast-[1.06] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Elegant Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-obsidian-950/30 pointer-events-none" />

                  {/* Top-Right Floating Zoom Icon Indicator */}
                  <div className="relative z-10 flex justify-end w-full">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-panel border border-champagne-500/35 flex items-center justify-center text-champagne-300 group-hover:bg-champagne-400 group-hover:text-obsidian-950 transition-all shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  <div className="relative z-10 h-2" />
                </div>
              );
            })}
          </div>

          {/* Horizontal Scroll Progress Bar */}
          <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-champagne-600 via-champagne-400 to-champagne-300 transition-all duration-150"
              style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
            />
          </div>
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
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full glass-panel border border-champagne-500/40 text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/20 transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Interactive Media Area (Image or Before/After slider) */}
            <div className="lg:w-7/12 relative min-h-[350px] lg:min-h-[550px] bg-obsidian-900 overflow-hidden select-none">
              {selectedItem.transformation ? (
                <div
                  className="relative w-full h-full min-h-[400px] cursor-ew-resize group select-none touch-none"
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
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
                  <Image
                    src={selectedItem.transformation.afterImage}
                    alt={`${selectedItem.title} After Styling`}
                    fill
                    draggable={false}
                    className="object-cover object-center pointer-events-none select-none"
                  />
                  <div className="absolute top-4 right-4 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 font-mono">
                    AFTER
                  </div>

                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <Image
                      src={selectedItem.transformation.beforeImage}
                      alt={`${selectedItem.title} Before Styling`}
                      fill
                      draggable={false}
                      className="object-cover object-center pointer-events-none select-none"
                    />
                    <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 font-mono">
                      BEFORE
                    </div>
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-champagne-400 pointer-events-none shadow-[0_0_15px_rgba(197,164,119,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-champagne-400 text-obsidian-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-champagne-500/20 text-champagne-200/80 font-mono pointer-events-none">
                    DRAG TO REVEAL TRANSFORMATION
                  </div>
                </div>
              ) : (
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

              <div className="pt-6 border-t border-champagne-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLightboxIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                      )
                    }
                    className="p-2 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors cursor-pointer"
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
                    className="p-2 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Bhanu's The Hair Studio, I would like to book an appointment for "${selectedItem.title}" (${selectedItem.categoryLabel}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-all shadow-[0_0_20px_rgba(200,162,82,0.4)] cursor-pointer"
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

export default GallerySection;
