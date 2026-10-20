"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { stageState } from "./stageState";

export function useStageScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // 1. Hero -> Studio transition
      const heroEl = document.getElementById("cinematic-experience");
      if (heroEl) {
        ScrollTrigger.create({
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.shears.x = gsap.utils.interpolate(1.6, 2.5, p);
            stageState.shears.y = gsap.utils.interpolate(0.1, -0.4, p);
            stageState.shears.scale = gsap.utils.interpolate(0.92, 0.42, p);
            stageState.shears.ry = gsap.utils.interpolate(-0.28, 2.1, p);
            stageState.shears.rx = gsap.utils.interpolate(0.22, 0.15, p);
            stageState.shears.bladeOpen = Math.sin(p * Math.PI) * 0.4 + 0.05;
            stageState.canvasOpacity = 1;
            stageState.isFrameloopActive = true;
          },
        });
      }

      // 2. The Studio Section (#studio) - Docked bookmark orbit
      const studioEl = document.getElementById("studio");
      if (studioEl) {
        ScrollTrigger.create({
          trigger: studioEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            stageState.shears.x = 2.4;
            stageState.shears.y = gsap.utils.interpolate(-0.4, 0.2, p);
            stageState.shears.scale = 0.38;
            stageState.shears.ry = 2.1 + p * 0.8;
            stageState.shears.explode = 0;
            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
          },
        });
      }

      // 3. Treatment Directory Section (#services) - Dimmed for legibility
      const servicesEl = document.getElementById("services");
      if (servicesEl) {
        ScrollTrigger.create({
          trigger: servicesEl,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            stageState.canvasOpacity = gsap.utils.interpolate(0.85, 0.2, self.progress);
            stageState.shears.x = 2.8;
            stageState.shears.scale = 0.28;
          },
        });
      }

      // 4. Signature Experience Showpiece (#experience)
      const experienceEl = document.getElementById("experience");
      if (experienceEl) {
        ScrollTrigger.create({
          trigger: experienceEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1 across the chapters
            stageState.canvasOpacity = 1;
            stageState.isFrameloopActive = true;

            if (p < 0.33) {
              // Chapter 1: Forged Steel (Macro Zoom)
              const c1 = p / 0.33;
              stageState.camera.z = gsap.utils.interpolate(8.5, 6.2, c1);
              stageState.shears.x = gsap.utils.interpolate(2.4, 0.4, c1);
              stageState.shears.y = gsap.utils.interpolate(0.2, 0.1, c1);
              stageState.shears.scale = gsap.utils.interpolate(0.38, 1.15, c1);
              stageState.shears.ry = gsap.utils.interpolate(1.5, 0.1, c1);
              stageState.shears.rx = 0.2;
              stageState.shears.explode = 0;
              stageState.shears.bladeOpen = 0.08;
              stageState.glint.y = gsap.utils.interpolate(1.0, 5.0, c1);
            } else if (p < 0.66) {
              // Chapter 2: The Pivot (Exploded View!)
              const c2 = (p - 0.33) / 0.33;
              stageState.camera.z = 7.2;
              stageState.shears.x = 0;
              stageState.shears.y = 0;
              stageState.shears.scale = 1.0;
              stageState.shears.rx = 0.35;
              stageState.shears.ry = gsap.utils.interpolate(0.1, 0.65, c2);
              stageState.shears.explode = Math.sin(c2 * Math.PI); // Expands and retracts smoothly
              stageState.shears.bladeOpen = 0.25;
            } else {
              // Chapter 3: The Cut (Dynamic Snapping)
              const c3 = (p - 0.66) / 0.34;
              stageState.camera.z = 8.0;
              stageState.shears.x = gsap.utils.interpolate(0, 0.5, c3);
              stageState.shears.y = 0;
              stageState.shears.scale = 0.95;
              stageState.shears.explode = 0;
              stageState.shears.ry = gsap.utils.interpolate(0.65, -0.2, c3);
              // Snapping wave
              stageState.shears.bladeOpen = Math.abs(Math.sin(c3 * Math.PI * 4)) * 0.35 + 0.02;
            }
          },
        });
      }

      // 5. Gallery Section (#gallery)
      const galleryEl = document.getElementById("gallery");
      if (galleryEl) {
        ScrollTrigger.create({
          trigger: galleryEl,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            stageState.canvasOpacity = 0.25;
            stageState.shears.scale = 0.3;
            stageState.shears.x = -2.6;
          },
        });
      }

      // 6. Skincare Section (#skincare) - Ivory Pavilion covers canvas
      // When ivory covers canvas, set opacity to 0 and halt frameloop!
      const skincareEl = document.getElementById("skincare");
      if (skincareEl) {
        ScrollTrigger.create({
          trigger: skincareEl,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            stageState.canvasOpacity = 0;
            stageState.isFrameloopActive = false;
          },
          onLeave: () => {
            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
          },
          onEnterBack: () => {
            stageState.canvasOpacity = 0;
            stageState.isFrameloopActive = false;
          },
          onLeaveBack: () => {
            stageState.canvasOpacity = 0.85;
            stageState.isFrameloopActive = true;
          },
        });
      }

      // 7. Booking Finale (#book) - Ribbon Cutting
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
            stageState.shears.x = gsap.utils.interpolate(-1.8, 1.8, p);
            stageState.shears.y = 0;
            stageState.shears.scale = 0.8;
            stageState.shears.bladeOpen = Math.abs(Math.sin(p * Math.PI * 3)) * 0.4 + 0.02;
            stageState.ribbon.opacity = 1;
            stageState.ribbon.cut = p;
          },
        });
      }
    });

    return () => mm.revert();
  }, []);
}
