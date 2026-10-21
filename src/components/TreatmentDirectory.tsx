"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import {
  Clock,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  SlidersHorizontal,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  Phone,
} from "lucide-react";

export function TreatmentDirectory() {
  const { servicesCatalog, contact } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("signature");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"carousel" | "menu">("carousel");

  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Flatten all services with parent category metadata
  const allServices = useMemo(() => {
    return servicesCatalog.categories.flatMap((cat) =>
      cat.services.map((srv) => ({
        ...srv,
        categoryTitle: cat.title,
        categoryId: cat.id,
        categoryNum: cat.num,
        categoryEyebrow: cat.eyebrow,
      }))
    );
  }, [servicesCatalog.categories]);

  // Curated Signature Rituals (top highlights)
  const signatureServices = useMemo(() => {
    return allServices.filter(
      (s) =>
        s.tag === "Signature" ||
        s.tag === "Bestseller" ||
        s.tag === "Bridal" ||
        s.tag === "Transformative"
    );
  }, [allServices]);

  // Categories list with counts
  const filterTabs = useMemo(
    () => [
      { id: "signature", label: "Signature Rituals", count: signatureServices.length },
      { id: "all", label: "All Treatments", count: allServices.length },
      { id: "haircuts-styling-men", label: "Hair & Beard", count: 4 },
      { id: "hair-treatments-rebonding", label: "Texture & Keratin", count: 4 },
      { id: "hair-colouring", label: "Colour & Balayage", count: 2 },
      { id: "bridal-makeup-beauty", label: "Bridal & Nails", count: 4 },
      { id: "skin-facials-acne", label: "Skin & Facials", count: 3 },
      { id: "spa-pedicure-waxing", label: "Spa & Body", count: 4 },
    ],
    [allServices.length, signatureServices.length]
  );

  // Filtered services
  const filteredServices = useMemo(() => {
    return allServices.filter((srv) => {
      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "signature"
          ? srv.tag === "Signature" ||
            srv.tag === "Bestseller" ||
            srv.tag === "Bridal" ||
            srv.tag === "Transformative"
          : srv.categoryId === activeTab;

      const matchesSearch =
        searchQuery.trim() === "" ||
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (srv.tag && srv.tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    });
  }, [allServices, activeTab, searchQuery]);

  // Update scroll navigation arrow state and progress bar
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    } else {
      setScrollProgress(100);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, filteredServices]);

  // Scroll left/right smoothly
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cardWidth = el.querySelector(".treatment-card-anim")?.clientWidth || 360;
    const scrollAmount = direction === "left" ? -cardWidth * 1.1 : cardWidth * 1.1;

    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Staggered animated entrance whenever active tab or search changes
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    // Reset horizontal scroll smoothly to start
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".treatment-card-anim",
        { opacity: 0, x: 28, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab, searchQuery, viewMode]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-stage="treatments"
      aria-labelledby="services-heading"
      className="relative z-10 w-full bg-obsidian-950/85 text-ivory-200 py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10">
        {/* Section Header with Title, Search & Mode Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-champagne-500/15">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-sans font-medium">
                02 / COMPLETE TREATMENT DIRECTORY
              </span>
            </div>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.05]"
            >
              YOUR STYLE. <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                OUR CRAFT.
              </span>
            </h2>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-lg">
              Explore our unisex salon rituals across 3 Indore studios. Swipe through curated cards or review our compact atelier rate card.
            </p>
          </div>

          {/* Search Bar & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-champagne-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals (e.g. Keratin, Balayage)..."
                className="w-full pl-10 pr-14 py-2.5 rounded-full bg-obsidian-900/90 border border-champagne-500/25 text-sm text-ivory-50 placeholder-muted/60 focus:outline-none focus:border-champagne-400 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted hover:text-white uppercase font-sans cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Switcher (Card Carousel vs Atelier Menu) */}
            <div className="inline-flex items-center p-1 rounded-full bg-obsidian-900/80 border border-champagne-500/20 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("carousel")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer min-h-[36px] ${
                  viewMode === "carousel"
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_12px_rgba(200,162,82,0.4)]"
                    : "text-muted hover:text-ivory-100"
                }`}
                title="Cinematic Carousel View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("menu")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer min-h-[36px] ${
                  viewMode === "menu"
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_12px_rgba(200,162,82,0.4)]"
                    : "text-muted hover:text-ivory-100"
                }`}
                title="Compact Atelier Price List View"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Filter Bar (Category Pills) */}
        <div className="sticky top-20 z-20 py-3 bg-obsidian-950/95 backdrop-blur-xl -mx-4 px-4 sm:-mx-6 sm:px-6 border-y border-champagne-500/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer min-h-[44px] ${
                    isActive
                      ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_16px_rgba(200,162,82,0.4)]"
                      : "bg-obsidian-900/80 border border-champagne-500/20 text-muted hover:text-ivory-100 hover:border-champagne-500/40"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full tabular-nums ${
                      isActive
                        ? "bg-obsidian-950/20 text-obsidian-950 font-bold"
                        : "bg-surface text-muted"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Carousel Navigation Arrows (visible only in Carousel view) */}
          {viewMode === "carousel" && (
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-champagne-500/30 flex items-center justify-center text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/15 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-champagne-500/30 flex items-center justify-center text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/15 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* 1. CINEMATIC CAROUSEL VIEW (Default: Horizontal Right-Scroll) */}
        {viewMode === "carousel" && (
          <div className="space-y-4">
            {/* Meta Header with Count & Mobile Swipe Cue */}
            <div className="flex items-center justify-between text-xs text-muted px-1">
              <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] text-champagne-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  SHOWING {filteredServices.length} {filteredServices.length === 1 ? "RITUAL" : "RITUALS"}
                </span>
              </div>
              <span className="text-[11px] text-muted flex items-center gap-1 font-sans">
                <span className="inline-block sm:hidden">Swipe right to explore →</span>
                <span className="hidden sm:inline">Use arrows or scroll track to explore →</span>
              </span>
            </div>

            {filteredServices.length === 0 ? (
              <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border border-champagne-500/20 p-8">
                <h4 className="font-serif text-2xl text-ivory-100">No matching rituals found</h4>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Try searching for &quot;Haircut&quot;, &quot;Keratin&quot;, &quot;Balayage&quot;, or &quot;Facial&quot;.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Horizontal Scroll Track */}
                <div
                  ref={scrollContainerRef}
                  className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 overscroll-x-contain"
                >
                  {filteredServices.map((service, idx) => (
                    <div
                      key={service.id}
                      className="treatment-card-anim shrink-0 w-[82vw] sm:w-[340px] md:w-[380px] lg:w-[400px] snap-start rounded-2xl border border-[#C8A252]/40 hover:border-[#C8A252] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(200,162,82,0.22)] group relative overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#ECE4D6] text-[#161410] shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                    >
                      {/* Ambient Pearl/Gold Accent Flare on hover */}
                      <div
                        className="absolute -top-12 -right-12 w-32 h-32 bg-[#C8A252]/15 rounded-full blur-2xl group-hover:bg-[#C8A252]/30 transition-all pointer-events-none"
                        aria-hidden="true"
                      />

                      <div className="space-y-3.5 relative z-10">
                        {/* Top Meta Line: Number + Tag + Duration */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#7A5B20] uppercase tracking-widest font-bold">
                              {service.categoryNum || String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C8A252]/15 text-[#7A5B20] border border-[#C8A252]/35 font-semibold">
                              {service.tag || service.categoryTitle}
                            </span>
                          </div>

                          {service.duration && (
                            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5C5547] tabular-nums font-medium">
                              <Clock className="w-3.5 h-3.5 text-[#7A5B20]" />
                              <span>{service.duration}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#110F0C] group-hover:text-[#7A5B20] transition-colors leading-tight font-medium">
                          {service.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#3E3A32] font-normal leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      {/* Bottom Footer Line: Starting Price & WhatsApp Reserve Action */}
                      <div className="pt-5 mt-5 border-t border-[#C8A252]/25 flex items-center justify-between gap-4 relative z-10">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#6B6354] font-sans block font-medium">
                            Starting from
                          </span>
                          <span className="text-lg font-bold text-[#7A5B20] font-mono tracking-tight">
                            {service.priceFrom || "On Request"}
                          </span>
                        </div>

                        <a
                          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                            `Hello Bhanu's The Hair Studio, I would like to reserve an appointment for: ${service.name} (${service.priceFrom || "Price on consultation"}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#181613] hover:bg-[#7A5B20] transition-all min-h-[44px] cursor-pointer shadow-md active:scale-95"
                        >
                          <span>Reserve</span>
                          <ArrowUpRight className="w-4 h-4 text-champagne-300" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slim Champagne Progress Indicator Bar */}
                <div className="pt-2 px-1 flex items-center justify-between gap-4">
                  <div className="h-1 bg-obsidian-900 rounded-full flex-1 overflow-hidden border border-champagne-500/20">
                    <div
                      className="h-full bg-gradient-to-r from-champagne-400 to-champagne-200 rounded-full transition-all duration-150"
                      style={{ width: `${Math.max(8, scrollProgress)}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-champagne-400 tabular-nums shrink-0">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. COMPACT ATELIER MENU VIEW (Alternative Structured List View) */}
        {viewMode === "menu" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between text-xs text-muted pb-1">
              <span className="font-sans uppercase tracking-widest text-[11px] text-champagne-400 font-mono">
                COMPLETE ATELIER PRICE LIST · {filteredServices.length} SERVICES
              </span>
              <span className="text-[11px] text-muted">
                Transparent starting rates across all 3 Indore studios
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="treatment-card-anim p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#ECE4D6] border border-[#C8A252]/35 hover:border-[#C8A252] flex items-center justify-between gap-4 transition-all group shadow-md hover:shadow-[0_8px_25px_rgba(200,162,82,0.18)]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C8A252]/15 text-[#7A5B20] border border-[#C8A252]/30 font-semibold font-mono">
                        {service.categoryTitle}
                      </span>
                      {service.duration && (
                        <span className="text-[10px] font-mono text-[#5C5547] flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-[#7A5B20]" />
                          {service.duration}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg text-[#110F0C] group-hover:text-[#7A5B20] transition-colors font-medium">
                      {service.name}
                    </h4>

                    <p className="text-xs text-[#3E3A32] font-normal line-clamp-1">
                      {service.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0 space-y-1.5">
                    <span className="text-base font-bold text-[#7A5B20] font-mono block">
                      {service.priceFrom || "On Request"}
                    </span>
                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Bhanu's The Hair Studio, I would like to reserve: ${service.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#181613] hover:text-[#7A5B20] font-semibold bg-white/80 border border-[#C8A252]/40 px-2.5 py-1 rounded-full shadow-sm"
                    >
                      <span>Book</span>
                      <ArrowUpRight className="w-3 h-3 text-[#7A5B20]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Directory Footer Guarantee */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface/50 border border-champagne-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-light shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>
              All services performed by senior licensed artists across our 3 Indore locations (Palsikar Colony · Saket Nagar · Vijay Nagar).
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-champagne-400 text-xs tabular-nums">
              Open Daily 10:00 AM – 10:00 PM
            </span>
            <a
              href="#book"
              className="text-xs uppercase tracking-wider text-champagne-300 hover:text-white underline underline-offset-4 font-medium transition-colors"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TreatmentDirectory;
