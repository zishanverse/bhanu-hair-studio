"use client";

import React, { useState } from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { MessageCircle, Phone, MapPin, Calendar, Clock, CheckCircle2, Sparkles, Send } from "lucide-react";

export function BookingSection() {
  const { booking, contact, identity } = SALON_CONFIG;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Hair Cut & Styling",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp direct link with form details
    const text = `Hello Bhanu Hair Studio! I would like to book an appointment:%0A%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Service: ${formData.service}%0A• Preferred Date: ${formData.date || "Next available"}%0A• Preferred Time: ${formData.time || "Any"}`;
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
    setFormSubmitted(true);
  };

  return (
    <section
      id="book"
      className="relative w-full bg-surface text-ivory-200 py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-champagne-500/20 overflow-hidden"
    >
      {/* Subtle champagne light reflections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-champagne-500/10 via-champagne-500/5 to-transparent blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-champagne-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 text-[10px] sm:text-xs tracking-ultra uppercase font-mono">
            <span>CONSULTATION & RESERVATIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-ivory-50 tracking-tight leading-[1.05] sm:leading-[0.95]">
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
            className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_35px_rgba(197,164,119,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian-950" />
            <span>Book on WhatsApp</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform" />
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
          {/* Studio Details / Operating Hours */}
          <div className="lg:col-span-5 rounded-3xl glass-card border border-champagne-500/20 p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                STUDIO LOCATION
              </span>
              <h3 className="font-serif text-2xl text-ivory-50">
                {identity.brandName} {identity.brandSub}
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                {contact.address.line1}, {contact.address.line2}, {contact.address.city}, {contact.address.state} — {contact.address.pincode}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-champagne-500/15">
              <div className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono">
                OPERATING HOURS
              </div>
              {contact.hours.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-ivory-200 font-light">{h.days}</span>
                  <span className="text-champagne-300 font-mono">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl glass-panel border border-champagne-500/15 text-[11px] text-muted font-light">
              Valet parking and private consultation rooms available on arrival.
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
                  Your details have been forwarded to our WhatsApp desk. We look forward to welcoming you to Bhanu Hair Studio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted mb-1.5 font-mono">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/20 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted mb-1.5 font-mono">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/20 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted mb-1.5 font-mono">
                      Preferred Discipline
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/20 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                    >
                      <option value="Hair Cut & Styling">Hair Cut & Styling</option>
                      <option value="Advanced Hair Cut">Advanced Hair Cut</option>
                      <option value="Hair Highlights & Balayage">Hair Highlights & Balayage</option>
                      <option value="Volume Explosion Hair Treatment">Volume Explosion Hair Treatment</option>
                      <option value="Hair Spa & Scalp Detox">Hair Spa & Scalp Detox</option>
                      <option value="Facial / Clean Up">Signature Facial / Clean Up</option>
                      <option value="Complete Bespoke Makeover">Complete Bespoke Makeover</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-muted mb-1.5 font-mono">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/20 text-xs text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 hover:shadow-[0_0_25px_rgba(197,164,119,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reservation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
