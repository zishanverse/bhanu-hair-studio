/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure deep obsidian black matching reference image
        obsidian: {
          950: "#050505", // Deepest pitch black
          900: "#0A0A0C", // Layered card surface
          850: "#0E0E12",
          800: "#131317", // Elevated container surface
          700: "#1C1C22",
          600: "#27272E",
        },
        surface: {
          DEFAULT: "#0E0E12",
          hover: "#15151A",
          card: "#09090B",
        },
        // Rich, warm, bold metallic antique gold matching reference image ("WE MAKE YOUR BRAND HEARD")
        champagne: {
          50: "#FDFBF7",
          100: "#F8F3E8",
          200: "#F0E4CA",
          300: "#E4C784", // Luminous highlight gold
          400: "#D6B46B", // Bright metallic gold
          500: "#C8A252", // Signature reference gold
          600: "#AA8436", // Burnished antique gold
          700: "#8B6925", // Deep shadow gold
          800: "#694D18",
          900: "#4A360F",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#FBF9F5",
          200: "#F3ECE1",
          300: "#E2D6C5",
          400: "#CFC1AD",
        },
        muted: {
          DEFAULT: "#969087", // Refined editorial muted tone
          light: "#B8B2A8",
          dark: "#69645D",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "Space Grotesk", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        normal: "0em",
        wide: "0.08em",
        widest: "0.18em",
        ultra: "0.28em",
        editorial: "0.22em",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
    },
  },
  plugins: [],
};
