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
        obsidian: {
          950: "#0B0B0C", // art direction primary background
          900: "#111113",
          800: "#171719", // secondary surface
          700: "#222226",
          600: "#2F2F35",
        },
        surface: {
          DEFAULT: "#171719",
          hover: "#1F1F22",
          card: "#141416",
        },
        champagne: {
          50: "#FAF7F2",
          100: "#F5EFE6",
          200: "#EADCC9",
          300: "#DEC7A9",
          400: "#D3B68E",
          500: "#C5A477", // art direction signature champagne gold
          600: "#B28F5F",
          700: "#8F6E43",
          800: "#6A502D",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#FAF8F5",
          200: "#F4EFE8", // warm ivory
          300: "#E4DCD2",
          400: "#D2C7B9",
        },
        muted: {
          DEFAULT: "#A9A29B", // muted text
          light: "#BEB8B2",
          dark: "#78726C",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.3em",
        editorial: "0.15em",
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
