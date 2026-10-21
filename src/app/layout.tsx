import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/SmoothScrollProvider";
import { SALON_CONFIG } from "@/config/salon.config";

// Display Serif - Preloaded for Above-The-Fold Regal Presence
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["600", "700"],
  display: "swap",
  preload: true,
});

// Editorial Serif - Lazy-loaded for subheadings & pull quotes
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

// Clean Modern Body Sans - Lazy-loaded for optimal initial payload
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhanuhairstudio.com"),
  title: {
    default: "Bhanu's The Hair Studio | Luxury Unisex Salon & Hair Academy Indore",
    template: "%s | Bhanu's The Hair Studio Indore",
  },
  description:
    "Indore's premier unisex luxury hair studio & academy on Manik Bagh Rd, Palsikar Colony. Master Japanese precision cutting, French balayage, keratin smoothing, and head spa rituals across 3 Indore locations.",
  keywords: [
    "Bhanu Hair Studio",
    "Bhanu's The Hair Studio",
    "Luxury Salon Indore",
    "Unisex Salon Indore",
    "Best Hair Studio Indore",
    "Haircut Palsikar Colony",
    "Keratin Treatment Indore",
    "Hair Smoothing Indore",
    "Balayage Hair Colour Indore",
    "Hair Academy Indore",
    "Bridal Makeup Indore",
    "Head Spa Indore",
    "Manik Bagh Road Salon",
    "Saket Nagar Salon",
    "Vijay Nagar Salon",
  ],
  authors: [{ name: "Master Stylist Bhanu" }],
  creator: "Bhanu's The Hair Studio",
  publisher: "Bhanu's The Hair Studio",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bhanu's The Hair Studio | Where Style Becomes Art",
    description:
      "A cinematic bespoke unisex hair and beauty atelier in Indore, India. Precision cutting, French balayage, keratin infusions, and professional salon training.",
    url: "https://bhanuhairstudio.com",
    siteName: "Bhanu's The Hair Studio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/studio-interior.jpg",
        width: 1200,
        height: 630,
        alt: "Bhanu's The Hair Studio Atelier Interior, Palsikar Colony, Indore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhanu's The Hair Studio | Luxury Unisex Salon Indore",
    description: "Where Style Becomes Art. Master Japanese precision shears, couture colour, and luxury grooming in Indore.",
    images: ["/images/studio-interior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  // Rich Schema.org LocalBusiness & HairSalon Structured Data for Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "HealthAndBeautyBusiness"],
    name: "Bhanu's The Hair Studio",
    image: "https://bhanuhairstudio.com/images/studio-interior.jpg",
    description:
      "Indore's premier unisex luxury hair studio and academy located on Manik Bagh Road, Palsikar Colony. Precision haircuts, balayage, keratin smoothing, and head spa rituals.",
    telephone: SALON_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SALON_CONFIG.contact.address.line1,
      addressLocality: SALON_CONFIG.contact.address.city,
      addressRegion: SALON_CONFIG.contact.address.state,
      postalCode: SALON_CONFIG.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.7058,
      longitude: 75.8567,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    priceRange: "₹₹ - ₹₹₹",
    url: "https://bhanuhairstudio.com",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bhanu's The Hair Studio Services Catalog",
      itemListElement: SALON_CONFIG.servicesCatalog.categories.flatMap((cat) =>
        cat.services.map((svc) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: svc.name,
            description: svc.description,
          },
        }))
      ),
    },
    department: SALON_CONFIG.outlets.map((outlet) => ({
      "@type": "HairSalon",
      name: outlet.name,
      address: outlet.address,
      telephone: outlet.phone,
      openingHours: outlet.hours,
    })),
  };

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian-950 text-ivory-50 font-sans antialiased selection:bg-champagne-500/30 selection:text-champagne-200 min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-champagne-500 focus:text-obsidian-950 focus:font-medium focus:text-xs focus:tracking-wider focus:uppercase focus:rounded-sm focus:shadow-2xl focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
