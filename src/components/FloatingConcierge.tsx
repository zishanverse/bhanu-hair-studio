"use client";

import React, { useState, useEffect } from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { MessageCircle } from "lucide-react";

export function FloatingConcierge() {
  const [shown, setShown] = useState(false);
  const [isBookInView, setIsBookInView] = useState(false);

  useEffect(() => {
    // Show concierge button after initial hero scroll or 1.2s
    const timer = setTimeout(() => setShown(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Fade out while #book is in view to eliminate UI overlap
  useEffect(() => {
    const bookEl = document.getElementById("book");
    if (!bookEl || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(bookEl);
    return () => observer.disconnect();
  }, []);

  const whatsappHref = `https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SALON_CONFIG.contact.whatsappPrefill
  )}`;

  const shouldBeVisible = shown && !isBookInView;

  return (
    <aside
      aria-label="Salon Concierge Desk"
      className={`hidden md:block fixed md:bottom-8 md:right-8 z-40 transition-all duration-500 transform ${
        shouldBeVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="WhatsApp"
        aria-label="Direct WhatsApp Concierge Consultation"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.5),0_12px_36px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(255,255,255,0.25)]"
        style={{
          background: "radial-gradient(120% 120% at 32% 24%, #4fe085 0%, #25d366 48%, #17b053 100%)",
        }}
      >
        {/* Concentric Pulse Ring */}
        <span
          className="animate-wa-pulse absolute inset-0 rounded-full border border-[#25d366] pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 fill-white text-transparent relative z-10 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />

        {/* Hover Tooltip / Status Badge */}
        <span
          className="absolute right-full mr-3.5 px-3 py-1.5 rounded-full text-[10px] font-sans font-medium uppercase tracking-[0.2em] whitespace-nowrap bg-obsidian-900/90 text-ivory-50 border border-champagne-500/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_4px_18px_rgba(0,0,0,0.7)]"
        >
          Concierge Online
        </span>
      </a>
    </aside>
  );
}

export default FloatingConcierge;
