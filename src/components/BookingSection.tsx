"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SALON_CONFIG } from "@/config/salon.config";
import { useMagnetic } from "@/lib/useMagnetic";
import { MessageCircle, Phone, MapPin, CheckCircle2, Send, Clock, Sparkles } from "lucide-react";

export function BookingSection() {
  const { booking, contact, identity } = SALON_CONFIG;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    outlet: "Palsikar Colony",
    service: "Hair Cut & Styling",
    date: "",
    time: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const archPortalRef = useRef<HTMLDivElement>(null);
  const keystoneLineRef = useRef<HTMLDivElement>(null);
  const whatsappBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  // Minimalist Proscenium Entrance Animation
  useEffect(() => {
    if (typeof window === "undefined" || !archPortalRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 1. Arch Portal Zooms in with Smooth Scroll Scrub
      gsap.fromTo(
        archPortalRef.current,
        { scale: 0.94, y: 40, opacity: 0.8 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "luxe",
          scrollTrigger: {
            trigger: archPortalRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // 2. Keystone horizontal gold hairline expansion
      if (keystoneLineRef.current) {
        gsap.fromTo(
          keystoneLineRef.current,
          { scaleX: 0, transformOrigin: "center center" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "luxe",
            scrollTrigger: {
              trigger: archPortalRef.current,
              start: "top 75%",
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Bhanu's The Hair Studio! I would like to reserve an appointment:%0A%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Studio Location: ${formData.outlet} (Indore)%0A• Service: ${formData.service}%0A• Preferred Date: ${formData.date || "Next available"}%0A• Preferred Time: ${formData.time || "Any"}`;
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
    setFormSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="book"
      data-stage="booking"
      aria-labelledby="booking-heading"
      className="relative z-10 w-full bg-obsidian-950/80 text-ivory-200 py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-champagne-500/10 via-champagne-500/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Minimalist Monumental Proscenium Arch */}
        <div
          ref={archPortalRef}
          className="rounded-t-[100px] sm:rounded-t-[160px] md:rounded-t-[200px] rounded-b-[28px] sm:rounded-b-[36px] border border-champagne-500/25 bg-gradient-to-b from-surface/70 via-obsidian-950/90 to-obsidian-950 p-6 sm:p-10 md:p-14 lg:p-16 relative overflow-hidden shadow-[0_40px_140px_rgba(0,0,0,0.95)] space-y-12 sm:space-y-16 will-change-transform"
        >
          {/* Keystone Gold Hairline */}
          <div
            ref={keystoneLineRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent pointer-events-none will-change-transform"
          />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <span className="text-[8px] font-mono tracking-widest text-champagne-400 uppercase">ATELIER RESERVATIONS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
          </div>

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto pt-6 sm:pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/20 text-champagne-300 text-[10px] tracking-ultra uppercase font-mono">
              <span>INDORE UNISEX SALON APPOINTMENTS</span>
            </div>

            <h2
              id="booking-heading"
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 tracking-tight leading-[1.0] sm:leading-[0.95]"
            >
              {booking.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {booking.headingLine2}
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-muted font-light max-w-xl mx-auto leading-relaxed">
              Reserve your personalized session across our 3 Indore ateliers. Open daily until 10:00 PM in Palsikar Colony, Saket Nagar, and Vijay Nagar.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
            {/* Magnetic WhatsApp Button */}
            <a
              ref={whatsappBtnRef}
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              id="booking-whatsapp-cta"
              data-cursor="WhatsApp"
              className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-obsidian-950 relative z-10" />
              <span className="relative z-10">Reserve on WhatsApp</span>
            </a>

            {/* Direct Studio Call Button */}
            <a
              href={`tel:${contact.phone}`}
              id="booking-call-cta"
              data-cursor="Call"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-100 border border-champagne-500/30 glass-panel hover:border-champagne-400 hover:text-champagne-300 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-champagne-400" />
              <span>Call: {contact.displayPhone}</span>
            </a>

            {/* Directions Link */}
            <a
              href={contact.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="booking-directions-cta"
              data-cursor="Maps"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-100 border border-champagne-500/30 glass-panel hover:border-champagne-400 hover:text-champagne-300 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-champagne-400" />
              <span>Directions (Palsikar)</span>
            </a>
          </div>

          {/* Studio Outlets & Inquiry Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-champagne-500/15">
            {/* Outlets Column */}
            <div className="lg:col-span-5 rounded-2xl bg-surface/30 border border-champagne-500/15 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                  OUR 3 INDORE LOCATIONS
                </span>
                <h3 className="font-serif text-2xl text-ivory-50">
                  {identity.brandName}
                </h3>
              </div>

              <div className="space-y-3">
                {SALON_CONFIG.outlets.map((outlet) => (
                  <div
                    key={outlet.id}
                    className="p-3.5 rounded-xl bg-obsidian-950/60 border border-champagne-500/15 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif text-champagne-200">
                        {outlet.name}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-champagne-400">
                        {outlet.area}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted font-light">
                      {outlet.address}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-champagne-500/15 flex items-center justify-between text-xs">
                <span className="text-ivory-200/90 font-light">Open Daily (Mon – Sun)</span>
                <span className="text-champagne-300 font-mono">10:00 AM – 10:00 PM</span>
              </div>
            </div>

            {/* Quick Request Form Column */}
            <div className="lg:col-span-7 rounded-2xl bg-surface/30 border border-champagne-500/15 p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                  PRE-BOOKING INQUIRY
                </span>
                <h3 className="font-serif text-2xl text-ivory-50">
                  Request a Dedicated Slot
                </h3>
                <p className="text-xs text-muted font-light">
                  Our salon concierge confirms your slot directly via WhatsApp within 30 minutes.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-surface/60 border border-champagne-400/40 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-champagne-400 mx-auto" />
                  <h4 className="font-serif text-2xl text-ivory-50">Request Dispatched</h4>
                  <p className="text-xs text-muted max-w-md mx-auto">
                    Your details have been forwarded to our salon WhatsApp desk. We look forward to welcoming you to Bhanu&apos;s The Hair Studio.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-name" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1 font-mono">
                        Your Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors placeholder:text-muted/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1 font-mono">
                        Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        inputMode="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors placeholder:text-muted/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-outlet" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1 font-mono">
                        Studio Location *
                      </label>
                      <select
                        id="booking-outlet"
                        value={formData.outlet}
                        onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors cursor-pointer"
                      >
                        <option value="Palsikar Colony">Palsikar Colony (Manik Bagh Rd)</option>
                        <option value="Saket Nagar">Saket Nagar (Near Saket Club)</option>
                        <option value="Vijay Nagar">Vijay Nagar (Near Orbit Mall / AB Rd)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="booking-service" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1 font-mono">
                        Preferred Ritual *
                      </label>
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors cursor-pointer"
                      >
                        <option value="Haircut & Styling">Haircut & Styling</option>
                        <option value="Beard Cutting & Trimming">Beard Cutting & Trimming</option>
                        <option value="Keratin Treatment">Keratin Treatment</option>
                        <option value="Hair Rebonding & Smoothing">Hair Rebonding & Smoothing</option>
                        <option value="Balayage & Hair Colouring">Balayage & Hair Colouring</option>
                        <option value="Bridal Make-up Services">Bridal Make-up Services</option>
                        <option value="Facials & Clean Up">Facials & Clean Up</option>
                        <option value="Spa Services & Pedicure">Spa Services & Pedicure</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-date" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1 font-mono">
                        Preferred Date
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-time" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1 font-mono">
                        Preferred Time
                      </label>
                      <input
                        id="booking-time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-cursor="Submit"
                    className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_25px_rgba(200,162,82,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send WhatsApp Reservation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
