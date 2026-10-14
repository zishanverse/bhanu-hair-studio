"use client";

import React from "react";
import { Scissors, Sparkles, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export function AtelierTeaser() {
  const services = [
    {
      num: "01",
      category: "HAIR ARCHITECTURE",
      title: "Precision Haircut & Fade",
      duration: "45 MIN",
      desc: "Custom anatomical consultation, scissor sculpting, foil fading, and hot towel herbal finish.",
      price: "₹800 onwards",
    },
    {
      num: "02",
      category: "COUTURE STYLING",
      title: "Signature Blowout & Texture",
      duration: "60 MIN",
      desc: "Volumizing silk infusion, thermal rod styling, and editorial high-gloss finish.",
      price: "₹1,200 onwards",
    },
    {
      num: "03",
      category: "COLOUR ATELIER",
      title: "Balayage & Dimensional Toning",
      duration: "120 MIN",
      desc: "Hand-painted French balayage, bespoke gloss formulation, and bond-building nourishment.",
      price: "₹3,500 onwards",
    },
    {
      num: "04",
      category: "SPA & RITUALS",
      title: "Keratin & Botoplex Therapy",
      duration: "90 MIN",
      desc: "Deep protein rebuilding, intense humidity barrier, mirror-like glass hair shine.",
      price: "₹4,000 onwards",
    },
  ];

  return (
    <section id="services" className="relative w-full bg-obsidian-950 text-ivory-50 py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-champagne-500/15">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-400" />
              <span className="text-xs uppercase tracking-ultra text-champagne-400 font-medium">
                THE ATELIER CURATION
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-ivory-50 leading-tight">
              Bespoke Hairdressing <br />
              <span className="italic text-champagne-300 font-serif">Tailored to You.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm uppercase tracking-widest text-ivory-200/70 max-w-md font-light leading-relaxed">
            Every session at Bhanu Hair Studio begins with an individualized structural consultation, harmonizing facial geometry, lifestyle, and couture aesthetics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="group p-8 rounded-2xl glass-panel border border-champagne-500/15 hover:border-champagne-400/50 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all duration-500 flex flex-col justify-between space-y-6 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-champagne-400/80 tracking-widest">{svc.num}</span>
                  <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-champagne-500/30 text-champagne-300 font-mono">
                    {svc.duration}
                  </span>
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-champagne-400/70">{svc.category}</div>
                <h3 className="font-serif text-2xl text-ivory-50 group-hover:text-champagne-200 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-ivory-300/70 leading-relaxed font-light">{svc.desc}</p>
              </div>

              <div className="pt-4 border-t border-champagne-500/10 flex items-center justify-between">
                <span className="text-sm font-serif text-champagne-300">{svc.price}</span>
                <a
                  href="#book"
                  className="p-2 rounded-full border border-champagne-500/30 text-champagne-400 group-hover:bg-champagne-400 group-hover:text-obsidian-950 transition-all"
                  aria-label={`Book ${svc.title}`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Location & Reservation Banner */}
        <div id="atelier" className="p-8 md:p-12 rounded-3xl glass-panel border border-champagne-500/25 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-ultra text-champagne-400 font-medium">VISIT THE STUDIO</span>
              <h3 className="font-serif text-3xl md:text-4xl text-ivory-50 font-light">
                Indore’s Sanctuary of <span className="italic text-champagne-300">Modern Elegance</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 pt-2 text-xs text-ivory-200/80 tracking-wider">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-champagne-400" />
                  <span>Shop No.4, Sewak Ave, Manik Bagh Rd, Palsikar Colony, Indore</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-champagne-400" />
                  <span>Open Daily: 10:00 AM – 10:00 PM (Closes 10 PM)</span>
                </div>
              </div>
            </div>

            <div id="book" className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <a
                href="https://wa.me/919876543210?text=Hello%20Bhanu%20Hair%20Studio,%20I%20would%20like%20to%20book%20a%20cinematic%20salon%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                id="atelier-book-whatsapp"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all text-center"
              >
                Book Via WhatsApp / Call
              </a>
              <a
                href="#cinematic-hero-section"
                className="w-full sm:w-auto px-6 py-4 rounded-full text-xs uppercase tracking-widest font-light text-champagne-300 border border-champagne-500/30 glass-panel hover:text-white transition-all text-center"
              >
                Replay Cinematic Film ↑
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer id="contact" className="pt-12 border-t border-champagne-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ivory-300/40 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Scissors className="w-3.5 h-3.5 text-champagne-400" />
            <span>BHANU HAIR STUDIO © {new Date().getFullYear()} · ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-champagne-400 cursor-pointer">Instagram</span>
            <span className="hover:text-champagne-400 cursor-pointer">Facebook</span>
            <span className="hover:text-champagne-400 cursor-pointer">Directions</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
