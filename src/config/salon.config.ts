export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  tag?: string;
  duration?: string;
}

export interface ServiceCategory {
  id: string;
  num: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  featured?: boolean;
  services: ServiceItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "mens" | "womens" | "colour" | "treatments";
  categoryLabel: string;
  image: string;
  aspect: "tall" | "wide" | "square";
  description: string;
  transformation?: {
    beforeImage: string;
    afterImage: string;
    details: string;
  };
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  service: string;
  rating: number;
}

export interface SalonConfiguration {
  identity: {
    brandName: string;
    brandSub: string;
    establishedYear: number;
    city: string;
    state: string;
    country: string;
    tagline: string;
    coordinates: {
      lat: string;
      lng: string;
      display: string;
    };
  };
  contact: {
    phone: string;
    displayPhone: string;
    whatsappNumber: string;
    whatsappPrefill: string;
    email: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
      mapsUrl: string;
    };
    hours: {
      days: string;
      time: string;
      note?: string;
    }[];
  };
  social: {
    instagram: string;
    facebook: string;
    maps: string;
  };
  theStudio: {
    sectionNum: string;
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    philosophy: string[];
    featuredImage: string;
    accentImage: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  servicesCatalog: {
    sectionNum: string;
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    categories: ServiceCategory[];
  };
  signatureExperience: {
    sectionNum: string;
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    chapters: {
      id: string;
      num: string;
      title: string;
      subtitle: string;
      description: string;
      keyPoints: string[];
      image: string;
    }[];
  };
  gallery: {
    sectionNum: string;
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    items: GalleryItem[];
  };
  skincare: {
    sectionNum: string;
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    services: {
      id: string;
      num: string;
      name: string;
      tagline: string;
      description: string;
      protocol: string;
      image: string;
    }[];
  };
  testimonials: {
    sectionNum: string;
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    items: TestimonialItem[];
  };
  booking: {
    headingLine1: string;
    headingLine2: string;
    subtext: string;
  };
}

export const SALON_CONFIG: SalonConfiguration = {
  identity: {
    brandName: "BHANU",
    brandSub: "HAIR STUDIO",
    establishedYear: 2018,
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    tagline: "Where Style Becomes Art.",
    coordinates: {
      lat: "22.7196° N",
      lng: "75.8577° E",
      display: "22.7196° N, 75.8577° E — INDORE",
    },
  },
  contact: {
    phone: "+919876543210",
    displayPhone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    whatsappPrefill: "Hello Bhanu Hair Studio, I would like to schedule an appointment consultation.",
    email: "atelier@bhanuhairstudio.com",
    address: {
      line1: "Scheme No. 54, PU-4 Commercial Complex",
      line2: "Near Vijay Nagar Square, AB Road",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452010",
      mapsUrl: "https://maps.google.com/?q=Vijay+Nagar+Indore",
    },
    hours: [
      {
        days: "Tuesday – Sunday",
        time: "10:00 AM – 8:30 PM",
        note: "Walk-ins subject to stylist availability",
      },
      {
        days: "Monday",
        time: "By Prior Appointment Only",
        note: "VIP Master Sessions",
      },
    ],
  },
  social: {
    instagram: "https://instagram.com/bhanuhairstudio",
    facebook: "https://facebook.com/bhanuhairstudio",
    maps: "https://maps.google.com/?q=Vijay+Nagar+Indore",
  },
  theStudio: {
    sectionNum: "01",
    sectionLabel: "THE STUDIO",
    headingLine1: "MORE THAN",
    headingLine2: "A HAIRCUT.",
    description:
      "Precision cuts, exceptional styling, and personalized care. Discover a space where your individuality inspires every detail.",
    philosophy: [
      "Every appointment begins with an anatomical consultation tailored to facial architecture and natural hair movement.",
      "We fuse European precision techniques with contemporary bespoke grooming to craft enduring personal aesthetics.",
      "Our Indore atelier provides an intentional calm away from the bustle, curated with warm acoustics, champagne accents, and discreet luxury.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    accentImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    stats: [
      { value: "08+", label: "Years of Master Artistry" },
      { value: "100%", label: "Bespoke Anatomical Analysis" },
      { value: "Indore", label: "Premier Unisex Flagship" },
    ],
  },
  servicesCatalog: {
    sectionNum: "02",
    sectionLabel: "OUR EXPERTISE",
    headingLine1: "YOUR STYLE.",
    headingLine2: "OUR CRAFT.",
    description:
      "Explore our four dedicated craft disciplines. Each ritual combines master-grade tools, organic botanical infusions, and sculptural refinement.",
    categories: [
      {
        id: "haircuts-styling",
        num: "01",
        title: "Haircuts & Styling",
        eyebrow: "SCULPTURAL PRECISION",
        description:
          "Master haircuts crafted to harmonize with your cranial geometry, lifestyle, and natural texture.",
        image:
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
        featured: true,
        services: [
          {
            id: "hc-1",
            name: "Hair Cut",
            description: "Signature structural wash, scissor balance, perimeter detailing, and directional finish.",
            duration: "40 min",
            tag: "Core",
          },
          {
            id: "hc-2",
            name: "Advanced Hair Cut",
            description: "High-precision texturizing, architectural skin fade, razor etching, and hot-towel ritual.",
            duration: "60 min",
            tag: "Signature",
          },
          {
            id: "hc-3",
            name: "Hair Dressing",
            description: "Bespoke styling for galas, weddings, and high-fashion editorial presentations.",
            duration: "50 min",
            tag: "Editorial",
          },
          {
            id: "hc-4",
            name: "Hair Styling",
            description: "Thermal contouring, volume lift, ceramic tong waves, and weightless silk mist.",
            duration: "45 min",
            tag: "Express",
          },
        ],
      },
      {
        id: "hair-treatments",
        num: "02",
        title: "Hair Treatments",
        eyebrow: "BIOLOGICAL RESTORATION",
        description:
          "Advanced bond-rebuilding and moisture therapy engineered to restore damaged cuticle integrity.",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
        featured: false,
        services: [
          {
            id: "ht-1",
            name: "Hair Care",
            description: "Deep scalp detox, micro-follicle stimulation, and essential peptide infusion.",
            duration: "45 min",
            tag: "Restorative",
          },
          {
            id: "ht-2",
            name: "Hair Spa",
            description: "Therapeutic steam infusion, intensive nutrient cream bath, and cranial pressure point massage.",
            duration: "60 min",
            tag: "Sensory",
          },
          {
            id: "ht-3",
            name: "Hair Rebonding",
            description: "Precision thermal restructuring delivering mirror-flat, permanent silky straight alignment.",
            duration: "150 min",
            tag: "Transformative",
          },
          {
            id: "ht-4",
            name: "Volume Explosion Hair Treatment",
            description: "Multi-molecular collagen plump therapy for thinning or limp hair requiring structural density.",
            duration: "75 min",
            tag: "Exclusive",
          },
        ],
      },
      {
        id: "hair-colour",
        num: "03",
        title: "Hair Colour",
        eyebrow: "DIMENSIONAL TONING",
        description:
          "French balayage, custom contour foils, and chromatic tones calibrated to complement skin undertones.",
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
        featured: false,
        services: [
          {
            id: "hcol-1",
            name: "Hair Highlights",
            description: "Multi-dimensional baby-lights, face-framing money pieces, and seamless sun-kissed blending.",
            duration: "90 – 150 min",
            tag: "Couture",
          },
        ],
      },
      {
        id: "skin-care",
        num: "04",
        title: "Skin Care",
        eyebrow: "DERMAL CLARITY",
        description:
          "Medical-grade botanical skincare formulated to deeply cleanse, refine pores, and restore dermal glow.",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
        featured: true,
        services: [
          {
            id: "sk-1",
            name: "Clean Up",
            description: "Aqueous exfoliation, vacuum blackhead extraction, and calming zinc mask.",
            duration: "40 min",
            tag: "Essential",
          },
          {
            id: "sk-2",
            name: "Facial",
            description: "Multi-step antioxidant infusion, lymphatic drainage, and luminous collagen veil.",
            duration: "60 min",
            tag: "Radiance",
          },
          {
            id: "sk-3",
            name: "Anti Acne Facial",
            description: "Salicylic clarification, blue light therapy, and sebum-regulating botanical serums.",
            duration: "75 min",
            tag: "Purifying",
          },
          {
            id: "sk-4",
            name: "Tan Removal Facial",
            description: "Enzymatic melanin reduction, vitamin C lightening mask, and SPF moisture shield.",
            duration: "65 min",
            tag: "Brightening",
          },
        ],
      },
    ],
  },
  signatureExperience: {
    sectionNum: "03",
    sectionLabel: "THE SIGNATURE EXPERIENCE",
    headingLine1: "THE DETAILS",
    headingLine2: "MAKE THE DIFFERENCE.",
    chapters: [
      {
        id: "precision",
        num: "01",
        title: "PRECISION",
        subtitle: "Professional haircutting and master barbering",
        description:
          "Every millimeter is intentional. Using Japanese steel shears and calibrated electric clippers, our master cutters craft clean geometry tailored to your skull shape.",
        keyPoints: [
          "Micro-adjusted Japanese stainless steel shears",
          "Zero-gap foil fade and tapered transition line",
          "Hot herbal towel and beard perimeter refinement",
        ],
        image:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "transformation",
        num: "02",
        title: "TRANSFORMATION",
        subtitle: "Hair treatments, styling and dimensional colour",
        description:
          "From restorative keratin infusions to dimensional French highlights, we transmute tired follicles into liquid silk with luminous movement and health.",
        keyPoints: [
          "Custom bond multipliers preventing chemical fatigue",
          "Bespoke chromatic toner matched to iris and skin tone",
          "Silky thermal lock ensuring weeks of humidity resistance",
        ],
        image:
          "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "rejuvenation",
        num: "03",
        title: "REJUVENATION",
        subtitle: "Skin care, hair spa and facial wellness",
        description:
          "Step into complete sensory stillness. Our dedicated private therapy lounge treats the mind and skin together with soothing steam, ice rollers, and acupressure.",
        keyPoints: [
          "Ultrasonic deep pore extraction and cold quartz rollers",
          "Cranial massage releasing tension along the temple lines",
          "High-potency botanical serums restoring skin barrier",
        ],
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
  gallery: {
    sectionNum: "04",
    sectionLabel: "OUR WORK",
    headingLine1: "EVERY LOOK",
    headingLine2: "TELLS A STORY.",
    description:
      "A curated archive of transformations crafted in our Indore atelier. Each portrait captures authenticity, structural balance, and radiant texture.",
    items: [
      {
        id: "look-1",
        title: "Textured Crop & Low Taper Fade",
        category: "mens",
        categoryLabel: "Men's Hair",
        image:
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        description: "Matte texturizing clay finish with seamless low skin fade.",
        transformation: {
          beforeImage:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80",
          details: "Overgrown fringe transformed into sculpted editorial crop.",
        },
      },
      {
        id: "look-2",
        title: "Caramel Balayage & Soft Waves",
        category: "colour",
        categoryLabel: "Hair Colour",
        image:
          "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        description: "Hand-painted warm amber tones on deep espresso roots.",
      },
      {
        id: "look-3",
        title: "Couture Curtain Layers",
        category: "womens",
        categoryLabel: "Women's Hair",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        description: "Face-framing butterfly layers with mirror-finish blowout.",
      },
      {
        id: "look-4",
        title: "Volume Explosion Protein Reset",
        category: "treatments",
        categoryLabel: "Treatments",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
        description: "Complete cuticle sealing and frizz elimination.",
        transformation: {
          beforeImage:
            "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
          details: "Brittle bleached fibers rebuilt with multi-collagen bonding.",
        },
      },
      {
        id: "look-5",
        title: "Sharp Geometric Pompadour",
        category: "mens",
        categoryLabel: "Men's Hair",
        image:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        description: "Clean classic contour with natural matte hold.",
      },
      {
        id: "look-6",
        title: "Champagne Blonde Dimension",
        category: "colour",
        categoryLabel: "Hair Colour",
        image:
          "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        description: "Seamless root shadow and luminous platinum micro-babylights.",
      },
    ],
  },
  skincare: {
    sectionNum: "05",
    sectionLabel: "BEYOND HAIR",
    headingLine1: "CARE THAT",
    headingLine2: "GOES DEEPER.",
    description:
      "A quiet oasis dedicated to dermal restoration. Our therapies combine clinical-grade botanical active serums with sensory massage techniques to detoxify, soothe, and illuminate your complexion.",
    services: [
      {
        id: "clean-up",
        num: "01",
        name: "Clean Up",
        tagline: "Essential Pore Refinement & Cellular Exfoliation",
        description:
          "An invigorating dermal cleanse utilizing botanical fruit enzymes to dissolve dead surface cells, followed by delicate manual extraction and an organic oat milk soothing pack.",
        protocol: "Double cleanse → Enzymatic steam → Manual vacuum extraction → Calming thermal mist",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "facial",
        num: "02",
        name: "Facial",
        tagline: "The Signature Illuminating Radiance Ritual",
        description:
          "A multi-stage sensory journey including lymphatic neck drainage, customized hydro-jelly mask, and deeply hydrating peptides that leave the skin plump and radiant.",
        protocol: "Lymphatic drainage → Micro-circulation massage → Peptides & vitamin bath → Rose quartz seal",
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "anti-acne-facial",
        num: "03",
        name: "Anti Acne Facial",
        tagline: "Targeted Clarification & Sebum Stabilization",
        description:
          "Designed specifically for congested or inflammation-prone skin. Infuses anti-bacterial tea tree and salicylic actives while soothing erythema with cold botanical compresses.",
        protocol: "Salicylic peel → High frequency blue ozone → Tea tree clarifying veil → Zinc soothing compress",
        image:
          "https://images.unsplash.com/photo-1512290900672-1f417551980a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "tan-removal-facial",
        num: "04",
        name: "Tan Removal Facial",
        tagline: "Enzymatic Melanin Balance & Sun Damage Repair",
        description:
          "Reverses oxidative sun exposure and dullness. Potent stabilized Vitamin C and licorice root gently lift stubborn hyperpigmentation without irritating sensitive barriers.",
        protocol: "Kojic & lactic exfoliant → Vitamin C ultrasonic infusion → Licorice root brighten mask → Mineral SPF shield",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  testimonials: {
    sectionNum: "06",
    sectionLabel: "CLIENT VOICES",
    headingLine1: "CONFIDENCE,",
    headingLine2: "REFLECTED.",
    items: [
      {
        id: "t-1",
        clientName: "Aarav Sharma",
        clientRole: "Architect & Creative Director, Indore",
        quote:
          "Bhanu Hair Studio is on another level. The scissor work and attention to facial structure is something you usually only find at high-end studios in Milan or Mumbai. The space is calm, intentional, and genuinely luxurious.",
        service: "Advanced Hair Cut & Beard Architecture",
        rating: 5,
      },
      {
        id: "t-2",
        clientName: "Pooja Singhania",
        clientRole: "Fashion Stylist, Indore",
        quote:
          "My balayage has never looked this seamless. The caramel transition looks completely natural in sunlight, and my hair felt healthier after the session than before. Truly Indore's finest atelier.",
        service: "French Balayage & Volume Treatment",
        rating: 5,
      },
      {
        id: "t-3",
        clientName: "Rohan Varma",
        clientRole: "Entrepreneur, Indore",
        quote:
          "The facial and scalp ritual is my essential monthly reset. Zero rushing, incredible technique, and an atmosphere that lets you unwind completely. An effortless 5-star experience.",
        service: "Signature Facial & Hair Spa",
        rating: 5,
      },
    ],
  },
  booking: {
    headingLine1: "YOUR NEXT LOOK",
    headingLine2: "STARTS HERE.",
    subtext:
      "Reserve your bespoke styling session with our master artists. Advance appointments recommended for personalized consultations.",
  },
};
