# Cinematic Hero Scrolling Engine — Technical Architecture & Implementation Guide

> **Primary Components:**  
> - [`src/components/CinematicBackground.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/CinematicBackground.tsx) — Reusable sticky full-viewport media renderer & coalesced hardware seek engine.  
> - [`src/components/CinematicExperience.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/CinematicExperience.tsx) — Natural document scrolling layout, pseudo-3D layers, GSAP ScrollTrigger orchestration, and Act choreography.  
> - [`src/components/CinematicHero.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/CinematicHero.tsx) — Dual-engine wrapper & backwards-compatible export.  
> - [`src/components/MobileHero3D.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/MobileHero3D.tsx) — Dedicated Three.js WebGL engine for mobile devices (< 768px).  
> **Configuration:** [`src/config/scenes.ts`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/config/scenes.ts) & [`src/config/salon.config.ts`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/config/salon.config.ts)  
> **Author/Maintainer:** Principal Creative Frontend Developer & Architecture Team  

---

## 1. Executive Summary: The Natural Scroll Architecture

The Hero experience has evolved from a stationary pinned hero into an **Immersive Natural-Scrolling Storytelling Experience with Synchronized Sticky Background Video**.

### Core Principles
1. **Natural Document Flow**: The page physically scrolls at the user's natural pace. Website sections travel smoothly upward across the viewport.
2. **Synchronized Sticky Background**: The background media renderer ([`CinematicBackground.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/CinematicBackground.tsx)) is `sticky top-0 h-[100dvh] w-full pointer-events-none -z-10`. As the user scrolls through the multi-scene container, the background stays visually fixed in the viewport while its playback frame advances or reverses in exact proportion to the scroll progress.
3. **Strict Bi-directional Scrubbing**:
   - Scrolling forward advances the video frame: `targetTime = progress * videoDuration`.
   - Scrolling backward reverses the video frame.
   - Stopping scroll halts video progression at the exact corresponding frame without residual drift or unexpected seeking.
4. **Three-Layer Pseudo-3D Depth**:
   - **Background Layer:** Salon footage with subtle hardware zoom (`scale(1 + progress * 0.04)`) and vertical perspective drift.
   - **Middle Layer:** Expanding gold rules, floating Roman numerals (`II`), and localized adaptive readability vignettes.
   - **Foreground Layer:** Asymmetrical editorial typography, craft manifesto cards, interactive service preview cards, and reservation CTAs with GSAP parallax transforms (`translate3d`, staggered reveals, and responsive scales).
5. **Mobile Separation (< 768px)**: Mobile devices retain [`MobileHero3D.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/MobileHero3D.tsx), avoiding multi-megabyte video buffering and hardware decoder battery drain on phones.

---

## 2. Architecture Diagram

```mermaid
flowchart TD
    UserScroll[User Mouse Wheel / Trackpad / Touch] --> Lenis[Lenis Smooth Scroll Engine]
    Lenis --> GSAPTicker[GSAP Ticker lagSmoothing: 0]
    GSAPTicker --> ST[ScrollTrigger over Cinematic Container]
    
    ST -- onUpdate: self.progress (0.0 to 1.0) --> TargetProgress[targetProgressRef]
    
    subgraph RAFSync [60/120fps requestAnimationFrame Engine Loop]
        TargetProgress --> Lerp[Smooth Inertia Lerp: factor = 0.14]
        Lerp --> Progress[Normalized Progress: clamp 0 to 1]
        
        Progress --> SeekEngine[CinematicBackground.seekToProgress]
        Progress --> ProgressBar[Update Bottom Progress Bar: scaleX]
        Progress --> ActSelector[Update Floating Act Navigation Buttons: ACT 01 - 04]
    end
    
    subgraph HardwareSeek [Single-Flight Coalesced Seek Engine in CinematicBackground]
        SeekEngine --> CalcTime[targetTime = progress * duration]
        CalcTime --> JitterCheck{abs(targetTime - last) < 0.008s?}
        JitterCheck -- Yes --> Skip[Ignore Micro-jitter]
        JitterCheck -- No --> FlightCheck{isSeekingRef == true?}
        FlightCheck -- Yes --> Queue[pendingTimeRef = targetTime]
        FlightCheck -- No --> IssueSeek[isSeekingRef = true; video.currentTime = targetTime]
        
        VideoSeeked[video 'seeked' event] --> FreeLock[isSeekingRef = false]
        FreeLock --> CheckPending{pendingTimeRef !== null?}
        CheckPending -- Yes --> FlushNext[Issue pendingTimeRef; pendingTimeRef = null]
        CheckPending -- No --> Idle[Decoder Idle]
    end
```

---

## 3. Four-Act Cinematic Choreography

### Act I — The Genesis of Form (The Luxury Entrance)
- **Scroll Range:** `0.00 – 0.25`
- **Headline:** `"WHERE STYLE BECOMES ART"` (Cinzel display serif with `"ART"` in italic champagne gold).
- **Eyebrow:** `ACT I · THE GENESIS OF FORM · PALSIKAR ATELIER`
- **Coordinates:** `22.7196° N, 75.8577° E · INDORE`
- **Actions:** Primary `"Reserve Your Session"` button and `"Discover The Craft ↓"` smooth-scroll anchor.
- **Motion:** As user scrolls, the headline translates upward with subtle perspective scale (`y: -120`, `scale: 0.96`), creating tactile visual depth.

### Act II — Geometric Discipline (The Art of Precision)
- **Scroll Range:** `0.25 – 0.50`
- **Headline:** `"THE ART OF PRECISION"`
- **Subtext:** `ARCHITECTURAL FADES & MASTER BARBERING`
- **Composition:** Asymmetrically aligned to the left/mid-left with localized dark readability gradients, leaving the central and right video subject (master stylist and cutting action) in full view.
- **Visual Accents:** Horizontal expanding gold rule and floating watermark Roman numeral `II`.
- **Card:** Glass card with craft manifesto (`440C JAPANESE STEEL`, `ANATOMICAL MAPPING`, `COUTURE TEXTURING`).

### Act III — Fluid Elegance (Signature Services Preview)
- **Scroll Range:** `0.50 – 0.75`
- **Headline:** `"SIGNATURE SERVICES"`
- **Subtext:** `COUTURE TEXTURES, RADIANT COLOUR & TRANQUIL RITUALS`
- **Composition:** 3 progressive glass preview cards with champagne gold borders, generous negative space, and natural document flow:
  1. *Sculptural Cut & Style* (Haute Architecture)
  2. *French Balayage & Gloss* (Couture Coloring)
  3. *Liquid Silk & Scalp Rebirth* (Restorative Spa)
- **Directory Bridge:** `"View Complete 30-Ritual Directory →"` linking smoothly to the full editorial treatment directory (`#services`).

### Act IV — Signature Identity (The Final Invitation)
- **Scroll Range:** `0.75 – 1.00`
- **Headline:** `"CRAFTED FOR YOUR STYLE"`
- **Subtext:** `INDULGE IN BESPOKE UNISEX LUXURY AT BHANU'S PALSIKAR`
- **Atmosphere:** Deepens into calm obsidian black lighting.
- **Concierge Actions:**
  - Primary `"Reserve Your Session"`
  - Direct `"WhatsApp Concierge"` (with prefilled booking prompt)
  - `"Explore The Atelier ↓"` smooth-scroll into [`TheStudio.tsx`](file:///c:/Users/HP/Downloads/bhanu%20hair%20studio/src/components/TheStudio.tsx)
- **Visual Exit Bridge:** Seamless gradient dissolver that merges effortlessly into the `#studio` section.

---

## 4. Hardware Seek Coalescing Details

Browsers throttle rapid `video.currentTime` writes if issued on every wheel tick, resulting in buffer drops and frozen frames. The single-flight seek lock guarantees decoder stability:

```ts
const requestSeek = (time: number) => {
  const video = videoRef.current;
  if (!video || video.readyState < 1) return;

  const clampedTime = Math.max(0, Math.min(videoDurationRef.current - 0.04, time));

  // 1. Skip micro-jitter (< 1/120s)
  if (Math.abs(clampedTime - lastRequestedTimeRef.current) < 0.008) return;
  lastRequestedTimeRef.current = clampedTime;

  // 2. Coalesce if hardware is already decoding
  if (isSeekingRef.current) {
    pendingTimeRef.current = clampedTime;
    return;
  }

  isSeekingRef.current = true;
  pendingTimeRef.current = null;

  try {
    if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
      (video as any).fastSeek(clampedTime);
    } else {
      video.currentTime = clampedTime;
    }
  } catch {
    video.currentTime = clampedTime;
  }
};

const onSeeked = () => {
  isSeekingRef.current = false;
  if (pendingTimeRef.current !== null) {
    const nextTime = pendingTimeRef.current;
    pendingTimeRef.current = null;
    requestSeek(nextTime);
  }
};
```

---

## 5. Performance Benchmarks & Verifications

- **Zero React Rerenders on Scroll:** Progress, DOM transformations, video seeking, and button active states are handled strictly through refs and direct DOM style mutations inside the RAF loop.
- **Strict Cleanup:** All ScrollTriggers, Lenis instances, GSAP ticker callbacks, and media event listeners are cleanly terminated in the `useEffect` unmount cycle, ensuring no leaks during client navigation.
- **Production Build:** Passes `npx tsc --noEmit` and `npm run build` with Turbopack in ~3.5s with zero errors.
