import { Navbar } from "@/components/Navbar";
import { CinematicHero } from "@/components/CinematicHero";
import { TheStudio } from "@/components/TheStudio";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { TreatmentDirectory } from "@/components/TreatmentDirectory";
import { SignatureExperience } from "@/components/SignatureExperience";
import { GallerySection } from "@/components/GallerySection";
import { SkincareSection } from "@/components/SkincareSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { LuxuryCursor } from "@/components/LuxuryCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian-950 text-ivory-50 overflow-x-hidden selection:bg-champagne-500/30 selection:text-champagne-200">
      {/* 0. Bespoke Luxury Magnetic Cursor (Desktop) */}
      <LuxuryCursor />

      {/* 1. Fixed Luxury Transparent / Glass Navigation */}
      <Navbar />

      {/* 2. Dual-Engine Hero: 3D Sculpture for Mobile (<768px) & Pinned Video Scrub for Desktop (>=768px) */}
      <CinematicHero />

      {/* 3. Section 1 — The Studio (Asymmetric editorial layout & heritage) */}
      <TheStudio />

      {/* 4. Kinetic Typography Marquee Bridge */}
      <MarqueeRibbon />

      {/* 5. Section 2 — Comprehensive 30-Service Atelier Treatment Directory */}
      <TreatmentDirectory />

      {/* 6. Section 3 — The Signature Experience (3 Chapters with Interactive 3D Japanese Scissors) */}
      <SignatureExperience />

      {/* 7. Section 4 — Signature Looks / Gallery (Filter tabs, before/after comparison slider & lightbox) */}
      <GallerySection />

      {/* 8. Section 5 — Skin Care / Beyond Hair (Calming split composition & clinical treatments) */}
      <SkincareSection />

      {/* 9. Section 6 — Testimonials (Editorial serif quotation carousel) */}
      <TestimonialsSection />

      {/* 10. Section 7 — Booking Experience (Final CTA with WhatsApp, phone, and inquiry form) */}
      <BookingSection />

      {/* 11. Editorial Footer (Brand narrative, sitemap, studio hours, and social links) */}
      <Footer />
    </main>
  );
}
