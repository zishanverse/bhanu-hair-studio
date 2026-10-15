"use client";

import React, { useState, useEffect } from "react";
import { Scissors, Menu, X, Calendar, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function Navbar() {
  const { identity, contact } = SALON_CONFIG;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div
          className={`w-full rounded-full flex items-center justify-between px-5 sm:px-7 py-2.5 sm:py-3 pointer-events-auto transition-all duration-500 ${isScrolled
            ? "bg-obsidian-950/85 backdrop-blur-2xl border border-champagne-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
            : "bg-obsidian-950/40 backdrop-blur-md border border-white/5"
            }`}
        >
          {/* 1. Brand Logo & Integrated Live Status Indicator */}
          <a
            href="#"
            id="nav-brand-logo"
            className="group flex items-center gap-3 text-ivory-50 transition-opacity hover:opacity-95 shrink-0"
            aria-label="Bhanu's The Hair Studio Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-champagne-500/40 flex items-center justify-center bg-obsidian-900/80 backdrop-blur-md group-hover:border-champagne-400 group-hover:shadow-[0_0_15px_rgba(197,164,119,0.35)] transition-all duration-300">
              <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase font-light text-ivory-50 group-hover:text-champagne-300 transition-colors">
                  {identity.brandName}
                </span>
                {/* Micro Live Dot */}
                <span
                  title={isOpenNow ? "Open Today · Closes 10:00 PM" : "Opens at 10:00 AM"}
                  className="inline-flex items-center gap-1.5"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isOpenNow
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
                      : "bg-amber-400"
                      }`}
                  />
                  <span className="hidden xl:inline text-[9px] font-mono tracking-wider text-champagne-400">
                    {isOpenNow ? "OPEN TIL 10PM" : "OPENS 10AM"}
                  </span>
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-champagne-400 -mt-0.5 font-sans font-medium">
                HAIR STUDIO · INDORE
              </span>
            </div>
          </a>

          {/* 2. De-congested Center Navigation Links - Desktop */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 px-5 py-1.5 rounded-full bg-surface/50 border border-white/5"
            aria-label="Main Navigation"
          >
            <a
              href="#studio"
              id="nav-link-studio"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group font-light"
            >
              The Studio
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#services"
              id="nav-link-services"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group font-light"
            >
              Rituals & Services
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#gallery"
              id="nav-link-gallery"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group font-light"
            >
              Look Archive
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#testimonials"
              id="nav-link-testimonials"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory-200/80 hover:text-champagne-300 transition-colors relative py-1 group font-light"
            >
              Stories
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-champagne-400 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* 3. Right Action - Book Appointment & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${contact.phone}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-champagne-500/20 text-[10px] font-mono tracking-wider text-ivory-200 hover:text-champagne-300 hover:border-champagne-400 transition-colors"
              title="Call Studio Direct"
            >
              <Phone className="w-3 h-3 text-champagne-400" />
              <span>{contact.displayPhone}</span>
            </a>

            <a
              href="#book"
              id="nav-cta-book-btn"
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full overflow-hidden text-[11px] uppercase tracking-[0.2em] font-medium text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_20px_rgba(197,164,119,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5 text-obsidian-900 group-hover:scale-110 transition-transform" />
              <span>Reserve</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform pointer-events-none" />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle"
              className="md:hidden p-2 rounded-full bg-surface/80 border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="nav-mobile-drawer"
          className="md:hidden pointer-events-auto px-6 py-8 mx-4 mt-3 rounded-3xl glass-card border border-champagne-500/30 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-2xl"
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
              <span>02. Rituals & Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>03. Japanese Scissors Ritual</span>
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
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-sm uppercase tracking-[0.25em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
            >
              <span>05. Client Stories</span>
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
              className="w-full text-center py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-colors shadow-[0_0_20px_rgba(197,164,119,0.3)]"
            >
              Reserve Experience
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
