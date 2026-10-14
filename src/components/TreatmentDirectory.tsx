"use client";

import React, { useState, useMemo } from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { Scissors, Clock, Sparkles, MessageCircle, Search, Check, ChevronRight } from "lucide-react";

export function TreatmentDirectory() {
  const { servicesCatalog, contact } = SALON_CONFIG;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all services with their parent category data
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
  const filterTabs = [
    { id: "all", label: "All Rituals", count: allServices.length },
    { id: "haircuts-styling-men", label: "Hair & Beard", count: 4 },
    { id: "hair-treatments-rebonding", label: "Texture & Rebonding", count: 4 },
    { id: "hair-colouring", label: "Colour & Balayage", count: 2 },
    { id: "bridal-makeup-beauty", label: "Bridal & Aesthetics", count: 4 },
    { id: "skin-facials-acne", label: "Skin & Facials", count: 3 },
    { id: "spa-pedicure-waxing", label: "Spa, Waxing & Home", count: 4 },
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

  return (
    <section
      id="services"
      className="relative w-full bg-obsidian-950 text-ivory-200 py-24 sm:py-32 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Ambient background gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-champagne-500/5 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
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
              Explore our comprehensive unisex salon and aesthetic directory. Every ritual features master-grade Japanese shears, botanical infusions, and individualized cranial consultations.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full lg:w-80 relative">
            <Search className="w-4 h-4 text-champagne-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments (e.g. Keratin, Balayage, Waxing)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-obsidian-900/90 border border-champagne-500/25 text-xs text-ivory-50 placeholder-muted/60 focus:outline-none focus:border-champagne-400 transition-colors shadow-inner"
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

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-champagne-500/15">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 ${
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

        {/* Services Grid (Structured, High-Fashion Editorial Cards) */}
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border border-champagne-500/20 p-8">
            <Scissors className="w-8 h-8 text-champagne-400/40 mx-auto" />
            <h4 className="font-serif text-2xl text-ivory-100">No matching rituals found</h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Try searching for &quot;Haircut&quot;, &quot;Smoothing&quot;, &quot;Facial&quot;, or &quot;Waxing&quot; to explore our complete atelier directory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-3xl glass-card border border-champagne-500/15 hover:border-champagne-400/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
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

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 group-hover:text-champagne-200 transition-colors leading-tight">
                    {service.name}
                  </h3>

                  {/* Sensory Description */}
                  <p className="text-xs text-muted font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action / Direct WhatsApp Booking Link */}
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
