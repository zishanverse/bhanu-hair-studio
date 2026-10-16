"use client";

import React from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { Scissors, ArrowUp, MapPin, Phone, Mail, Clock, Globe } from "lucide-react";

export function Footer() {
  const { identity, contact, social, servicesCatalog } = SALON_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative z-10 w-full bg-obsidian-950/40 backdrop-blur-sm text-ivory-200 pt-16 sm:pt-20 pb-12 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Top Tier: Logo, Brand Statement, and Back to Top */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-champagne-500/15">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-champagne-500/40 flex items-center justify-center bg-surface">
                <Scissors className="w-4 h-4 text-champagne-400 transform -rotate-45" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-ivory-50 block">
                  {identity.brandName}
                </span>
                <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-sans block -mt-1">
                  {identity.brandSub} · {identity.city.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted font-light leading-relaxed">
              Indore’s premier unisex haute coiffure and beauty atelier. We unite anatomical precision, liquid silk textures, and sensory calm to elevate personal aesthetics.
            </p>
          </div>

          {/* Quick Links & Service Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Quick Links */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono block">
                NAVIGATION
              </span>
              <ul className="space-y-2 text-muted font-light">
                <li>
                  <a href="#cinematic-hero-section" className="hover:text-champagne-300 transition-colors">
                    Cinematic Film
                  </a>
                </li>
                <li>
                  <a href="#studio" className="hover:text-champagne-300 transition-colors">
                    The Studio
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-champagne-300 transition-colors">
                    Our Expertise
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-champagne-300 transition-colors">
                    Signature Rituals
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-champagne-300 transition-colors">
                    Look Archive
                  </a>
                </li>
                <li>
                  <a href="#skincare" className="hover:text-champagne-300 transition-colors">
                    Beyond Hair
                  </a>
                </li>
              </ul>
            </div>

            {/* Service Categories */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono block">
                DISCIPLINES
              </span>
              <ul className="space-y-2 text-muted font-light">
                {servicesCatalog.categories.map((c) => (
                  <li key={c.id}>
                    <a href="#services" className="hover:text-champagne-300 transition-colors">
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Studio Links */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono block">
                CONNECT
              </span>
              <ul className="space-y-2 text-muted font-light">
                <li>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-champagne-300 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-champagne-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-champagne-300 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-champagne-400 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.8C10.5 0 9 1.458 9 4.708V8z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href={contact.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-champagne-300 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Google Maps</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="flex lg:flex-col items-center lg:items-end justify-between">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 hover:bg-champagne-500/10 transition-all text-xs uppercase tracking-widest"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Address, Hours, Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-muted font-light tracking-wider text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>{contact.address.line1}, {contact.address.city}, {contact.address.state}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-champagne-400">Open Daily 10:00 AM – 10:00 PM</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{identity.brandName} {identity.brandSub} © {new Date().getFullYear()}</span>
            <span>•</span>
            <span className="text-champagne-400/80">All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
