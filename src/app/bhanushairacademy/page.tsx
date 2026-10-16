import type { Metadata } from "next";
import { AcademyClientPage } from "./AcademyClientPage";

export const metadata: Metadata = {
  title: "Bhanu's Hair Academy | Professional Salon Training & Courses Indore",
  description:
    "Complete Beauty & Salon Courses in Indore: Hair, Makeup, Skin, and Nails. 80% practical training on live models, master stylist mentorship, and 100% placement support across Indore studios.",
  keywords: [
    "Bhanu Hair Academy Indore",
    "Salon Training Academy Indore",
    "Hair Styling Course Indore",
    "Bridal Makeup Course Indore",
    "Cosmetology Diploma Indore",
    "Nail Art Training Indore",
    "Skin Care Course Indore",
    "Beauty Parlour Course Indore",
  ],
  openGraph: {
    title: "Bhanu's Hair Academy | Complete Beauty & Salon Courses Indore",
    description:
      "Professional Salon Training Academy in Indore. Master Hair, Makeup, Skin, and Nails with direct apprenticeship under Master Stylist Bhanu.",
    type: "website",
  },
};

export default function BhanusHairAcademyPage() {
  return <AcademyClientPage />;
}
