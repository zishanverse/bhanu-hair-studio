"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { stageState } from "./stageState";

export function useStageScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    // 1. DESKTOP CHOREOGRAPHY (>= 1024px)
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const heroEl = document.getElementById("cinematic-experience");
      if (heroEl) {
        ScrollTrigger.create({
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.shears.x = gsap.utils.interpolate(1.4, 2.4, p);
            stageState.shears.y = gsap.utils.interpolate(0.0, -0.3, p);
            stageState.shears.scale = gsap.utils.interpolate(0.85, 0.45, p);
            stageState.shears.ry = gsap.utils.interpolate(-0.25, 2.0, p);
            stageState.shears.rx = gsap.utils.interpolate(0.2, 0.12, p);
            stageState.shears.bladeOpen = Math.sin(p * Math.PI) * 0.35 + 0.05;

            // Zoomed-Out Spacious Minimalist Hero Camera Path
            stageState.camera.x = gsap.utils.interpolate(0.1, 1.2, p);
            stageState.camera.y = gsap.utils.interpolate(0.5, 0.1, p);
            stageState.camera.z = gsap.utils.interpolate(10.5, 7.8, p);
            stageState.camera.roll = gsap.utils.interpolate(-0.02, 0.03, p);

            stageState.canvasOpacity = 1;
            stageState.isFrameloopActive = true;
          },
        });
      }

      const studioEl = document.getElementById("studio");
      if (studioEl) {
        ScrollTrigger.create({
          trigger: studioEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.shears.x = 2.2;
            stageState.shears.y = gsap.utils.interpolate(-0.3, 0.2, p);
            stageState.shears.scale = 0.42;
            stageState.shears.ry = 2.0 + p * 0.8;
            stageState.shears.explode = 0;

            // Smooth glide into macro angle
            stageState.camera.x = gsap.utils.interpolate(1.2, -1.0, p);
            stageState.camera.y = gsap.utils.interpolate(0.1, -0.2, p);
            stageState.camera.z = gsap.utils.interpolate(7.8, 6.8, p);
            stageState.camera.roll = gsap.utils.interpolate(0.03, -0.04, p);

            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
          },
        });
      }

      const cinemaEl = document.getElementById("cinema-experience");
      if (cinemaEl) {
        ScrollTrigger.create({
          trigger: cinemaEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Camera pulls back smoothly to panoramic distance for cinema section
            stageState.camera.x = gsap.utils.interpolate(-1.0, 0, p);
            stageState.camera.y = gsap.utils.interpolate(-0.2, 0.6, p);
            stageState.camera.z = gsap.utils.interpolate(6.8, 9.6, p);
            stageState.camera.roll = 0;
            stageState.shears.scale = 0.25;
            stageState.shears.y = 1.6;

            // Soft atmospheric backdrop behind video
            stageState.canvasOpacity = gsap.utils.interpolate(0.85, 0.35, Math.sin(p * Math.PI));
          },
        });
      }

      // SECTION 4: TREATMENT DIRECTORY — DYNAMIC CINEMATIC ZOOM-IN
      const servicesEl = document.getElementById("services");
      if (servicesEl) {
        ScrollTrigger.create({
          trigger: servicesEl,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Dramatic 3D Zoom-in onto precision Damascus blade & golden particles
            stageState.camera.z = gsap.utils.interpolate(9.6, 5.0, p);
            stageState.camera.x = gsap.utils.interpolate(-0.8, 1.8, p);
            stageState.camera.y = gsap.utils.interpolate(0.4, -0.2, p);
            stageState.camera.roll = gsap.utils.interpolate(-0.04, 0.05, p);

            stageState.shears.x = gsap.utils.interpolate(-1.6, 1.6, p);
            stageState.shears.y = gsap.utils.interpolate(-0.2, 0.1, p);
            stageState.shears.scale = gsap.utils.interpolate(0.4, 1.15, p);
            stageState.shears.ry = gsap.utils.interpolate(0.2, 2.8, p);
            stageState.shears.bladeOpen = Math.abs(Math.sin(p * Math.PI * 2)) * 0.35 + 0.05;

            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
          },
        });
      }

      // SECTION 5: SIGNATURE EXPERIENCE — EXPLODED 3D CHOREOGRAPHY
      const experienceEl = document.getElementById("experience");
      if (experienceEl) {
        ScrollTrigger.create({
          trigger: experienceEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.canvasOpacity = 0.95;
            stageState.isFrameloopActive = true;

            if (p < 0.33) {
              const c1 = p / 0.33;
              stageState.camera.z = gsap.utils.interpolate(6.8, 5.2, c1);
              stageState.shears.x = gsap.utils.interpolate(1.6, 0.3, c1);
              stageState.shears.y = gsap.utils.interpolate(0.1, 0.0, c1);
              stageState.shears.scale = gsap.utils.interpolate(0.85, 1.25, c1);
              stageState.shears.ry = gsap.utils.interpolate(1.5, 0.1, c1);
              stageState.shears.rx = 0.2;
              stageState.shears.explode = 0;
              stageState.shears.bladeOpen = 0.08;
              stageState.glint.y = gsap.utils.interpolate(1.0, 5.0, c1);
            } else if (p < 0.66) {
              const c2 = (p - 0.33) / 0.33;
              stageState.camera.z = 6.0;
              stageState.shears.x = 0;
              stageState.shears.y = 0;
              stageState.shears.scale = 1.1;
              stageState.shears.rx = 0.35;
              stageState.shears.ry = gsap.utils.interpolate(0.1, 0.75, c2);
              stageState.shears.explode = Math.sin(c2 * Math.PI);
              stageState.shears.bladeOpen = 0.28;
            } else {
              const c3 = (p - 0.66) / 0.34;
              stageState.camera.z = 7.0;
              stageState.shears.x = gsap.utils.interpolate(0, 0.6, c3);
              stageState.shears.y = 0;
              stageState.shears.scale = 0.95;
              stageState.shears.explode = 0;
              stageState.shears.ry = gsap.utils.interpolate(0.75, -0.2, c3);
              stageState.shears.bladeOpen = Math.abs(Math.sin(c3 * Math.PI * 4)) * 0.35 + 0.02;
            }
          },
        });
      }

      // SECTION 6: GALLERY — CONTINUOUS ZOOM & SWEEP
      const galleryEl = document.getElementById("gallery");
      if (galleryEl) {
        ScrollTrigger.create({
          trigger: galleryEl,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.camera.z = gsap.utils.interpolate(7.0, 5.4, p);
            stageState.camera.x = gsap.utils.interpolate(1.5, -1.5, p);
            stageState.shears.scale = 0.65;
            stageState.shears.x = gsap.utils.interpolate(2.0, -2.0, p);
            stageState.shears.ry = gsap.utils.interpolate(0.0, 1.8, p);

            stageState.canvasOpacity = 0.8;
            stageState.isFrameloopActive = true;
          },
        });
      }

      // SECTION 7: SKINCARE & HEAD SPA — LUMINOUS PEARL ELIXIR DRIFT
      const skincareEl = document.getElementById("skincare");
      if (skincareEl) {
        ScrollTrigger.create({
          trigger: skincareEl,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;

            stageState.camera.z = gsap.utils.interpolate(6.5, 4.8, p);
            stageState.camera.y = gsap.utils.interpolate(0.3, -0.2, p);
            stageState.pearl.opacity = 1;
            stageState.pearl.y = gsap.utils.interpolate(2.0, -0.5, p);
            stageState.shears.scale = 0.35;
            stageState.shears.x = -2.5;
          },
        });
      }

      // SECTION 8: BOOKING — CEREMONIAL ZOOM INTO RIBBON CUTTING
      const bookEl = document.getElementById("book");
      if (bookEl) {
        ScrollTrigger.create({
          trigger: bookEl,
          start: "top 80%",
          end: "center center",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.canvasOpacity = 1;
            stageState.isFrameloopActive = true;

            stageState.camera.z = gsap.utils.interpolate(6.8, 4.8, p);
            stageState.camera.y = gsap.utils.interpolate(-0.3, 0.3, p);
            stageState.shears.x = gsap.utils.interpolate(-1.8, 1.8, p);
            stageState.shears.y = 0;
            stageState.shears.scale = 0.95;
            stageState.shears.bladeOpen = Math.abs(Math.sin(p * Math.PI * 3)) * 0.4 + 0.02;
            stageState.ribbon.opacity = 1;
          },
        });
      }
    });

    // 2. TABLET CHOREOGRAPHY (768px – 1023px)
    mm.add("(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const heroEl = document.getElementById("cinematic-experience");
      if (heroEl) {
        ScrollTrigger.create({
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Slightly smaller and positioned to fit tablet portrait/landscape
            stageState.shears.x = gsap.utils.interpolate(0.8, 1.6, p);
            stageState.shears.y = gsap.utils.interpolate(-0.1, -0.3, p);
            stageState.shears.scale = gsap.utils.interpolate(0.72, 0.36, p);
            stageState.shears.ry = gsap.utils.interpolate(-0.2, 1.8, p);
            stageState.canvasOpacity = 0.95;
            stageState.isFrameloopActive = true;
          },
        });
      }

      const studioEl = document.getElementById("studio");
      if (studioEl) {
        ScrollTrigger.create({
          trigger: studioEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            stageState.shears.x = 1.4;
            stageState.shears.scale = 0.32;
            stageState.shears.ry = 1.8 + self.progress * 0.6;
          },
        });
      }

      const skincareEl = document.getElementById("skincare");
      if (skincareEl) {
        ScrollTrigger.create({
          trigger: skincareEl,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          onUpdate: (self) => {
            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
            stageState.camera.z = gsap.utils.interpolate(7.0, 5.2, self.progress);
          },
        });
      }
    });

    // 3. MOBILE CHOREOGRAPHY (< 768px)
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      // Set initial mobile centering
      stageState.shears.x = 0;
      stageState.shears.y = -0.15;
      stageState.shears.scale = 0.62;
      stageState.camera.z = 8.8;

      const mobileHero = document.getElementById("mobile-hero-section");
      if (mobileHero) {
        ScrollTrigger.create({
          trigger: mobileHero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.shears.y = gsap.utils.interpolate(-0.15, -0.6, p);
            stageState.shears.scale = gsap.utils.interpolate(0.62, 0.32, p);
            stageState.shears.ry = gsap.utils.interpolate(0.2, 1.4, p);
            stageState.canvasOpacity = gsap.utils.interpolate(1, 0.65, p);
          },
        });
      }

      const experienceEl = document.getElementById("experience");
      if (experienceEl) {
        ScrollTrigger.create({
          trigger: experienceEl,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.canvasOpacity = 0.7;
            stageState.shears.x = 0;
            stageState.shears.y = 0.1;
            stageState.shears.scale = 0.45;
            stageState.shears.ry = gsap.utils.interpolate(0.1, 0.9, p);
          },
        });
      }

      const skincareEl = document.getElementById("skincare");
      if (skincareEl) {
        ScrollTrigger.create({
          trigger: skincareEl,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
          onUpdate: (self) => {
            stageState.canvasOpacity = 0.65;
            stageState.isFrameloopActive = true;
          },
        });
      }

      const bookEl = document.getElementById("book");
      if (bookEl) {
        ScrollTrigger.create({
          trigger: bookEl,
          start: "top 80%",
          end: "center center",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
            stageState.shears.x = gsap.utils.interpolate(-0.6, 0.6, p);
            stageState.shears.y = 0;
            stageState.shears.scale = 0.52;
            stageState.shears.bladeOpen = Math.abs(Math.sin(p * Math.PI * 3)) * 0.35 + 0.02;
            stageState.ribbon.opacity = 1;
            stageState.ribbon.cut = p;
          },
        });
      }
    });

    return () => mm.revert();
  }, []);
}
