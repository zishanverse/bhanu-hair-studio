"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LuxuryCursor } from "@/components/LuxuryCursor";
import { SALON_CONFIG, AcademyCourse } from "@/config/salon.config";
import {
  Scissors,
  Sparkles,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  Phone,
  MapPin,
  ChevronDown,
  Layers,
  GraduationCap,
  Briefcase,
  Star,
  Send,
} from "lucide-react";

export function AcademyClientPage() {
  const { academy, contact, outlets } = SALON_CONFIG;
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "Grand Diploma in Salon Cosmetology",
    city: "Indore",
    message: "",
  });

  const filterTabs = [
    { id: "All", label: "All Programs" },
    { id: "Hair", label: "Hair Artistry" },
    { id: "Makeup", label: "Pro Makeup" },
    { id: "Skin", label: "Skin & Medi-Facials" },
    { id: "Nails", label: "Nail Art & Tech" },
    { id: "Master Diploma", label: "Grand Diploma" },
  ];

  const filteredCourses =
    activeFilter === "All"
      ? academy.courses
      : academy.courses.filter((c) => c.discipline === activeFilter);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Bhanu's Hair Academy! I am interested in enrolling for professional salon training:%0A%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Course: ${formData.course}%0A• City: ${formData.city}%0A• Note: ${formData.message || "Please share batch dates and syllabus."}`;
    window.open(
      `https://wa.me/${contact.whatsappNumber}?text=${message}`,
      "_blank"
    );
    setFormSubmitted(true);
  };

  const disciplines = [
    {
      name: "Hair Design & Chemical Artistry",
      subtitle: "Precision cuts, balayage, keratin, nanoplastia & fading",
      image: "/images/cat-men.jpg",
      icon: Scissors,
      count: "3 Comprehensive Modules",
    },
    {
      name: "Pro Makeup & Bridal Aesthetics",
      subtitle: "HD bridal, airbrush, royal reception & runway glam",
      image: "/images/cat-beauty.jpg",
      icon: Sparkles,
      count: "HD & Airbrush Certified",
    },
    {
      name: "Clinical Skin Care & Dermo-Esthetics",
      subtitle: "Hydra-facials, peels, dermal extraction & glow rituals",
      image: "/images/skin-facial.jpg",
      icon: Layers,
      count: "Clinical Medi-Facial Bays",
    },
    {
      name: "Artisan Nail Technology & 3D Art",
      subtitle: "Acrylic sculpting, gel extensions, chrome & encapsulation",
      image: "/images/cat-color.jpg",
      icon: Award,
      count: "Trending Salon Extensions",
    },
  ];

  return (
    <main className="relative min-h-screen bg-obsidian-950 text-ivory-50 overflow-x-hidden selection:bg-champagne-500/30 selection:text-champagne-200">
      {/* 0. Magnetic Cursor */}
      <LuxuryCursor />

      {/* 1. Header Navigation */}
      <Navbar />

      {/* Ambient Gold Halo Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-champagne-500/8 blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-0 w-[600px] h-[600px] bg-champagne-500/5 blur-[200px] pointer-events-none z-0" />

      {/* ======================================================== */}
      {/* HERO SECTION                                             */}
      {/* ======================================================== */}
      <section className="relative z-10 pt-36 sm:pt-44 md:pt-48 pb-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-champagne-500/15">
        <div className="space-y-8 max-w-4xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-champagne-500/30 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-champagne-300 font-mono font-medium">
              HAIR SALON & PROFESSIONAL TRAINING ACADEMY · INDORE
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory-50 tracking-tight leading-[1.0] sm:leading-[0.95]">
              {academy.headlineLine1} <br />
              <span className="italic font-normal text-champagne-400 font-serif">
                {academy.headlineLine2}
              </span>
            </h1>

            <p className="text-base sm:text-xl text-champagne-200 font-light tracking-wide max-w-2xl">
              {academy.subheading}
            </p>

            <p className="text-sm sm:text-base text-muted font-light leading-relaxed max-w-2xl">
              {academy.vision}
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#courses"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all transform hover:scale-105 active:scale-95"
            >
              Explore All Courses
            </a>

            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                "Hello Bhanu's Hair Academy, I would like to receive the course prospectus and admission details."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-ivory-50 border border-champagne-500/35 glass-card hover:border-champagne-300 hover:bg-champagne-500/10 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Admission Desk</span>
            </a>

            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-champagne-400" />
              <span>Call: {contact.displayPhone}</span>
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-champagne-500/15">
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-champagne-300 font-light">
                80%
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted">
                Hands-on Live Practicals
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-champagne-300 font-light">
                500+
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted">
                Graduates & Stylists
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-champagne-300 font-light">
                100%
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted">
                Placement & Internship
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-champagne-300 font-light">
                3 Outlets
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted">
                Indore Salon Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4 CORE DISCIPLINES BENTO SHOWCASE                        */}
      {/* ======================================================== */}
      <section className="relative z-10 py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-champagne-500/15">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-medium">
                COMPLETE SALON DISCIPLINES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory-50 tracking-tight">
              HAIR • MAKEUP • SKIN • NAILS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted font-light max-w-md leading-relaxed">
            Every course combines anatomical theory, live client models, professional tool ergonomics, and commercial salon management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden glass-card border border-champagne-500/20 hover:border-champagne-400/50 transition-all duration-500 p-6 flex flex-col justify-between min-h-[360px]"
              >
                {/* Background Image with Tint */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center filter brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-transparent pointer-events-none" />

                {/* Top Icon Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full glass-panel border border-champagne-500/30 flex items-center justify-center text-champagne-400 group-hover:bg-champagne-400 group-hover:text-obsidian-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-champagne-300/80 px-2.5 py-1 rounded-full glass-panel border border-champagne-500/20">
                    {item.count}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-2 pt-16">
                  <h3 className="font-serif text-2xl text-ivory-50 group-hover:text-champagne-300 transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* COMPLETE COURSE CATALOG                                  */}
      {/* ======================================================== */}
      <section
        id="courses"
        className="relative z-10 py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-12 border-t border-champagne-500/15"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
              <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-medium">
                ACADEMY CURRICULUM & CERTIFICATIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-50 tracking-tight">
              PROFESSIONAL SALON COURSES
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  activeFilter === tab.id
                    ? "bg-champagne-400 text-obsidian-950 font-semibold shadow-[0_0_20px_rgba(200,162,82,0.35)]"
                    : "glass-panel border-champagne-500/20 text-muted hover:text-ivory-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course: AcademyCourse) => (
            <div
              key={course.id}
              className={`rounded-3xl p-7 sm:p-9 glass-card border flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
                course.featured
                  ? "border-champagne-400/50 shadow-[0_20px_60px_rgba(200,162,82,0.15)] ring-1 ring-champagne-400/30"
                  : "border-champagne-500/20 hover:border-champagne-400/40"
              }`}
            >
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />

              <div className="space-y-6">
                {/* Header Tag & Duration */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] tracking-ultra uppercase text-champagne-400 font-mono px-3 py-1 rounded-full glass-panel border border-champagne-500/30 font-medium">
                    {course.badge}
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs text-champagne-300 font-mono">
                    <Clock className="w-3.5 h-3.5 text-champagne-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-champagne-200/90 font-mono tracking-wider uppercase">
                    Level: {course.level}
                  </p>
                  <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Key Curriculum Bullets */}
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-champagne-400 font-semibold">
                    Core Curriculum Modules:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.curriculum.map((item, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-start gap-2 text-xs text-ivory-100 font-light"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certification & Career Outcomes */}
                <div className="p-4 rounded-2xl glass-panel border border-champagne-500/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-champagne-300 font-medium font-mono text-[11px] uppercase">
                    <GraduationCap className="w-4 h-4 text-champagne-400" />
                    <span>Certification: {course.certification}</span>
                  </div>
                  <div className="text-muted text-[11px]">
                    <span className="text-ivory-200 font-medium">Careers: </span>
                    {course.careerOpportunities.join(" · ")}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-champagne-500/15 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Bhanu's Hair Academy, I would like to enroll / inquire about the course: ${course.title}. Please share batch schedule, fees, and syllabus.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-champagne-400 hover:bg-champagne-300 transition-all shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-obsidian-950" />
                  <span>Enroll / Inquire on WhatsApp</span>
                </a>

                <a
                  href="#admissions"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, course: course.title }))
                  }
                  className="text-xs uppercase tracking-widest text-champagne-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Request Prospectus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* MASTER EDUCATOR BHANU & FACULTY SPOTLIGHT                */}
      {/* ======================================================== */}
      <section className="relative z-10 py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-12 border-t border-champagne-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Master Stylist Portrait / Studio Craft */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-champagne-500/20 aspect-[4/5] bg-obsidian-900 group shadow-2xl">
              <Image
                src="/images/studio-craft.jpg"
                alt="Master Stylist Bhanu Mentoring Salon Apprentices"
                fill
                className="object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel border border-champagne-500/30 space-y-1.5 backdrop-blur-xl">
                <div className="text-[10px] tracking-widest uppercase text-champagne-400 font-mono">
                  ACADEMY FOUNDER & MASTER EDUCATOR
                </div>
                <h4 className="font-serif text-2xl text-ivory-50">
                  Master Stylist Bhanu
                </h4>
                <p className="text-xs text-muted font-light">
                  15+ Years Industry Leadership · Master Japanese Shears Educator
                </p>
              </div>
            </div>
          </div>

          {/* Right: Pedagogy & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-champagne-500 inline-block" />
                <span className="text-[11px] uppercase tracking-ultra text-champagne-400 font-medium">
                  DIRECT APPRENTICESHIP
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory-50 tracking-tight leading-tight">
                LEARN DIRECTLY FROM <br />
                <span className="italic text-champagne-400 font-serif">
                  INDUSTRY-PROVEN MASTERS.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                At Bhanu&apos;s Hair Academy, you do not sit behind textbooks. From week two, you hold professional shears, balance sectioning combs, mix real color formulations, and train on live clients under one-on-one supervision across our 3 Indore salon locations.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {academy.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl glass-panel border border-champagne-500/15 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-champagne-400" />
                    <h5 className="font-serif text-lg text-champagne-200">
                      {h.title}
                    </h5>
                  </div>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="p-6 rounded-2xl glass-card border-l-2 border-champagne-400 border-t border-r border-b border-champagne-500/15 space-y-2">
              <p className="font-serif italic text-base sm:text-lg text-champagne-200">
                &ldquo;We don&apos;t just teach haircuts and makeup; we sculpt artistic discipline, client confidence, and salon business acumen.&rdquo;
              </p>
              <div className="text-xs text-muted font-mono uppercase tracking-wider">
                — Bhanu, Master Stylist & Academy Director
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3 INDORE STUDIO APPRENTICESHIP LOCATIONS                 */}
      {/* ======================================================== */}
      <section className="relative z-10 py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-10 border-t border-champagne-500/15">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 text-[10px] tracking-ultra uppercase font-mono">
            <span>REAL SALON INTERNSHIP NETWORK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory-50 tracking-tight">
            TRAIN ACROSS 3 INDORE STUDIOS
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
            Academy students gain practical exposure across our active unisex salons, mastering client consultations in high-traffic commercial environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outlets.map((outlet) => (
            <div
              key={outlet.id}
              className="p-6 rounded-3xl glass-card border border-champagne-500/20 space-y-4 hover:border-champagne-400/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full glass-panel border border-champagne-500/20 text-champagne-300">
                  {outlet.area}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  Active Salon & Lab
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-ivory-50">
                  {outlet.name}
                </h3>
                <p className="text-xs text-muted font-light pt-1 leading-relaxed">
                  {outlet.address}
                </p>
              </div>

              <div className="pt-2 border-t border-champagne-500/15 text-xs text-champagne-400 font-mono flex items-center justify-between">
                <span>{outlet.landmark}</span>
                <span>{outlet.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* ADMISSION & INQUIRY FORM                                 */}
      {/* ======================================================== */}
      <section
        id="admissions"
        className="relative z-10 py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-4xl mx-auto space-y-10 border-t border-champagne-500/15"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 text-[10px] tracking-ultra uppercase font-mono">
            <span>UPCOMING BATCH ADMISSIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory-50 tracking-tight">
            START YOUR PROFESSIONAL SALON CAREER
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light max-w-lg mx-auto">
            Limited seats per batch to guarantee individual attention and dedicated styling chair time. Submit inquiry to receive prospectus and fee schedule.
          </p>
        </div>

        <form
          onSubmit={handleInquirySubmit}
          className="rounded-3xl glass-card border border-champagne-500/25 p-8 sm:p-12 space-y-6 shadow-2xl backdrop-blur-2xl"
        >
          {formSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-ivory-50">
                Inquiry Transmitted to Admissions Desk
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                WhatsApp conversation launched. Our academy admissions counselor will guide you through the syllabus, fee installment plans, and upcoming batch dates.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="text-xs uppercase tracking-widest text-champagne-400 underline font-mono"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-champagne-300 font-mono block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Aarti Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-champagne-500/20 text-xs text-ivory-100 placeholder-muted/50 focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-champagne-300 font-mono block">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-champagne-500/20 text-xs text-ivory-100 placeholder-muted/50 focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-champagne-300 font-mono block">
                    Course of Interest *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-champagne-500/20 text-xs text-ivory-100 focus:outline-none focus:border-champagne-400 transition-colors"
                  >
                    {academy.courses.map((c) => (
                      <option key={c.id} value={c.title} className="bg-obsidian-900">
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-champagne-300 font-mono block">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Indore / Other"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-champagne-500/20 text-xs text-ivory-100 placeholder-muted/50 focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-champagne-300 font-mono block">
                  Questions / Career Goal (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your background or questions about upcoming batch dates..."
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-champagne-500/20 text-xs text-ivory-100 placeholder-muted/50 focus:outline-none focus:border-champagne-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_35px_rgba(200,162,82,0.6)] transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 fill-obsidian-950" />
                <span>Submit Inquiry & Receive Syllabus on WhatsApp</span>
              </button>
            </>
          )}
        </form>
      </section>

      {/* ======================================================== */}
      {/* ACADEMY FAQS ACCORDION                                   */}
      {/* ======================================================== */}
      <section className="relative z-10 py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-4xl mx-auto space-y-10 border-t border-champagne-500/15">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-500/25 text-champagne-300 text-[10px] tracking-ultra uppercase font-mono">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-ivory-50 tracking-tight">
            EVERYTHING YOU NEED TO KNOW
          </h2>
        </div>

        <div className="space-y-4">
          {academy.faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-champagne-500/20 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-ivory-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-champagne-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-muted font-light leading-relaxed border-t border-champagne-500/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* FOOTER                                                   */}
      {/* ======================================================== */}
      <Footer />
    </main>
  );
}
