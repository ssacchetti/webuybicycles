import { faqs } from "@/lib/faqs";

// Emits three schema.org graphs in a single <script> tag:
//   - LocalBusiness (mobile / service-area business; no fixed trading address
//     or phone — WhatsApp-only, by-appointment pickups across Melbourne and
//     Geelong metros)
//   - FAQPage     (uses the same source-of-truth FAQ list as the section)
//   - Service     (declares "used bicycle buying" as a structured service)

const SITE_URL = "https://webuybicycles.com.au";

// Two geographic service areas — Melbourne metro and Geelong metro. A single
// radius from Melbourne can't cover Geelong without also sweeping in far-north
// suburbs we don't service, so each city gets its own GeoCircle.
const serviceAreas = [
  {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -37.8136,
      longitude: 144.9631,
    },
    geoRadius: 50000,
    description: "Greater Melbourne metropolitan area",
  },
  {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -38.1499,
      longitude: 144.3617,
    },
    geoRadius: 25000,
    description: "Greater Geelong and Bellarine area",
  },
];

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "We Buy Bicycles",
  description:
    "Cash buyers of used road and mountain bikes across the Melbourne and Geelong metros. Messages answered 24/7 on WhatsApp; pickups by appointment.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "$$",
  currenciesAccepted: "AUD",
  paymentAccepted: "Cash, Bank transfer",
  areaServed: serviceAreas,
  address: {
    "@type": "PostalAddress",
    addressRegion: "VIC",
    addressCountry: "AU",
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
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: ["https://www.instagram.com/webuybicycles"],
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "Used bicycle buying",
  serviceType: "Used bicycle purchase",
  description:
    "We buy used road and mountain bikes, frames, and components for cash. Free pickup across the Melbourne and Geelong metros.",
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: serviceAreas,
  offers: {
    "@type": "Offer",
    description:
      "Free assessment, fair cash offer within 24-48 hours, free pickup.",
    priceCurrency: "AUD",
  },
};

export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, faqPage, service],
  };
  return (
    <script
      type="application/ld+json"
      // Schema graphs are static, server-rendered, and contain no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
