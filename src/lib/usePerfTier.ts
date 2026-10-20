"use client";

import { useEffect, useState } from "react";

export type PerfTier = "high" | "mid" | "low";

interface PerfTierState {
  tier: PerfTier;
  isReducedMotion: boolean;
  isTouch: boolean;
  saveData: boolean;
}

export function usePerfTier(): PerfTierState {
  const [state, setState] = useState<PerfTierState>({
    tier: "high",
    isReducedMotion: false,
    isTouch: false,
    saveData: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const isReducedMotion = reducedMotionQuery.matches;
    const isTouch = touchQuery.matches || "ontouchstart" in window;

    // Navigator hardware capabilities
    const nav = navigator as unknown as {
      deviceMemory?: number;
      hardwareConcurrency?: number;
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };

    const deviceMemory = nav.deviceMemory ?? 8;
    const hardwareConcurrency = nav.hardwareConcurrency ?? 8;
    const saveData = Boolean(nav.connection?.saveData);
    const effectiveType = nav.connection?.effectiveType ?? "4g";

    let calculatedTier: PerfTier = "high";

    if (isReducedMotion || saveData || effectiveType === "2g" || effectiveType === "slow-2g") {
      calculatedTier = "low";
    } else if (isTouch || deviceMemory <= 4 || hardwareConcurrency <= 4 || effectiveType === "3g") {
      calculatedTier = "mid";
    } else {
      calculatedTier = "high";
    }

    setState({
      tier: calculatedTier,
      isReducedMotion,
      isTouch,
      saveData,
    });

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setState((prev) => ({
        ...prev,
        isReducedMotion: e.matches,
        tier: e.matches ? "low" : prev.tier,
      }));
    };

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    return () => {
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return state;
}
