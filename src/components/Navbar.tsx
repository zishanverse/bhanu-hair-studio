"use client";

import React, { useState, useEffect } from "react";
import { Scissors, Menu, X, Calendar, Phone, ArrowUpRight } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function Navbar() {
  const { identity, contact } = SALON_CONFIG;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkStatus = () => {
      // Calculate Indian Standard Time (UTC + 5:30)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 3600000 * 5.5);
      const hour = ist.getHours();
      setIsOpenNow(hour >= 10 && hour < 22);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-500">
      <div
        className={`w-full px-6 md:px-12 py-4 flex items-center justify-between pointer-events-auto transition-all duration-500 ${
          isScrolled
            ? "bg-obsidian-950/85 backdrop-blur-xl border-b border-champagne-500/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5"
        }`}
      >
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-4 min-w-0">
          <a
            href="#"
            id="nav-brand-logo"
            className="group flex items-center gap-2.5 sm:gap-3 text-ivory-50 transition-opacity hover:opacity-90 min-w-0"
            aria-label="Bhanu Hair Studio Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border border-champagne-500/40 flex items-center justify-center bg-obsidian-900/60 backdrop-blur-md group-hover:border-champagne-400 group-hover:shadow-[0_0_15px_rgba(197,164,119,0.3)] transition-all duration-300">
              <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light text-ivory-100 group-hover:text-champagne-300 transition-colors truncate">
                {identity.brandName}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-champagne-400/90 -mt-0.5 sm:-mt-1 font-sans truncate">
                {identity.brandSub} · {identity.city.toUpperCase()}
              </span>
            </div>
          </a>

          {/* Live Salon Status Pill (Indore Local Time) */}
          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-champagne-500/25 glass-panel text-[10px] font-mono tracking-wider shrink-0">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOpenNow
                  ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  : "bg-amber-400"
              }`}
            />
            <span className="text-ivory-100">
              {isOpenNow ? "OPEN NOW · CLOSES 10 PM" : "OPENS 10:00 AM"}
            </span>
          </div>
        </div>

        {/* Center Navigation Links - Desktop */}
        <nav
          className="hidden lg:flex items-center gap-7 px-6 py-2 rounded-full glass-panel border border-champagne-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          aria-label="Main Navigation"
        >
          <a
            href="#studio"
            id="nav-link-studio"
            className="text-[11px] uppercase tracking-[0.2em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group"
          >
            The Studio
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#services"
            id="nav-link-services"
            className="text-[11px] uppercase tracking-[0.2em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group"
          >
            Expertise
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#experience"
            id="nav-link-experience"
            className="text-[11px] uppercase tracking-[0.2em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group"
          >
            Rituals
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#gallery"
            id="nav-link-gallery"
            className="text-[11px] uppercase tracking-[0.2em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group"
          >
            Look Archive
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#skincare"
            id="nav-link-skincare"
            className="text-[11px] uppercase tracking-[0.2em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group"
          >
            Beyond Hair
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#testimonials"
            id="nav-link-testimonials"
            className="text-[11px] uppercase tracking-[0.2em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group"
          >
            Voices
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <a
            href="#book"
            id="nav-cta-book-btn"
            className="hidden sm:inline-flex group relative items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full overflow-hidden text-xs uppercase tracking-[0.2em] font-medium text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_25px_rgba(197,164,119,0.5)] transition-all duration-500 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-3.5 h-3.5 text-obsidian-900 group-hover:scale-110 transition-transform" />
            <span>Book Appointment</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform pointer-events-none" />
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            className="lg:hidden p-2.5 rounded-full glass-panel border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="nav-mobile-drawer"
          className="lg:hidden pointer-events-auto px-6 py-8 mx-4 rounded-3xl glass-card border border-champagne-500/30 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-2xl"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>01. The Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>02. Our Expertise</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>03. Signature Rituals</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>04. Look Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#skincare"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>05. Beyond Hair</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>06. Client Voices</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          <div className="pt-4 border-t border-champagne-500/20 flex flex-col gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 text-xs tracking-widest text-champagne-300 font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>INDORE SALON DIRECT · {contact.displayPhone}</span>
            </a>
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-colors"
            >
              Reserve Experience
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
