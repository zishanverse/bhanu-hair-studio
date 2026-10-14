"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { SALON_CONFIG } from "@/config/salon.config";
import {
  Scissors,
  Clock,
  Sparkles,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

export function TreatmentDirectory() {
  const { servicesCatalog, contact } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"reel" | "bento">("reel");
  const [scrollProgress, setScrollProgress] = useState(0);

  const reelRef = useRef<HTMLDivElement>(null);

  // Category mapping lookup for photos & highlights
  const categoryImages: Record<string, string> = {
    "haircuts-styling-men": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    "hair-treatments-rebonding": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "hair-colouring": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    "bridal-makeup-beauty": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "skin-facials-acne": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    "spa-pedicure-waxing": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  };

  // Flatten all services with parent metadata
  const allServices = useMemo(() => {
    return servicesCatalog.categories.flatMap((cat) =>
      cat.services.map((srv, index) => ({
        ...srv,
        categoryTitle: cat.title,
        categoryId: cat.id,
        categoryNum: cat.num,
        categoryEyebrow: cat.eyebrow,
        categoryImage: categoryImages[cat.id] || cat.image,
        // Mark first item in each major category or signature tags as featured for bento spotlight
        isFeaturedBento:
          index === 0 || srv.tag === "Signature" || srv.tag === "Bestseller" || srv.tag === "Transformative",
      }))
    );
  }, [servicesCatalog.categories]);

  // Categories list for filter tabs
  const filterTabs = [
    { id: "all", label: "All Rituals", count: allServices.length },
    { id: "haircuts-styling-men", label: "Hair & Beard", count: 4 },
    { id: "hair-treatments-rebonding", label: "Texture & Rebonding", count: 4 },
    { id: "hair-colouring", label: "Colour & Balayage", count: 2 },
    { id: "bridal-makeup-beauty", label: "Bridal & Aesthetics", count: 4 },
    { id: "skin-facials-acne", label: "Skin & Facials", count: 3 },
    { id: "spa-pedicure-waxing", label: "Spa & Waxing", count: 4 },
  ];

  // Filtered services based on tab and search
  const filteredServices = useMemo(() => {
    return allServices.filter((srv) => {
      const matchesTab = activeTab === "all" || srv.categoryId === activeTab;
      const matchesSearch =
        searchQuery === "" ||
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [allServices, activeTab, searchQuery]);

  // Handle horizontal reel scroll track progress
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
  }, [filteredServices, viewMode]);

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
      id="services"
      className="relative w-full bg-obsidian-950 text-ivory-200 py-24 sm:py-32 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Ambient background gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-champagne-500/5 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500/80 inline-block" />
              <span className="text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                02 / ATELIER TREATMENT DIRECTORY
              </span>
              <span className="text-[10px] tracking-widest text-muted font-mono uppercase hidden sm:inline">
                — PALSIKAR COLONY
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory-50 tracking-tight leading-[1.02]">
              YOUR STYLE. <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                OUR CRAFT.
              </span>
            </h2>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">
              Explore our unisex salon rituals. Browse via fluid right-scroll showcase or interactive Bento Grid.
              Every ritual features master-grade Japanese shears, botanical infusions, and cranial consultations.
            </p>
          </div>

          {/* Quick Search & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* View Switcher: Right-Scroll Reel vs Bento Grid */}
            <div className="inline-flex items-center p-1 rounded-full glass-panel border border-champagne-500/25 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode("reel")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  viewMode === "reel"
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(197,164,119,0.35)]"
                    : "text-muted hover:text-ivory-100"
                }`}
                title="Smooth Right-Scroll Horizontal Reel"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Reel</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("bento")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  viewMode === "bento"
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(197,164,119,0.35)]"
                    : "text-muted hover:text-ivory-100"
                }`}
                title="Asymmetric Bento Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento</span>
              </button>
            </div>

            {/* Quick Search Input */}
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 text-champagne-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals (e.g. Keratin, Cut)..."
                className="w-full pl-10 pr-14 py-2.5 rounded-full bg-obsidian-900/90 border border-champagne-500/25 text-xs text-ivory-50 placeholder-muted/60 focus:outline-none focus:border-champagne-400 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted hover:text-white uppercase font-mono"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-champagne-500/15">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_20px_rgba(197,164,119,0.35)]"
                  : "glass-panel border-champagne-500/20 text-muted hover:text-ivory-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id
                    ? "bg-obsidian-950/20 text-obsidian-950 font-bold"
                    : "bg-surface text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border border-champagne-500/20 p-8">
            <Scissors className="w-8 h-8 text-champagne-400/40 mx-auto" />
            <h4 className="font-serif text-2xl text-ivory-100">No matching rituals found</h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Try searching for &quot;Haircut&quot;, &quot;Smoothing&quot;, &quot;Facial&quot;, or &quot;Waxing&quot; to explore our complete atelier directory.
            </p>
          </div>
        ) : viewMode === "reel" ? (
          /* ======================================================== */
          /* 1. LUXURY RIGHT-SCROLL HORIZONTAL REEL SHOWCASE          */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Reel Navigation Header & Guidance */}
            <div className="flex items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-champagne-400">
                <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                <span>SCROLL RIGHT OR SWIPE TO EXPLORE ({filteredServices.length} RITUALS)</span>
              </div>

              {/* Prev / Next Glide Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollReel("left")}
                  className="w-9 h-9 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 hover:text-champagne-300 hover:border-champagne-400 transition-colors"
                  aria-label="Previous rituals"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollReel("right")}
                  className="w-9 h-9 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 hover:text-champagne-300 hover:border-champagne-400 transition-colors"
                  aria-label="Next rituals"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div
              ref={reelRef}
              data-cursor="drag"
              className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {filteredServices.map((service, idx) => (
                <div
                  key={service.id}
                  style={{ scrollSnapAlign: "start" }}
                  className="shrink-0 w-[300px] sm:w-[350px] md:w-[380px] rounded-3xl glass-card border border-champagne-500/15 hover:border-champagne-400/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group overflow-hidden"
                >
                  {/* Subtle Top Ambient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="space-y-4">
                    {/* Category Eyebrow & Duration Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                        {service.categoryNum} / {service.categoryEyebrow}
                      </span>
                      {service.duration && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-champagne-500/20 glass-panel text-[10px] font-mono text-champagne-300">
                          <Clock className="w-3 h-3 text-champagne-400" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Ritual Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 group-hover:text-champagne-200 transition-colors leading-tight">
                      {service.name}
                    </h3>

                    {/* Sensory Description */}
                    <p className="text-xs text-muted font-light leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-6 mt-6 border-t border-champagne-500/15 flex items-center justify-between gap-4">
                    {service.tag ? (
                      <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 font-mono">
                        {service.tag}
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-wider uppercase text-muted font-mono">
                        UNISEX ATELIER
                      </span>
                    )}

                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Bhanu's The Hair Studio Palsikar, I would like to book an appointment for: ${service.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-300 hover:text-white font-medium group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Reserve</span>
                      <MessageCircle className="w-3.5 h-3.5 fill-current text-champagne-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal Scroll Progress Bar */}
            <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-champagne-500 to-champagne-300 transition-all duration-150"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* 2. ASYMMETRIC BENTO GRID EDITORIAL SHOWCASE              */
          /* ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredServices.map((service, idx) => {
              // Highlight selected services with wide Bento styling
              const isHeroCard = service.isFeaturedBento && (idx % 4 === 0);

              return (
                <div
                  key={service.id}
                  className={`group relative rounded-3xl glass-card border border-champagne-500/15 hover:border-champagne-400/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${
                    isHeroCard ? "lg:col-span-2 bg-gradient-to-br from-obsidian-900/90 via-surface/60 to-obsidian-950/95" : ""
                  }`}
                >
                  <div className="space-y-4">
                    {/* Eyebrow & Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                        {service.categoryNum} / {service.categoryEyebrow}
                      </span>
                      {service.duration && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-champagne-500/20 glass-panel text-[10px] font-mono text-champagne-300">
                          <Clock className="w-3 h-3 text-champagne-400" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 group-hover:text-champagne-200 transition-colors leading-tight">
                      {service.name}
                    </h3>

                    {/* Sensory Description */}
                    <p className="text-xs text-muted font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Bento Hero Extras */}
                    {isHeroCard && (
                      <div className="pt-3 flex items-center gap-3 text-[11px] text-champagne-300/80 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                        <span>Includes Cranial Diagnostics & Japanese Shear Balancing</span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-6 mt-6 border-t border-champagne-500/15 flex items-center justify-between gap-4">
                    {service.tag ? (
                      <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 font-mono">
                        {service.tag}
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-wider uppercase text-muted font-mono">
                        UNISEX ATELIER
                      </span>
                    )}

                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Bhanu's The Hair Studio Palsikar, I would like to book an appointment for: ${service.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-300 hover:text-white font-medium group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Reserve</span>
                      <MessageCircle className="w-3.5 h-3.5 fill-current text-champagne-400" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Directory Footer Note */}
        <div className="p-6 rounded-2xl glass-panel border border-champagne-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-light">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-champagne-400" />
            <span>
              All services conducted at Shop No.4, Sewak Avenue, Manik Bagh Rd, Palsikar Colony, Indore.
            </span>
          </div>
          <span className="font-mono text-champagne-300 text-[11px]">
            Open Daily 10:00 AM – 10:00 PM
          </span>
        </div>
      </div>
    </section>
  );
}
