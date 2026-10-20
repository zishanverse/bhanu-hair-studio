"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import {
  Scissors,
  Clock,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { stageState } from "@/lib/stageState";

export function TreatmentDirectory() {
  const { servicesCatalog, contact } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  // Flatten all services with parent metadata
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

  // Categories list for filter tabs
  const filterTabs = useMemo(() => [
    { id: "all", label: "All Rituals", count: allServices.length },
    { id: "haircuts-styling-men", label: "Hair & Beard", count: 4 },
    { id: "hair-treatments-rebonding", label: "Texture & Rebonding", count: 4 },
    { id: "hair-colouring", label: "Colour & Balayage", count: 2 },
    { id: "bridal-makeup-beauty", label: "Bridal & Aesthetics", count: 4 },
    { id: "skin-facials-acne", label: "Skin & Facials", count: 3 },
    { id: "spa-pedicure-waxing", label: "Spa & Waxing", count: 4 },
  ], [allServices.length]);

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

  // Staggered Entrance Animation with GSAP Luxe Ease
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".treatment-card-item",
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

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".treatment-card-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "luxe",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );
    });

    return () => mm.revert();
  }, [filteredServices]);

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
  }, [filteredServices]);

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
      id="services"
      data-stage="treatments"
      aria-labelledby="services-heading"
      className="relative z-10 w-full bg-obsidian-950/60 text-ivory-200 py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-mono font-medium">
                02 / ATELIER TREATMENT DIRECTORY
              </span>
            </div>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.0]"
            >
              YOUR STYLE. <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                OUR CRAFT.
              </span>
            </h2>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-lg">
              Explore our unisex salon rituals in Indore. Master Japanese shears, organic infusions, and anatomical cranial consultations.
            </p>
          </div>

          {/* Quick Search & Glide Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Quick Search Input */}
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 text-champagne-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals (e.g. Keratin, Cut)..."
                className="w-full pl-10 pr-14 py-2.5 rounded-full bg-obsidian-900/90 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 placeholder-muted/60 focus:outline-none focus:border-champagne-400 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted hover:text-white uppercase font-mono cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Prev / Next Glide Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollReel("left")}
                className="w-10 h-10 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 hover:text-champagne-400 hover:border-champagne-400 transition-colors cursor-pointer"
                aria-label="Previous rituals"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollReel("right")}
                className="w-10 h-10 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 hover:text-champagne-400 hover:border-champagne-400 transition-colors cursor-pointer"
                aria-label="Next rituals"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-champagne-500/15">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-cursor={tab.label}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === tab.id
                  ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_20px_rgba(200,162,82,0.35)]"
                  : "glass-panel border-champagne-500/20 text-muted hover:text-ivory-100"
                }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full tabular-nums ${activeTab === tab.id
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
              Try searching for &quot;Haircut&quot;, &quot;Smoothing&quot;, &quot;Facial&quot;, or &quot;Waxing&quot;.
            </p>
          </div>
        ) : (
          /* Horizontal Reel Showcase */
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-champagne-400">
                <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                <span>SWIPE OR SCROLL RIGHT · {filteredServices.length} BESPOKE RITUALS</span>
              </div>

              {/* Mobile Prev / Next */}
              <div className="flex sm:hidden items-center gap-2">
                <button
                  type="button"
                  data-cursor="Prev"
                  onClick={() => scrollReel("left")}
                  className="w-8 h-8 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 cursor-pointer"
                  aria-label="Previous rituals"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  data-cursor="Next"
                  onClick={() => scrollReel("right")}
                  className="w-8 h-8 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-ivory-100 cursor-pointer"
                  aria-label="Next rituals"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Reel Track */}
            <div
              ref={reelRef}
              data-cursor="Swipe Reel"
              className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  data-cursor="Reserve"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => stageState.snip()}
                  className="treatment-card-item will-change-transform shrink-0 w-[84vw] max-w-[340px] sm:w-[340px] md:w-[370px] rounded-3xl glass-card border border-champagne-500/15 hover:border-champagne-400/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative group overflow-hidden cursor-pointer active:scale-[0.99]"
                >
                  <div className="space-y-4">
                    {/* Category Eyebrow & Duration Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                        {service.categoryNum} / {service.categoryEyebrow}
                      </span>
                      {service.duration && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-champagne-500/20 glass-panel text-[10px] font-mono text-champagne-300 tabular-nums">
                          <Clock className="w-3 h-3 text-champagne-400" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Ritual Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 group-hover:text-champagne-300 transition-colors leading-tight">
                      {service.name}
                    </h3>

                    {/* Sensory Description */}
                    <p className="text-xs text-muted font-light leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
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
                      data-cursor="Reserve"
                      onClick={(e) => {
                        e.stopPropagation();
                        stageState.snip();
                      }}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-400 hover:text-white font-medium group-hover:translate-x-0.5 transition-all cursor-pointer"
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
                className="h-full bg-gradient-to-r from-champagne-600 via-champagne-400 to-champagne-300 transition-all duration-150"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Directory Footer Note */}
        <div className="p-5 rounded-2xl bg-surface/30 border border-champagne-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-light">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-champagne-400" />
            <span>
              Available across all 3 Indore Studios: Palsikar Colony · Saket Nagar · Vijay Nagar.
            </span>
          </div>
          <span className="font-mono text-champagne-400 text-[11px] tabular-nums">
            Open Daily 10:00 AM – 10:00 PM
          </span>
        </div>
      </div>
    </section>
  );
}

export default TreatmentDirectory;
