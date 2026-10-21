"use client";

import React, { useState, useRef } from "react";
import { SALON_CONFIG } from "@/config/salon.config";
import { MessageCircle, Phone, MapPin, Send, Clock, Sparkles, Navigation, ArrowUpRight, Check } from "lucide-react";

export function BookingSection() {
  const { outlets, contact } = SALON_CONFIG;
  const [selectedOutletId, setSelectedOutletId] = useState<string>("palsikar");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Haircut",
    date: "",
    time: "",
    notes: "",
    website_hp: "", // Honeypot field
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isDispatched, setIsDispatched] = useState(false);
  const [dispatchedUrl, setDispatchedUrl] = useState<string>("");

  const sectionRef = useRef<HTMLElement>(null);

  const activeOutlet = outlets.find((o) => o.id === selectedOutletId) || outlets[0];

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (minimum 2 characters).";
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bot trap: if honeypot is filled, silently ignore
    if (formData.website_hp) {
      return;
    }

    if (!validate()) {
      return;
    }

    const prefillMessage = [
      `Hello Bhanu's The Hair Studio (${activeOutlet.name})!`,
      `I would like to reserve an appointment:`,
      `• Name: ${formData.name}`,
      `• Phone: ${formData.phone}`,
      `• Studio Location: ${activeOutlet.name} (${activeOutlet.area}, Indore)`,
      `• Service: ${formData.service}`,
      `• Preferred Date: ${formData.date || "Earliest available"}`,
      `• Preferred Time: ${formData.time || "Any time"}`,
      formData.notes ? `• Additional Note: ${formData.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(prefillMessage)}`;
    setDispatchedUrl(url);
    setIsDispatched(true);

    // Open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="book"
      data-stage="booking"
      aria-labelledby="booking-heading"
      className="relative z-10 w-full bg-obsidian-950/80 text-ivory-200 py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-champagne-500/15"
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
            <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-sans font-medium">
              RESERVATIONS & INQUIRIES
            </span>
            <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
          </div>

          <h2
            id="booking-heading"
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-50 tracking-tight leading-[1.0]"
          >
            YOUR NEXT LOOK <br />
            <span className="italic font-normal text-champagne-300 font-serif">
              STARTS HERE.
            </span>
          </h2>

          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl mx-auto">
            Select your preferred Indore studio. Submitting prepares your appointment details and opens WhatsApp directly with our front desk.
          </p>
        </div>

        {/* 2-Column Booking Box: Left Studio Selector, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Studio Details & Direct Call */}
          <div className="lg:col-span-5 rounded-3xl glass-card border border-champagne-500/25 p-6 sm:p-8 space-y-6 bg-surface/50">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase text-champagne-400 font-sans">
                SELECTED STUDIO
              </span>
              <h3 className="font-serif text-2xl text-ivory-50">
                {activeOutlet.name}
              </h3>
            </div>

            {/* Quick Studio Selector Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-muted font-sans block">
                Choose Location:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {outlets.map((outlet) => {
                  const isSelected = outlet.id === selectedOutletId;
                  return (
                    <button
                      key={outlet.id}
                      type="button"
                      onClick={() => setSelectedOutletId(outlet.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer min-h-[44px] ${
                        isSelected
                          ? "bg-champagne-500/15 border-champagne-400 text-ivory-50 shadow-md"
                          : "bg-obsidian-950/60 border-champagne-500/15 text-muted hover:text-ivory-100 hover:border-champagne-500/30"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-serif font-medium text-ivory-100">
                          {outlet.name}
                        </div>
                        <div className="text-[10px] font-sans text-muted">
                          {outlet.area} · {outlet.landmark || "Indore"}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-champagne-400 text-obsidian-950 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Outlet Details */}
            <div className="space-y-3 pt-3 border-t border-champagne-500/15 text-xs text-ivory-200/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{activeOutlet.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300/90 font-medium">{activeOutlet.hours}</span>
              </div>
            </div>

            {/* Direct Phone & Navigation Links */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${activeOutlet.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-full text-xs uppercase tracking-wider font-medium text-ivory-100 bg-obsidian-950 border border-champagne-500/30 hover:border-champagne-400 hover:text-white transition-all min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5 text-champagne-400" />
                <span>Call Studio</span>
              </a>

              <a
                href={activeOutlet.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-full text-xs uppercase tracking-wider font-medium text-ivory-100 bg-obsidian-950 border border-champagne-500/30 hover:border-champagne-400 hover:text-white transition-all min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-champagne-400" />
                <span>Directions</span>
                <ArrowUpRight className="w-3 h-3 text-champagne-400/60" />
              </a>
            </div>
          </div>

          {/* Right Column: Honest Appointment Booking Form */}
          <div className="lg:col-span-7 rounded-3xl glass-card border border-champagne-500/25 p-6 sm:p-8 md:p-10 bg-surface/50 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase text-champagne-400 font-sans">
                WHATSAPP APPOINTMENT DESK
              </span>
              <h3 className="font-serif text-2xl text-ivory-50">
                Reserve With Our Concierge
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Fill in your details below. We do not store your data on external servers; this form opens WhatsApp directly with your pre-filled inquiry.
              </p>
            </div>

            {isDispatched ? (
              /* Honest Dispatched Feedback Screen */
              <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-950/80 border border-champagne-400/40 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mx-auto">
                  <MessageCircle className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-2xl text-ivory-50">
                    Opening WhatsApp With Your Details…
                  </h4>
                  <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                    Please tap &ldquo;Send&rdquo; inside WhatsApp to dispatch your appointment request to our front desk at <span className="text-champagne-300 font-medium">{activeOutlet.name}</span>.
                  </p>
                </div>

                {/* Fallback button if popup was blocked */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={dispatchedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-all min-h-[44px]"
                  >
                    <span>Tap here if WhatsApp didn&apos;t open</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsDispatched(false)}
                    className="w-full sm:w-auto px-4 py-3 rounded-full text-xs uppercase tracking-wider font-light text-muted hover:text-white transition-colors min-h-[44px]"
                  >
                    Modify Details
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field for spam prevention (invisible to humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Leave this empty</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-name"
                      className="block text-xs uppercase tracking-wider text-ivory-200 font-sans font-medium"
                    >
                      Full Name <span className="text-champagne-400">*</span>
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Vikram Malhotra"
                      className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-sm text-ivory-50 focus:outline-none transition-colors placeholder:text-muted/50 ${
                        errors.name
                          ? "border-red-500 focus:border-red-400"
                          : "border-champagne-500/25 focus:border-champagne-400"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 font-sans pt-0.5">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs uppercase tracking-wider text-ivory-200 font-sans font-medium"
                    >
                      Phone Number <span className="text-champagne-400">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+91 98765 00000"
                      className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-sm text-ivory-50 focus:outline-none transition-colors placeholder:text-muted/50 ${
                        errors.phone
                          ? "border-red-500 focus:border-red-400"
                          : "border-champagne-500/25 focus:border-champagne-400"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 font-sans pt-0.5">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-service"
                    className="block text-xs uppercase tracking-wider text-ivory-200 font-sans font-medium"
                  >
                    Preferred Service <span className="text-champagne-400">*</span>
                  </label>
                  <select
                    id="booking-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-sm text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors cursor-pointer"
                  >
                    <option value="Haircut">Haircut (from ₹500)</option>
                    <option value="Beard Cutting & Trimming">Beard Cutting & Trimming (from ₹350)</option>
                    <option value="Keratin Treatment">Keratin Treatment (from ₹3,500)</option>
                    <option value="Hair Rebonding & Smoothing">Hair Rebonding & Smoothing (from ₹4,500)</option>
                    <option value="Balayage & Creative Colour">Balayage & Creative Colour (from ₹4,000)</option>
                    <option value="Bridal Make-up Services">Bridal Make-up Services (from ₹8,000)</option>
                    <option value="Clean Up & Facials">Clean Up & Facials (from ₹800)</option>
                    <option value="Head Spa & Pedicure">Head Spa & Pedicure (from ₹800)</option>
                  </select>
                </div>

                {/* Native Date & Time Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-date"
                      className="block text-xs uppercase tracking-wider text-ivory-200 font-sans font-medium"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-sm text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-time"
                      className="block text-xs uppercase tracking-wider text-ivory-200 font-sans font-medium"
                    >
                      Preferred Time
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-champagne-500/25 text-sm text-ivory-50 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_25px_rgba(200,162,82,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Open WhatsApp Appointment Chat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
