"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface MarqueeRibbonProps {
  className?: string;
}

export function MarqueeRibbon({ className = "" }: MarqueeRibbonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [
    "BHANU'S THE HAIR STUDIO",
    "PALSIKAR COLONY · INDORE",
    "OPEN DAILY TILL 10:00 PM",
    "HAUTE COIFFURE & UNISEX ATELIER",
    "JAPANESE STEEL PRECISION",
    "KERATIN & REBONDING RITUALS",
    "FRENCH BALAYAGE & BRIDAL GLOW",
    "MANIK BAGH ROAD FLAGSHIP",
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !trackRef.current) return;

    let currentX = 0;
    let baseSpeed = 0.8;
    let velocity = 0;
    let animId: number;

    // React to scroll velocity using ScrollTrigger
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = self.getVelocity() * 0.005;
        // Subtle dynamic skew based on scroll speed
        if (containerRef.current) {
          const targetSkew = gsap.utils.clamp(-4, 4, velocity * 0.15);
          gsap.to(containerRef.current, {
            skewX: targetSkew,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      },
    });

    const loop = () => {
      // Natural decay of velocity
      velocity *= 0.92;
      const speed = baseSpeed + velocity;
      currentX -= speed;

      // Wrap around seamlessly
      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (currentX <= -halfWidth) {
          currentX = 0;
        } else if (currentX > 0) {
          currentX = -halfWidth;
        }
        trackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full overflow-hidden py-4 bg-obsidian-900/60 border-y border-champagne-500/20 backdrop-blur-md select-none will-change-transform ${className}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap text-[11px] md:text-xs uppercase tracking-[0.3em] font-mono text-champagne-400/90 font-medium will-change-transform"
      >
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 px-4 shrink-0">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/60 shadow-[0_0_8px_rgba(200,162,82,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeRibbon;
