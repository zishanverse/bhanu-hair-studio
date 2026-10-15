import type { Metadata, Viewport } from "next";
import { Cinzel, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhanu Hair Studio | Haute Coiffure & Luxury Unisex Atelier Indore",
  description:
    "Indore's premier unisex hair and beauty atelier on Manik Bagh Rd, Palsikar Colony. Precision cutting, couture styling, and cinematic craftsmanship.",
  keywords: [
    "Bhanu Hair Studio",
    "Luxury Salon Indore",
    "Unisex Hair Studio Indore",
    "Haute Coiffure",
    "Precision Haircut Indore",
    "Palsikar Colony Salon",
  ],
  authors: [{ name: "Bhanu Hair Studio" }],
  openGraph: {
    title: "Bhanu Hair Studio | Where Style Becomes Art",
    description:
      "A cinematic bespoke unisex hair and beauty experience in Indore, India.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="bg-obsidian-950 text-ivory-50 font-sans antialiased selection:bg-champagne-500/30 selection:text-champagne-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
