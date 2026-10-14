"use client";

import React from "react";

interface MarqueeRibbonProps {
  className?: string;
  speed?: "slow" | "normal";
}

export function MarqueeRibbon({ className = "" }: MarqueeRibbonProps) {
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

  return (
    <div
      className={`relative w-full overflow-hidden py-3.5 bg-obsidian-900/80 border-y border-champagne-500/15 backdrop-blur-md select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee space-x-8 text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-champagne-400/85">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
