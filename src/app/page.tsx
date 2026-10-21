import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { CinematicBackground } from "@/components/CinematicBackground";
import { CinematicExperience } from "@/components/CinematicExperience";
import { TheStudio } from "@/components/TheStudio";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { TreatmentDirectory } from "@/components/TreatmentDirectory";
import { SignatureExperience } from "@/components/SignatureExperience";
import { GallerySection } from "@/components/GallerySection";
import { SkincareSection } from "@/components/SkincareSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { OutletsSection } from "@/components/OutletsSection";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { LuxuryCursor } from "@/components/LuxuryCursor";
import { FloatingConcierge } from "@/components/FloatingConcierge";
import { MobileBottomBar } from "@/components/MobileBottomBar";

import { Preloader } from "@/components/Preloader";
import { StageWrapper } from "@/components/stage/StageWrapper";

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen bg-obsidian-950 text-ivory-50 overflow-x-hidden selection:bg-champagne-500/30 selection:text-champagne-200">
      {/* First-Visit Editorial Preloader */}
      <Preloader />

      {/* 0. Bespoke Luxury Magnetic Cursor (Desktop) */}
      <LuxuryCursor />

      {/* Floating Concierge Direct WhatsApp Access (Desktop) */}
      <FloatingConcierge />

      {/* Persistent Mobile Bottom Action Bar (Call · WhatsApp · Book) */}
      <MobileBottomBar />

      {/* 1. Fixed Luxury Transparent / Glass Navigation */}
      <Navbar />

      {/* 2. Persistent 3D R3F Stage (The Single Pair of Master Japanese Shears Walking Through the Salon) */}
      <StageWrapper />

      {/* 3. Pinned Hero Cinematic Background Video Scrubber */}
      <CinematicBackground />

      {/* 4. Dual-Engine Hero: 3D Sculpture for Mobile (<768px) & Editorial Narrative for Desktop (>=768px) */}
      <CinematicExperience />

      {/* 5. Section 1 — The Studio (Asymmetric editorial layout & heritage) */}
      <TheStudio />

      {/* 6. Kinetic Typography Marquee Bridge */}
      <MarqueeRibbon />

      {/* 7. Section 2 — Comprehensive 30-Service Atelier Treatment Directory */}
      <TreatmentDirectory />

      {/* 8. Section 3 — The Signature Experience (3 Chapters with Exploded 3D Japanese Shears) */}
      <SignatureExperience />

      {/* 9. Section 4 — Signature Looks / Gallery (Filter tabs, before/after comparison slider & lightbox) */}
      <GallerySection />

      {/* 10. Section 5 — Skin Care / Beyond Hair (Ivory pavilion expansion & clinical treatments) */}
      <SkincareSection />

      {/* 11. Section 6 — Testimonials (Editorial serif quotation carousel) */}
      <TestimonialsSection />

      {/* 12. Section 7 — Dedicated Outlets Block (Our 3 Indore Studios: Palsikar Colony, Saket Nagar, Vijay Nagar) */}
      <OutletsSection />

      {/* 13. Section 8 — Booking Experience (Ribbon cutting finale & appointment form) */}
      <BookingSection />

      {/* 14. Editorial Footer (Curtain reveal, studio hours, and back-to-top snip glyph) */}
      <Footer />
    </main>
  );
}
