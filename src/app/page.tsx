import { Navbar } from "@/components/Navbar";
import { CinematicHero } from "@/components/CinematicHero";
import { TheStudio } from "@/components/TheStudio";
import { ServicesSection } from "@/components/ServicesSection";
import { SignatureExperience } from "@/components/SignatureExperience";
import { GallerySection } from "@/components/GallerySection";
import { SkincareSection } from "@/components/SkincareSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian-950 text-ivory-50 overflow-x-hidden selection:bg-champagne-500/30 selection:text-champagne-200">
      {/* 1. Fixed Luxury Transparent / Glass Navigation */}
      <Navbar />

      {/* 2. 100vw × 100vh Pinned GSAP Scroll-Controlled Video Hero (Preserved from Phase 1) */}
      <CinematicHero />

      {/* 3. Section 1 — The Studio (Asymmetric editorial layout with subtle visual bridge) */}
      <TheStudio />

      {/* 4. Section 2 — Services / Our Expertise (Asymmetric panels with interactive modal) */}
      <ServicesSection />

      {/* 5. Section 3 — The Signature Experience (3 Chapters with 3D Barber Scissors Canvas) */}
      <SignatureExperience />

      {/* 6. Section 4 — Signature Looks / Gallery (Filter tabs, before/after slider & lightbox) */}
      <GallerySection />

      {/* 7. Section 5 — Skin Care / Beyond Hair (Calming split composition & expandable treatments) */}
      <SkincareSection />

      {/* 8. Section 6 — Testimonials (Editorial serif quotation carousel) */}
      <TestimonialsSection />

      {/* 9. Section 7 — Booking Experience (Final CTA with WhatsApp, phone, and inquiry form) */}
      <BookingSection />

      {/* 10. Editorial Footer (Brand narrative, sitemap, studio hours, and social links) */}
      <Footer />
    </main>
  );
}
