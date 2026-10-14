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
    branch: string;
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
      fullAddress: string;
      mapsUrl: string;
    };
    hours: {
      days: string;
      time: string;
      status: string;
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
    brandName: "BHANU'S",
    brandSub: "THE HAIR STUDIO PALSIKAR",
    branch: "Palsikar Colony, Indore",
    establishedYear: 2018,
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    tagline: "Where Style Becomes Art.",
    coordinates: {
      lat: "22.7058° N",
      lng: "75.8567° E",
      display: "22.7058° N, 75.8567° E — PALSIKAR COLONY, INDORE",
    },
  },
  contact: {
    phone: "+919876543210",
    displayPhone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    whatsappPrefill: "Hello Bhanu's The Hair Studio Palsikar, I would like to schedule an appointment consultation.",
    email: "atelier@bhanuhairstudio.com",
    address: {
      line1: "Shop No.4, Sewak Avenue, 7, Manik Bagh Rd",
      line2: "Palsikar Colony",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452007",
      fullAddress: "Shop No.4, Sewak Avenue, 7, Manik Bagh Rd, Palsikar Colony, Indore, Madhya Pradesh 452007",
      mapsUrl: "https://maps.google.com/?q=Shop+No.4,+Sewak+Avenue,+7,+Manik+Bagh+Rd,+Palsikar+Colony,+Indore,+Madhya+Pradesh+452007",
    },
    hours: [
      {
        days: "Monday – Sunday (Open Daily)",
        time: "10:00 AM – 10:00 PM",
        status: "Open · Closes 10 pm",
        note: "Open Daily · Closes 10 PM",
      },
    ],
  },
  social: {
    instagram: "https://instagram.com/bhanuhairstudio",
    facebook: "https://facebook.com/bhanuhairstudio",
    maps: "https://maps.google.com/?q=Shop+No.4,+Sewak+Avenue,+7,+Manik+Bagh+Rd,+Palsikar+Colony,+Indore,+Madhya+Pradesh+452007",
  },
  theStudio: {
    sectionNum: "01",
    sectionLabel: "THE STUDIO",
    headingLine1: "MORE THAN",
    headingLine2: "A HAIRCUT.",
    description:
      "Precision cuts, exceptional styling, and personalized care at Bhanu's The Hair Studio Palsikar. Discover a space where your individuality inspires every detail.",
    philosophy: [
      "Every appointment begins with an anatomical consultation tailored to facial architecture, personal aesthetic, and natural hair movement.",
      "We fuse European precision techniques with contemporary bespoke grooming to craft enduring personal elegance for men and women.",
      "Our Palsikar Colony studio provides an intentional sanctuary on Manik Bagh Road, curated with warm acoustics, champagne accents, and discreet unisex luxury.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    accentImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    stats: [
      { value: "10 PM", label: "Open Daily Until 10:00 PM" },
      { value: "30+", label: "Unisex Hair & Beauty Disciplines" },
      { value: "Palsikar", label: "Colony, Manik Bagh Rd, Indore" },
    ],
  },
  servicesCatalog: {
    sectionNum: "02",
    sectionLabel: "OUR EXPERTISE",
    headingLine1: "YOUR STYLE.",
    headingLine2: "OUR CRAFT.",
    description:
      "Comprehensive unisex salon & aesthetic rituals at Bhanu's The Hair Studio Palsikar. Combining master Japanese shears, organic formulations, and couture styling.",
    categories: [
      {
        id: "haircuts-styling-men",
        num: "01",
        title: "Haircut, Beard & Men's Salon",
        eyebrow: "SCULPTURAL PRECISION & MEN'S SALON",
        description:
          "Master haircutting, beard contouring, blow dry, and precision styling for discerning unisex clientele.",
        image:
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
        featured: true,
        services: [
          {
            id: "hc-1",
            name: "Haircut",
            description: "Signature structural wash, scissor balance, perimeter detailing, and directional finish.",
            duration: "40 min",
            tag: "Core",
          },
          {
            id: "hc-2",
            name: "Beard Cutting & Trimming",
            description: "Sculpted beard shaping, line-up razor edging, hot herbal towel press, and nourishing beard oil ritual.",
            duration: "30 min",
            tag: "Men's Salon",
          },
          {
            id: "hc-3",
            name: "Blow dry & Hairstyling",
            description: "Couture blow dry, ceramic tong waves, thermal volume contouring, and weightless silk mist.",
            duration: "45 min",
            tag: "Styling",
          },
          {
            id: "hc-4",
            name: "Hair Studio Signature Session",
            description: "Complete bespoke makeover combining master cut, scalp cleanse, and customized day-to-evening style.",
            duration: "60 min",
            tag: "Signature",
          },
        ],
      },
      {
        id: "hair-treatments-rebonding",
        num: "02",
        title: "Hair Treatments & Texture Services",
        eyebrow: "BIOLOGICAL RESTORATION & SMOOTHING",
        description:
          "Specialized Keratin Treatment, Hair Rebonding, Hair Smoothing, and Herbal Treat rituals for glossy resilience.",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
        featured: false,
        services: [
          {
            id: "ht-1",
            name: "Keratin Treatment",
            description: "Deep nano-keratin protein infusion eliminating frizz and infusing brilliant gloss for up to 4 months.",
            duration: "120 min",
            tag: "Bestseller",
          },
          {
            id: "ht-2",
            name: "Hair Rebonding & Hair Smoothing",
            description: "Permanent structural thermal alignment delivering mirror-straight, fluid silk texture and softness.",
            duration: "150 min",
            tag: "Transformative",
          },
          {
            id: "ht-3",
            name: "Texture Services",
            description: "Bespoke hair texture modification, volume smoothing, relaxers, and natural curl contouring.",
            duration: "90 min",
            tag: "Custom",
          },
          {
            id: "ht-4",
            name: "Hair Treatments & Herbal Treat",
            description: "Organic botanical scalp and hair treatments infused with ayurvedic herbs to strengthen follicles.",
            duration: "60 min",
            tag: "Holistic",
          },
        ],
      },
      {
        id: "hair-colouring",
        num: "03",
        title: "Hair Colouring & Creative Balayage",
        eyebrow: "DIMENSIONAL TONING & COUTURE HUES",
        description:
          "Full spectrum hair colouring, French balayage, multidimensional highlights, and root touch-ups.",
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
        featured: false,
        services: [
          {
            id: "hcol-1",
            name: "Hair Colouring (Global & Highlights)",
            description: "Custom formulated rich ammonia-free tones, dimensional baby-lights, and seamless gray coverage.",
            duration: "90 – 150 min",
            tag: "Couture",
          },
          {
            id: "hcol-2",
            name: "Balayage & Ombré Artistry",
            description: "Freehand hand-painted gradient transitions from deep roots to luminous sunkissed champagne tips.",
            duration: "120 min",
            tag: "Signature",
          },
        ],
      },
      {
        id: "bridal-makeup-beauty",
        num: "04",
        title: "Bridal Services, Make-up & Nail Art",
        eyebrow: "COUTURE BEAUTY & CELEBRATION",
        description:
          "Exquisite Bridal services, Make-up services, Eyelashes, Eyebrow beautification, and Nail Art.",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
        featured: true,
        services: [
          {
            id: "bm-1",
            name: "Bridal Services & Make-up",
            description: "High-definition bridal makeover, bespoke hair ornamentation, draping, and waterproof camera-ready glow.",
            duration: "180 min",
            tag: "Bridal",
          },
          {
            id: "bm-2",
            name: "Make-up & Make-up Services",
            description: "Glamour, reception, cocktail, and editorial party makeup tailored to your outfit and undertones.",
            duration: "75 min",
            tag: "Glamour",
          },
          {
            id: "bm-3",
            name: "Eyelashes & Eyebrow Beautification",
            description: "Precision eyebrow threading, mapping, tinting, micro-sculpting, and classic/volume eyelash extensions.",
            duration: "45 min",
            tag: "Aesthetics",
          },
          {
            id: "bm-4",
            name: "Nail Art & Extensions",
            description: "Gel extensions, French tips, chrome mirror finishes, and hand-painted miniature luxury nail art.",
            duration: "60 min",
            tag: "Nails",
          },
        ],
      },
      {
        id: "skin-facials-acne",
        num: "05",
        title: "Facials, Clean Up & Acne Treatments",
        eyebrow: "CLINICAL DERMAL THERAPY",
        description:
          "Advanced Facials, deep Clean Up, and clinical Acne treatments formulated for long-lasting complexion radiance.",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
        featured: false,
        services: [
          {
            id: "sk-1",
            name: "Clean Up",
            description: "Aqueous exfoliation, manual blackhead vacuum extraction, pore refining pack, and calming mist.",
            duration: "40 min",
            tag: "Essential",
          },
          {
            id: "sk-2",
            name: "Facials (Radiance & Anti-Oxidant)",
            description: "Multi-stage brightening facial with lymphatic drainage, collagen booster, and cold quartz seal.",
            duration: "60 min",
            tag: "Radiance",
          },
          {
            id: "sk-3",
            name: "Acne Treatments",
            description: "Targeted salicylic peel, blue light clarification, and sebum-balancing organic tea tree compresses.",
            duration: "75 min",
            tag: "Purifying",
          },
        ],
      },
      {
        id: "spa-pedicure-waxing",
        num: "06",
        title: "Spa Services, Pedicure, Massage & Waxing",
        eyebrow: "SENSORY RELAXATION & DEPILATION",
        description:
          "Indulgent Spa services, Pedicure, relaxing Massage, Body waxing, Waxing Oil Wax, and Home Services.",
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
        featured: true,
        services: [
          {
            id: "sp-1",
            name: "Spa Services & Massage",
            description: "Therapeutic hair spa, cranial acupressure, and tension-melting shoulder and neck massage.",
            duration: "60 min",
            tag: "Sensory",
          },
          {
            id: "sp-2",
            name: "Pedicure & Hand Ritual",
            description: "Sea salt soak, cuticle therapy, exfoliating scrub, and soothing botanical massage with glossy finish.",
            duration: "50 min",
            tag: "Care",
          },
          {
            id: "sp-3",
            name: "Body Waxing & Waxing Oil Wax",
            description: "Gentle liposoluble waxing and nourishing waxing oil wax formulation for irritation-free silky smooth skin.",
            duration: "45 min",
            tag: "Smooth",
          },
          {
            id: "sp-4",
            name: "Home Services",
            description: "Exclusive bespoke salon services delivered in the convenience and privacy of your residence in Indore.",
            duration: "Custom",
            tag: "VIP Service",
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
        subtitle: "Professional haircutting, beard trimming and men's salon",
        description:
          "Every millimeter is intentional at Bhanu's The Hair Studio Palsikar. Using Japanese steel shears and calibrated clippers, our master cutters craft clean geometry tailored to your skull shape.",
        keyPoints: [
          "Micro-adjusted Japanese stainless steel shears",
          "Zero-gap beard contouring and razor fade",
          "Hot herbal towel and beard perimeter refinement",
        ],
        image:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "transformation",
        num: "02",
        title: "TRANSFORMATION",
        subtitle: "Keratin, rebonding, hair smoothing and balayage",
        description:
          "From restorative keratin treatments and permanent rebonding to hand-painted balayage, we transmute hair fibers into liquid silk with luminous health.",
        keyPoints: [
          "Keratin and smoothing infusions with long-lasting frizz protection",
          "Bespoke chromatic balayage matched to iris and skin tone",
          "Silky thermal lock ensuring weeks of humidity resistance",
        ],
        image:
          "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "rejuvenation",
        num: "03",
        title: "REJUVENATION",
        subtitle: "Facials, clean up, acne treatments, spa & pedicure",
        description:
          "Step into complete sensory stillness in Palsikar Colony. Our therapy lounge treats mind and skin together with soothing steam, ice rollers, massage, and gentle waxing oil wax.",
        keyPoints: [
          "Ultrasonic deep pore extraction and acne clarification",
          "Therapeutic spa services and luxury pedicure",
          "Body waxing with nourishing waxing oil wax",
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
      "A curated archive of transformations crafted at Bhanu's The Hair Studio Palsikar. Each portrait captures authenticity, structural balance, and radiant texture.",
    items: [
      {
        id: "look-1",
        title: "Textured Crop & Low Taper Fade",
        category: "mens",
        categoryLabel: "Men's Hair",
        image:
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        description: "Matte texturizing finish with seamless low skin fade.",
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
        title: "Couture Curtain Layers & Blowout",
        category: "womens",
        categoryLabel: "Women's Hair",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        description: "Face-framing butterfly layers with mirror-finish blowout.",
      },
      {
        id: "look-4",
        title: "Keratin & Smoothing Glass Reset",
        category: "treatments",
        categoryLabel: "Treatments",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
        description: "Complete cuticle sealing, hair smoothing, and frizz elimination.",
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
        title: "Sharp Beard Contour & Pompadour",
        category: "mens",
        categoryLabel: "Men's Hair",
        image:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        description: "Clean classic contour with natural matte hold.",
      },
      {
        id: "look-6",
        title: "Bridal Glow & Artistry Finish",
        category: "colour",
        categoryLabel: "Bridal & Make-up",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        description: "High-definition makeup and couture hair ornamentation for grand celebration.",
      },
    ],
  },
  skincare: {
    sectionNum: "05",
    sectionLabel: "BEYOND HAIR",
    headingLine1: "CARE THAT",
    headingLine2: "GOES DEEPER.",
    description:
      "A quiet oasis dedicated to dermal restoration at Palsikar Colony. Our therapies combine clinical-grade botanical active serums with sensory massage techniques to detoxify, soothe, and illuminate your complexion.",
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
        name: "Facials (Gold & Radiance)",
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
        name: "Acne Treatments",
        tagline: "Targeted Clarification & Sebum Stabilization",
        description:
          "Designed specifically for congested or inflammation-prone skin. Infuses anti-bacterial tea tree and salicylic actives while soothing erythema with cold botanical compresses.",
        protocol: "Salicylic peel → High frequency blue ozone → Tea tree clarifying veil → Zinc soothing compress",
        image:
          "https://images.unsplash.com/photo-1512290900672-1f417551980a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "body-waxing-oil",
        num: "04",
        name: "Waxing Oil Wax & Body Waxing",
        tagline: "Gentle Hair Removal & Lipid Protective Shield",
        description:
          "Premium waxing enriched with pre-wax soothing oil and post-wax cooling chamomile to ensure completely smooth, painless hair removal without redness.",
        protocol: "Skin prep oil → Hot liposoluble wax strip → Soothing calendula balm → Hydrating silk finish",
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
        clientRole: "Client, Palsikar Colony, Indore",
        quote:
          "Bhanu's The Hair Studio Palsikar is on another level. The haircut and beard trimming attention to facial structure is unparalleled. The space is calm, intentional, and genuinely luxurious.",
        service: "Haircut & Beard Trimming",
        rating: 5,
      },
      {
        id: "t-2",
        clientName: "Pooja Singhania",
        clientRole: "Fashion Stylist, Indore",
        quote:
          "My balayage and hair smoothing have never looked this seamless. The caramel transition looks completely natural in sunlight, and my hair felt healthier after the session. Truly Indore's finest unisex studio.",
        service: "Balayage & Hair Smoothing",
        rating: 5,
      },
      {
        id: "t-3",
        clientName: "Rohan Varma",
        clientRole: "Client, Manik Bagh Road, Indore",
        quote:
          "The facial, clean up and spa services are my essential monthly reset. Zero rushing, open until 10 PM, incredible technique, and an atmosphere that lets you unwind completely.",
        service: "Facials & Spa Services",
        rating: 5,
      },
    ],
  },
  booking: {
    headingLine1: "YOUR NEXT LOOK",
    headingLine2: "STARTS HERE.",
    subtext:
      "Reserve your bespoke styling session at Bhanu's The Hair Studio Palsikar. Open daily until 10:00 PM for personalized consultations.",
  },
};
