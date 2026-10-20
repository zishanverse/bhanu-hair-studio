"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SALON_CONFIG } from "@/config/salon.config";
import { MessageCircle, Phone, MapPin, Calendar, Clock, CheckCircle2, Sparkles, Send } from "lucide-react";

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

  // Reposé Grand Finale Arch Portal Mask & Expansion Animation (Video 02:02 – 02:14)
  useEffect(() => {
    if (typeof window === "undefined" || !archPortalRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Arch Portal Zooms in with Smooth Scroll Scrub
      gsap.fromTo(
        archPortalRef.current,
        { scale: 0.92, y: 50, opacity: 0.75 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: archPortalRef.current,
            start: "top 90%",
            end: "top 25%",
            scrub: 1.2,
          },
        }
      );

      // 2. Keystone horizontal laser hairline expansion
      if (keystoneLineRef.current) {
        gsap.fromTo(
          keystoneLineRef.current,
          { scaleX: 0, transformOrigin: "center center" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: archPortalRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp direct link with form details
    const text = `Hello Bhanu's The Hair Studio! I would like to book an appointment:%0A%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Preferred Outlet: ${formData.outlet} (Indore)%0A• Service: ${formData.service}%0A• Preferred Date: ${formData.date || "Next available"}%0A• Preferred Time: ${formData.time || "Any"}`;
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
    setFormSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative z-10 w-full bg-obsidian-950/20 text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/20 overflow-hidden"
    >
      {/* Subtle champagne light reflections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-champagne-500/10 via-champagne-500/5 to-transparent blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-champagne-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Reposé-Inspired Monumental Arch Portal Proscenium */}
        <div
          ref={archPortalRef}
          className="rounded-t-[120px] sm:rounded-t-[180px] md:rounded-t-[240px] rounded-b-[32px] sm:rounded-b-[40px] border border-champagne-500/30 bg-gradient-to-b from-surface/60 via-obsidian-950/80 to-obsidian-950/95 p-6 sm:p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_40px_140px_rgba(0,0,0,0.95)] space-y-12 sm:space-y-16 will-change-transform"
        >
          {/* Subtle Arch Keystones & Laser Radial Glow */}
          <div
            ref={keystoneLineRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent pointer-events-none will-change-transform"
          />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <span className="text-[8px] font-mono tracking-widest text-champagne-400 uppercase">ATELIER PORTAL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
          </div>

          {/* Section Header */}
          <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto pt-6 sm:pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 text-[10px] sm:text-xs tracking-ultra uppercase font-mono">
              <span>CONSULTATION & RESERVATIONS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.92]">
              {booking.headingLine1} <br />
              <span className="italic font-normal text-champagne-300 font-serif">
                {booking.headingLine2}
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-muted font-light max-w-xl mx-auto leading-relaxed px-2">
              {booking.subtext}
            </p>
          </div>

          {/* Primary Action Buttons (WhatsApp, Phone, Directions) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
          {/* Primary WhatsApp Action Button */}
          <a
            href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappPrefill)}`}
            target="_blank"
            rel="noopener noreferrer"
            id="booking-whatsapp-cta"
            className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full overflow-hidden text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_35px_rgba(197,164,119,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian-950 relative z-10" />
            <span className="relative z-10">Book on WhatsApp</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform pointer-events-none" />
          </a>

          {/* Call Studio Button */}
          <a
            href={`tel:${contact.phone}`}
            id="booking-call-cta"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-100 border border-champagne-500/30 glass-panel hover:border-champagne-400 hover:text-champagne-300 hover:bg-surface/80 transition-all"
          >
            <Phone className="w-4 h-4 text-champagne-400" />
            <span>Call: {contact.displayPhone}</span>
          </a>

          {/* Get Directions Button */}
          <a
            href={contact.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="booking-directions-cta"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-100 border border-champagne-500/30 glass-panel hover:border-champagne-400 hover:text-champagne-300 hover:bg-surface/80 transition-all"
          >
            <MapPin className="w-4 h-4 text-champagne-400" />
            <span>Get Directions (Indore)</span>
          </a>
        </div>

        {/* Studio Info & Quick Request Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          {/* Studio Details / 3 Indore Outlets */}
          <div className="lg:col-span-5 rounded-3xl glass-card border border-champagne-500/20 p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                  OUR INDORE STUDIOS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-medium">
                  3 ACTIVE OUTLETS
                </span>
              </div>
              <h3 className="font-serif text-2xl text-ivory-50">
                {identity.brandName}
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Choose any of our three luxury unisex studios in Indore for your styling appointment.
              </p>
            </div>

            {/* 3 Outlets Compact List */}
            <div className="space-y-3 pt-2">
              {SALON_CONFIG.outlets.map((outlet) => (
                <div
                  key={outlet.id}
                  className="p-3.5 rounded-2xl glass-panel border border-champagne-500/20 space-y-1"
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

            <div className="space-y-3 pt-3 border-t border-champagne-500/15">
              <div className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                STUDIO HOURS
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ivory-200 font-light">All Outlets (Mon – Sun)</span>
                <span className="text-champagne-300 font-mono">10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Appointment Reservation Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl glass-card border border-champagne-500/20 p-6 sm:p-8 md:p-10 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                INSTANT INQUIRY
              </span>
              <h3 className="font-serif text-2xl text-ivory-50">
                Request a Preferred Time
              </h3>
              <p className="text-xs text-muted font-light">
                Our salon concierge will confirm your slot within 30 minutes via WhatsApp.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl glass-panel border border-champagne-400/40 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-champagne-400 mx-auto" />
                <h4 className="font-serif text-2xl text-ivory-50">Inquiry Dispatched</h4>
                <p className="text-xs text-muted max-w-md mx-auto">
                  Your details have been forwarded to our WhatsApp desk. We look forward to welcoming you to Bhanu&apos;s The Hair Studio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1.5 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400/40 transition-colors placeholder:text-muted/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1.5 font-mono">
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
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400/40 transition-colors placeholder:text-muted/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-outlet" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1.5 font-mono">
                      Select Studio Location *
                    </label>
                    <select
                      id="booking-outlet"
                      value={formData.outlet}
                      onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400/40 transition-colors"
                    >
                      <option value="Palsikar Colony">Palsikar Colony (Manik Bagh Rd)</option>
                      <option value="Saket Nagar">Saket Nagar (Near Saket Club)</option>
                      <option value="Vijay Nagar">Vijay Nagar (Near Orbit Mall / AB Rd)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="booking-service" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1.5 font-mono">
                      Preferred Discipline *
                    </label>
                    <select
                      id="booking-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400/40 transition-colors"
                    >
                      <option value="Haircut & Styling">Haircut & Styling</option>
                      <option value="Beard Cutting & Beard Trimming">Beard Cutting & Beard Trimming</option>
                      <option value="Blow dry & Hairstyling">Blow dry & Hairstyling</option>
                      <option value="Keratin Treatment">Keratin Treatment</option>
                      <option value="Hair Rebonding & Hair Smoothing">Hair Rebonding & Hair Smoothing</option>
                      <option value="Hair Colouring & Balayage">Hair Colouring & Balayage</option>
                      <option value="Texture Services & Herbal Treat">Texture Services & Herbal Treat</option>
                      <option value="Hair Studio Care & Hair Treatments">Hair Studio Care & Hair Treatments</option>
                      <option value="Bridal Services & Make-up Services">Bridal Services & Make-up Services</option>
                      <option value="Eyelashes & Eyebrow Beautification">Eyelashes & Eyebrow Beautification</option>
                      <option value="Nail Art">Nail Art</option>
                      <option value="Facials & Clean Up">Facials & Clean Up</option>
                      <option value="Acne Treatments">Acne Treatments</option>
                      <option value="Spa Services & Pedicure">Spa Services & Pedicure</option>
                      <option value="Relaxing Massage">Relaxing Massage</option>
                      <option value="Body Waxing & Waxing Oil Wax">Body Waxing & Waxing Oil Wax</option>
                      <option value="Men's Salon Grooming">Men&apos;s Salon Grooming</option>
                      <option value="Home Services">Home Services (Bespoke In-Residence)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-date" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1.5 font-mono">
                      Preferred Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-time" className="block text-[10px] tracking-widest uppercase text-champagne-300 mb-1.5 font-mono">
                      Preferred Time
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-base sm:text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400/40 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_25px_rgba(197,164,119,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reservation Request</span>
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
