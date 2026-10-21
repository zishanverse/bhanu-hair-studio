"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import {
  Clock,
  MessageCircle,
  Search,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

export function TreatmentDirectory() {
  const { servicesCatalog, contact } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRef = useRef<HTMLElement>(null);

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

  // Curated Signature Rituals (top 6 highlights)
  const signatureHighlights = useMemo(() => {
    return allServices
      .filter((s) => s.tag === "Signature" || s.tag === "Bestseller" || s.tag === "Bridal" || s.tag === "Transformative")
      .slice(0, 6);
  }, [allServices]);

  // Categories list with counts for sticky filter
  const filterTabs = useMemo(() => [
    { id: "all", label: "All Services", count: allServices.length },
    { id: "haircuts-styling-men", label: "Hair & Beard", count: 4 },
    { id: "hair-treatments-rebonding", label: "Texture & Keratin", count: 4 },
    { id: "hair-colouring", label: "Colour & Balayage", count: 2 },
    { id: "bridal-makeup-beauty", label: "Bridal & Nails", count: 4 },
    { id: "skin-facials-acne", label: "Skin & Medi-Facials", count: 3 },
    { id: "spa-pedicure-waxing", label: "Spa & Body", count: 4 },
  ], [allServices.length]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return allServices.filter((srv) => {
      const matchesTab = activeTab === "all" || srv.categoryId === activeTab;
      const matchesSearch =
        searchQuery.trim() === "" ||
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (srv.tag && srv.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [allServices, activeTab, searchQuery]);

  // Staggered entrance
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".treatment-row-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab, searchQuery]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-stage="treatments"
      aria-labelledby="services-heading"
      className="relative z-10 w-full bg-obsidian-950/70 text-ivory-200 py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-champagne-500/15"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-champagne-500/15">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-sans font-medium">
                02 / COMPLETE TREATMENT DIRECTORY
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
              Explore our unisex salon rituals across 3 Indore studios. Transparent starting rates, Japanese precision cuts, and organic hair restoration.
            </p>
          </div>

          {/* Quick Search Field */}
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-champagne-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rituals (e.g. Keratin, Balayage)..."
              className="w-full pl-10 pr-14 py-3 rounded-full bg-obsidian-900/90 border border-champagne-500/25 text-sm text-ivory-50 placeholder-muted/60 focus:outline-none focus:border-champagne-400 transition-colors shadow-inner"
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
        </div>

        {/* 1. CURATED SIGNATURE RITUALS HIGHLIGHT (Horizontal Reel, Max 6 items) */}
        {searchQuery.trim() === "" && activeTab === "all" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne-400" />
                <span className="text-xs uppercase tracking-widest text-champagne-300 font-semibold font-sans">
                  Signature Rituals Highlights
                </span>
              </div>
              <span className="text-[11px] text-muted font-sans hidden sm:inline">
                Top Client Choices in Indore
              </span>
            </div>

            <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6">
              {signatureHighlights.map((ritual) => (
                <div
                  key={ritual.id}
                  className="shrink-0 w-[280px] sm:w-[320px] rounded-2xl glass-card border border-champagne-500/25 p-5 flex flex-col justify-between hover:border-champagne-400/60 transition-all duration-300 group shadow-lg"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-champagne-500/15 text-champagne-300 border border-champagne-500/30 font-medium">
                        {ritual.tag || "Signature"}
                      </span>
                      {ritual.duration && (
                        <span className="text-[10px] font-mono text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3 text-champagne-400" />
                          {ritual.duration}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-xl text-ivory-50 group-hover:text-champagne-300 transition-colors">
                      {ritual.name}
                    </h4>

                    <p className="text-xs text-muted font-light line-clamp-2 leading-relaxed">
                      {ritual.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-champagne-500/15 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted block">Starts from</span>
                      <span className="text-sm font-semibold text-champagne-300 font-mono">
                        {ritual.priceFrom || "On Request"}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Bhanu's The Hair Studio, I would like to reserve a session for ${ritual.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne-400/20 text-champagne-300 hover:bg-champagne-400 hover:text-obsidian-950 text-xs font-medium tracking-wide transition-all min-h-[36px]"
                    >
                      <span>Reserve</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. STICKY CATEGORY FILTER BAR */}
        <div className="sticky top-20 z-20 py-2.5 bg-obsidian-950/90 backdrop-blur-xl -mx-4 px-4 sm:-mx-6 sm:px-6 border-y border-champagne-500/15 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer min-h-[44px] ${
                  isActive
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.4)]"
                    : "bg-obsidian-900/80 border border-champagne-500/20 text-muted hover:text-ivory-100 hover:border-champagne-500/40"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full tabular-nums ${
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

        {/* 3. VERTICAL SCANNABLE DIRECTORY (2-Column Grid on Desktop / 1-Column on Mobile) */}
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border border-champagne-500/20 p-8">
            <h4 className="font-serif text-2xl text-ivory-100">No matching rituals found</h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Try searching for &quot;Haircut&quot;, &quot;Keratin&quot;, &quot;Balayage&quot;, or &quot;Facial&quot;.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted pb-1">
              <span className="font-sans uppercase tracking-widest text-[11px] text-champagne-400">
                SHOWING {filteredServices.length} {filteredServices.length === 1 ? "SERVICE" : "SERVICES"}
              </span>
              <span className="text-[11px] text-muted">
                Price Transparency · Reserve directly on WhatsApp
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="treatment-row-item rounded-2xl glass-card border border-champagne-500/15 hover:border-champagne-400/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] group"
                >
                  <div className="space-y-2.5">
                    {/* Header Row: Category Eyebrow + Tag + Duration */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-champagne-500/10 text-champagne-400 border border-champagne-500/20 font-medium">
                          {service.categoryTitle}
                        </span>
                        {service.tag && (
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface text-ivory-200 border border-white/10 font-sans">
                            {service.tag}
                          </span>
                        )}
                      </div>

                      {service.duration && (
                        <div className="inline-flex items-center gap-1 text-[11px] font-mono text-muted tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-champagne-400" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Service Name */}
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory-50 group-hover:text-champagne-300 transition-colors">
                      {service.name}
                    </h3>

                    {/* Concise One-Line Description */}
                    <p className="text-xs text-muted font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Row: Starting Price & Honest Reserve Action */}
                  <div className="pt-4 mt-4 border-t border-champagne-500/15 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted block">Starting from</span>
                      <span className="text-base font-semibold text-champagne-300 font-mono tracking-tight">
                        {service.priceFrom || "On Request"}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Bhanu's The Hair Studio, I would like to book an appointment for: ${service.name} (${service.priceFrom || "Pricing on consultation"}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 to-champagne-400 hover:shadow-[0_0_15px_rgba(200,162,82,0.4)] transition-all min-h-[44px] cursor-pointer"
                    >
                      <span>Reserve</span>
                      <MessageCircle className="w-3.5 h-3.5 fill-current text-obsidian-950" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Directory Footer Note */}
        <div className="p-5 rounded-2xl bg-surface/40 border border-champagne-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-light">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              All treatments delivered at our 3 Indore Studios (Palsikar Colony · Saket Nagar · Vijay Nagar).
            </span>
          </div>
          <span className="font-mono text-champagne-400 text-[11px] tabular-nums">
            Daily 10:00 AM – 10:00 PM
          </span>
        </div>
      </div>
    </section>
  );
}

export default TreatmentDirectory;
