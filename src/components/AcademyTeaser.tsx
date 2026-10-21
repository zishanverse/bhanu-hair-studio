"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SALON_CONFIG } from "@/config/salon.config";
import { GraduationCap, Award, BookOpen, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function AcademyTeaser() {
  const { academy } = SALON_CONFIG;

  return (
    <section
      id="academy-teaser"
      className="relative w-full bg-obsidian-950 text-ivory-50 py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-champagne-500/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl border border-champagne-500/30 bg-gradient-to-br from-surface/90 via-obsidian-900/95 to-obsidian-950 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          {/* Subtle Ambient Flare */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne-500/10 blur-[130px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Editorial Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/15 border border-champagne-500/30 text-champagne-300 text-[10px] uppercase tracking-wider font-sans font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-champagne-400" />
                <span>BHANU&apos;S HAIR ACADEMY · INDORE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory-50 leading-tight">
                MASTER THE CRAFT. <br />
                <span className="italic font-normal text-champagne-300 font-serif">
                  BECOME A LICENSED ARTIST.
                </span>
              </h2>

              <p className="text-sm md:text-base text-ivory-200/80 font-light leading-relaxed max-w-xl">
                Indore&apos;s premier professional academy for aspiring stylists, colorists, and beauty entrepreneurs. 80% practical live-client training, government-recognized diplomas, and 100% placement support at leading luxury salons.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "15+ Years Master Educator Mentorship",
                  "80% Practical Hands-On Training",
                  "Complete Professional Styling Starter Kit",
                  "100% Placement Support Across Indore Studios",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-ivory-100 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#7A5B20] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/bhanushairacademy"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-300 to-champagne-400 hover:shadow-[0_0_25px_rgba(200,162,82,0.6)] transition-all min-h-[44px]"
                >
                  <span>Explore Academy Curriculum</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/bhanushairacademy#courses"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium text-champagne-300 border border-champagne-500/30 hover:border-champagne-400 hover:text-white transition-all min-h-[44px]"
                >
                  <span>View 5 Professional Courses</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Feature Box */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#ECE4D6] border border-[#C8A252]/40 p-6 space-y-5 text-[#161410] shadow-xl">
              <div className="flex items-center justify-between border-b border-[#C8A252]/25 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#7A5B20]" />
                  <span className="text-xs uppercase tracking-wider text-[#110F0C] font-serif font-semibold">
                    Featured Diplomas
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7A5B20] uppercase font-bold">
                  Admissions Open
                </span>
              </div>

              <div className="space-y-3">
                {academy.courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="p-3.5 rounded-xl bg-white/90 border border-[#C8A252]/35 flex items-center justify-between group hover:border-[#C8A252] transition-colors shadow-sm"
                  >
                    <div>
                      <h4 className="text-sm font-serif text-[#110F0C] group-hover:text-[#7A5B20] transition-colors font-medium">
                        {course.title}
                      </h4>
                      <span className="text-[10px] text-[#5C5547] font-sans mt-0.5 block font-normal">
                        {course.duration} · {course.level}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#C8A252]/15 text-[#7A5B20] border border-[#C8A252]/30 font-semibold">
                      {course.discipline}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/bhanushairacademy"
                  className="text-xs uppercase tracking-wider text-[#7A5B20] hover:text-[#110F0C] transition-colors font-sans font-semibold inline-flex items-center gap-1"
                >
                  <span>Read student testimonials & placement records</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7A5B20]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademyTeaser;
