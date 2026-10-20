"use client";

import React, { useState, useEffect, useRef } from "react";
import { Scissors, Menu, X, Calendar, Phone, ArrowUpRight } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";
import { useMagnetic } from "@/lib/useMagnetic";

export function Navbar() {
  const { identity, contact } = SALON_CONFIG;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isOpenNow, setIsOpenNow] = useState(true);

  const lastScrollYRef = useRef<number>(0);
  const reserveBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollYRef.current + 10) {
          // Scrolling down
          setIsVisible(false);
        } else if (currentScrollY < lastScrollYRef.current - 10) {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = ["studio", "services", "experience", "gallery", "skincare", "testimonials", "book"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Live IST Open/Closed indicator
  useEffect(() => {
    const checkStatus = () => {
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
    <header
      className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div
          className={`w-full rounded-full grid grid-cols-12 items-center px-4 sm:px-6 py-2 sm:py-2.5 pointer-events-auto transition-all duration-500 ${
            isScrolled
              ? "bg-obsidian-950/90 backdrop-blur-2xl border border-champagne-500/25 shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
              : "bg-obsidian-950/50 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* 1. Left: Brand Logo & Live Status */}
          <div className="col-span-7 sm:col-span-5 lg:col-span-3 flex items-center justify-start">
            <a
              href="/"
              id="nav-brand-logo"
              className="group flex items-center gap-2.5 sm:gap-3 text-ivory-50 transition-opacity hover:opacity-95 shrink-0"
              aria-label="Bhanu's The Hair Studio Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-champagne-500/40 flex items-center justify-center bg-obsidian-900/80 backdrop-blur-md group-hover:border-champagne-400 group-hover:shadow-[0_0_15px_rgba(197,164,119,0.35)] transition-all duration-300">
                <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-serif text-base sm:text-lg md:text-xl tracking-[0.16em] uppercase font-light text-ivory-50 group-hover:text-champagne-300 transition-colors">
                    {identity.brandName}
                  </span>
                  {/* Micro Live Dot */}
                  <span
                    title={isOpenNow ? "Open Today · Closes 10:00 PM" : "Opens at 10:00 AM"}
                    className="inline-flex items-center gap-1"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isOpenNow
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
                          : "bg-amber-400"
                      }`}
                    />
                    <span className="hidden xl:inline text-[9px] font-mono tracking-wider text-champagne-400">
                      {isOpenNow ? "OPEN" : "10AM"}
                    </span>
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-champagne-400 -mt-0.5 font-sans font-medium">
                  STUDIO & ACADEMY · INDORE
                </span>
              </div>
            </a>
          </div>

          {/* 2. Center: Mathematically Centered Navigation Links with Active Highlighting */}
          <div className="hidden lg:flex lg:col-span-6 items-center justify-center">
            <nav
              className="flex items-center gap-3 xl:gap-5 px-5 py-2 rounded-full bg-surface/70 border border-champagne-500/15 backdrop-blur-md shadow-sm"
              aria-label="Main Navigation"
            >
              {[
                { href: "/#studio", id: "studio", label: "Studio" },
                { href: "/#services", id: "services", label: "Rituals" },
                { href: "/bhanushairacademy", id: "academy", label: "Academy", isAcademy: true },
                { href: "/#gallery", id: "gallery", label: "Looks" },
                { href: "/#skincare", id: "skincare", label: "Beyond Hair" },
                { href: "/#testimonials", id: "testimonials", label: "Stories" },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    id={`nav-link-${item.id}`}
                    className={`text-[10px] xl:text-[11px] uppercase tracking-[0.16em] transition-colors relative py-0.5 group font-light flex items-center gap-1.5 ${
                      isActive ? "text-champagne-300 font-medium" : "text-ivory-200/80 hover:text-champagne-300"
                    }`}
                  >
                    {item.isAcademy && (
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                    )}
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-1/2 h-[1px] bg-champagne-400 -translate-x-1/2 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* 3. Right: Action Button & Mobile Drawer Toggle */}
          <div className="col-span-5 sm:col-span-7 lg:col-span-3 flex items-center justify-end gap-2.5 sm:gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-champagne-500/20 text-[10px] font-mono tracking-wider text-ivory-200 hover:text-champagne-300 hover:border-champagne-400 transition-colors"
              title="Call Studio Direct"
            >
              <Phone className="w-3 h-3 text-champagne-400" />
              <span>{contact.displayPhone}</span>
            </a>

            <a
              ref={reserveBtnRef}
              href="/#book"
              id="nav-cta-book-btn"
              data-cursor="Reserve Seat"
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-full overflow-hidden text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_20px_rgba(197,164,119,0.45)] transition-all duration-300 transform active:scale-95 shrink-0 cursor-pointer"
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
              className="lg:hidden p-2 rounded-full bg-surface/80 border border-champagne-500/30 text-champagne-300 hover:text-ivory-50 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-obsidian-950/85 backdrop-blur-md z-40 pointer-events-auto animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="nav-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="lg:hidden relative z-50 pointer-events-auto px-6 py-8 mx-4 mt-3 rounded-3xl glass-card border border-champagne-500/35 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex flex-col space-y-4">
              <a
                href="/bhanushairacademy"
                onClick={() => setMobileMenuOpen(false)}
                className="group text-sm uppercase tracking-[0.22em] text-champagne-300 font-medium py-1 flex items-center justify-between border-b border-champagne-500/20 pb-3"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                  Bhanu&apos;s Hair Academy (Courses)
                </span>
                <ArrowUpRight className="w-4 h-4 text-champagne-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              {[
                { href: "/#studio", label: "01. The Studio" },
                { href: "/#services", label: "02. Rituals & Directory" },
                { href: "/#experience", label: "03. Japanese Scissors Ritual" },
                { href: "/#gallery", label: "04. Look Archive" },
                { href: "/#skincare", label: "05. Beyond Hair (Skincare)" },
                { href: "/#testimonials", label: "06. Client Stories" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group text-sm uppercase tracking-[0.22em] text-ivory-100 hover:text-champagne-300 transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400/50 group-hover:text-champagne-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
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
                href="/#book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-colors shadow-[0_0_20px_rgba(197,164,119,0.3)]"
              >
                Reserve Experience
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
