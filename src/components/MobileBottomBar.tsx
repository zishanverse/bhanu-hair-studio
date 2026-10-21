"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function MobileBottomBar() {
  const [isBookInView, setIsBookInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Only show after initial scroll past hero (100px) so it doesn't clutter first screen
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Auto-hide when the booking section is already in view to avoid redundant actions
    const bookEl = document.getElementById("book");
    if (!bookEl || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(bookEl);
    return () => observer.disconnect();
  }, []);

  const whatsappHref = `https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SALON_CONFIG.contact.whatsappPrefill
  )}`;

  const isVisible = hasScrolled && !isBookInView;

  return (
    <aside
      aria-label="Quick Mobile Actions"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-obsidian-950/95 backdrop-blur-2xl border-t border-champagne-500/25 px-4 pt-2.5 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.9)]">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
          {/* 1. Direct Studio Call */}
          <a
            href={`tel:${SALON_CONFIG.contact.phone}`}
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl bg-obsidian-900/90 border border-champagne-500/20 text-ivory-200 active:bg-champagne-500/10 active:scale-95 transition-all min-h-[46px]"
            aria-label="Call Bhanu's The Hair Studio"
          >
            <Phone className="w-4 h-4 text-champagne-400" />
            <span className="text-[10px] uppercase tracking-wider font-medium font-sans">Call</span>
          </a>

          {/* 2. WhatsApp Consultation */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl bg-obsidian-900/90 border border-champagne-500/20 text-ivory-200 active:bg-champagne-500/10 active:scale-95 transition-all min-h-[46px]"
            aria-label="Chat on WhatsApp with salon concierge"
          >
            <MessageCircle className="w-4 h-4 text-champagne-400" />
            <span className="text-[10px] uppercase tracking-wider font-medium font-sans">WhatsApp</span>
          </a>

          {/* 3. Primary Booking Action */}
          <a
            href="#book"
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-champagne-300 to-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(200,162,82,0.4)] active:scale-95 transition-all min-h-[46px]"
            aria-label="Reserve appointment at Bhanu's The Hair Studio"
          >
            <Calendar className="w-4 h-4 text-obsidian-950" />
            <span className="text-[10px] uppercase tracking-wider font-bold font-sans">Book Now</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default MobileBottomBar;
