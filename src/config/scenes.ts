export interface SceneOverlay {
  id: string;
  chapter: string;
  title: string;
  italicWord?: string;
  subtext?: string;
  start: number;       // Progress (0 to 1) where this scene becomes active
  peak: number;        // Progress where opacity is 100%
  end: number;          // Progress where this scene fades out completely
  position: {
    desktop: {
      align: "left" | "center" | "right";
      vertical: "top" | "center" | "bottom";
      offsetX?: string;
      offsetY?: string;
    };
    mobile: {
      align: "left" | "center" | "right";
      vertical: "top" | "center" | "bottom";
    };
  };
  details?: {
    location?: string;
    note?: string;
  };
}

export interface VideoHeroConfig {
  videoSrc: string;
  posterSrc?: string;
  scrollDistanceVh: number; // Configured for 44-second commercial video
  scrubSmoothing: number;
  scenes: SceneOverlay[];
}

export const HERO_CONFIG: VideoHeroConfig = {
  // Fast Cloudflare CDN Cloudinary streaming URL with byte-range seek and compressed bitrate
  videoSrc: "https://res.cloudinary.com/deepcnbrz/video/upload/v1792133948/Untitled_Scene_10-16_06_52_45_20261016122527_fz3nai.mp4",
  posterSrc: "",
  scrollDistanceVh: 750, // Extended long scroll to scrub the full 44-second film smoothly to the end
  scrubSmoothing: 0.5,
  scenes: [
    {
      id: "intro",
      chapter: "ACT I — THE GENESIS OF FORM",
      title: "WHERE STYLE BECOMES ART.",
      italicWord: "ART",
      subtext: "HAUTE COIFFURE & UNISEX ATELIER · PALSIKAR INDORE",
      start: 0.0,
      peak: 0.10,
      end: 0.22,
      position: {
        desktop: {
          align: "center",
          vertical: "center",
          offsetX: "0vw",
          offsetY: "0vh",
        },
        mobile: {
          align: "center",
          vertical: "center",
        },
      },
      details: {
        location: "INDORE, INDIA",
        note: "SCISSORS & COMB RITUAL",
      },
    },
    {
      id: "precision",
      chapter: "ACT II — GEOMETRIC DISCIPLINE",
      title: "THE ART OF PRECISION.",
      italicWord: "PRECISION",
      subtext: "ARCHITECTURAL FADES & MASTER BARBERING",
      start: 0.26,
      peak: 0.38,
      end: 0.50,
      position: {
        desktop: {
          align: "center",
          vertical: "center",
          offsetX: "0vw",
          offsetY: "0vh",
        },
        mobile: {
          align: "center",
          vertical: "center",
        },
      },
      details: {
        location: "GROOMING SANCTUARY",
        note: "ELECTRIC CLIPPERS & SHARP EDGES",
      },
    },
    {
      id: "beauty",
      chapter: "ACT III — FLUID ELEGANCE",
      title: "BEAUTY IN EVERY DETAIL.",
      italicWord: "DETAIL",
      subtext: "COUTURE TEXTURES, RADIANT COLOUR & MOVEMENT",
      start: 0.54,
      peak: 0.68,
      end: 0.80,
      position: {
        desktop: {
          align: "center",
          vertical: "center",
          offsetX: "0vw",
          offsetY: "0vh",
        },
        mobile: {
          align: "center",
          vertical: "center",
        },
      },
      details: {
        location: "WOMEN'S STYLING LOUNGE",
        note: "GLOSS & SILK MOTION",
      },
    },
    {
      id: "finale",
      chapter: "ACT IV — SIGNATURE IDENTITY",
      title: "CRAFTED FOR YOUR STYLE.",
      italicWord: "STYLE",
      subtext: "INDULGE IN BESPOKE UNISEX LUXURY AT BHANU'S PALSIKAR",
      start: 0.84,
      peak: 0.94,
      end: 1.0,
      position: {
        desktop: {
          align: "center",
          vertical: "center",
          offsetX: "0vw",
          offsetY: "0vh",
        },
        mobile: {
          align: "center",
          vertical: "center",
        },
      },
      details: {
        location: "PALSIKAR COLONY, INDORE",
        note: "BHANU'S THE HAIR STUDIO PALSIKAR",
      },
    },
  ],
};
